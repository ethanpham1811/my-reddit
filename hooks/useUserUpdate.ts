import { useAppSession } from '@/components/Layouts/MainLayout'
import { TUserDetail } from '@/constants/types'
import { UPDATE_USER, UPDATE_USER_FRAG } from '@/graphql/mutations'
import { ApolloCache, useMutation } from '@apollo/client'
import { Dayjs } from 'dayjs'
import { useState } from 'react'
import toast from 'react-hot-toast'

function useUserUpdate() {
  const [loading, setLoading] = useState(false)
  const { session } = useAppSession()
  const me = session?.userDetail
  const [mutateMemberOf] = useMutation(UPDATE_USER)

  /* build dynamic update params from dynamic key */
  const buildUpdateParams = (
    user: TUserDetail,
    key: keyof Omit<TUserDetail, 'email'>,
    newVal: Dayjs | string | null | undefined,
    isAdding: boolean = true
  ) => {
    if (!newVal) return {}
    const ownVal = user[key]

    let updateParams = {}
    if (Array.isArray(ownVal)) {
      updateParams = { [key]: !ownVal ? [newVal] : isAdding ? [...ownVal, newVal] : ownVal.filter((val) => val !== newVal) }
    } else {
      updateParams = { [key]: newVal }
    }
    return updateParams
  }

  /**
   * Update user by key:
   * - created_at
   * - email
   * - dob
   * - coverUrl
   * - photoUrl
   * - karma
   * - socialLinks
   * - member_of_ids
   * - following_ids
   * - post
   */
  const updateUser = async (key: keyof Omit<TUserDetail, 'email'>, newVal: Dayjs | string | null | undefined, isAdding: boolean = true) => {
    if (!me) return
    setLoading(true)

    const updatedField = buildUpdateParams(me, key, newVal, isAdding)

    const { errors } = await mutateMemberOf({
      variables: {
        id: me?.id,
        ...updatedField
      },
      optimisticResponse: {
        updateUser: {
          id: me?.id,
          __typename: 'User',
          ...updatedField
        }
      },
      update: (cache: ApolloCache<any>, { data: { updateUser } }) => {
        const userCacheId = cache.identify({ id: me?.id, __typename: 'User' })

        cache.updateFragment(
          {
            id: userCacheId,
            fragment: UPDATE_USER_FRAG
          },
          (_) => {
            return {
              ...updateUser
            }
          }
        )
      }
    })
    if (errors) toast.error(errors[0].message)

    setLoading(false)
    return { error: errors }
  }
  return { updateUser, loading }
}

export default useUserUpdate
