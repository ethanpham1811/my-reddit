import { useAppSession } from '@/components/Layouts/MainLayout'
import { TUserDetail } from '@/constants/types'
import { UPDATE_USER } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import toast from 'react-hot-toast'

function useUserUpdate() {
  const [loading, setLoading] = useState(false)
  const { session } = useAppSession()
  const me = session?.userDetail
  const [mutateMemberOf] = useMutation(UPDATE_USER)

  /* build dynamic update params from dynamic key */
  const buildUpdateParams = (user: TUserDetail, key: keyof TUserDetail, newVal: string | null | undefined, isAdding: boolean = true) => {
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
  const updateUser = async (key: keyof TUserDetail, newVal: string | null | undefined, isAdding: boolean = true) => {
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
      }
    })
    if (errors) toast.error(errors[0].message)

    setLoading(false)
    return { error: errors }
  }
  return { updateUser, loading }
}

export default useUserUpdate
