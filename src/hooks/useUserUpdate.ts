import { useAppSession } from '@/src/Layouts/MainLayout'
import { UPDATE_USER_ARRAY_KEY } from '@/src/constants/enums'
import { TUserDetail } from '@/src/constants/types'
import { UPDATE_USER_FRAG } from '@/src/graphql/fragments'
import { UPDATE_USER } from '@/src/graphql/mutations'
import { ApolloCache, useMutation } from '@apollo/client'
import { Dayjs } from 'dayjs'
import { useState } from 'react'
import toast from 'react-hot-toast'

/**
 * Update user with dynamic key:
 * - created_at
 * - email
 * - dob
 * - karma
 * - socialLinks
 * - member_of_ids
 * - following_ids
 * - post
 *
 * With optimistic update
 * With cache update
 */
function useUserUpdate() {
  const [loading, setLoading] = useState(false)
  const { session } = useAppSession()
  const me = session?.userDetail
  const [mutateUser] = useMutation(UPDATE_USER)

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
    if (UPDATE_USER_ARRAY_KEY.includes(key)) {
      updateParams = { [key]: !ownVal ? [newVal] : isAdding ? [...(ownVal as []), newVal] : (ownVal as []).filter((val) => val !== newVal) }
    } else {
      updateParams = { [key]: newVal }
    }
    return updateParams
  }

  /* update function to use in components */
  const updateUser = async (key: keyof Omit<TUserDetail, 'email'>, newVal: Dayjs | string | null | undefined, isAdding: boolean = true) => {
    if (!me) return
    setLoading(true)

    const updatedField = buildUpdateParams(me, key, newVal, isAdding)

    const { errors } = await mutateUser({
      variables: {
        id: me?.id,
        ...updatedField
      },
      optimisticResponse: {
        updateUser: {
          __typename: 'User',
          ...me,
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
