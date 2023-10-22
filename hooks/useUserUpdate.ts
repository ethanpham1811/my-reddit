import { useAppSession } from '@/components/Layouts/MainLayout'
import { TUserDetail } from '@/constants/types'
import { UPDATE_USER } from '@/graphql/mutations'
import { GET_USER_BY_EMAIL } from '@/graphql/queries'
import { ApolloCache, useMutation } from '@apollo/client'
import { useState } from 'react'
import toast from 'react-hot-toast'

function useUserUpdate() {
  const [loading, setLoading] = useState(false)
  const { session } = useAppSession()
  const me = session?.userDetail
  const [mutateMemberOf] = useMutation(UPDATE_USER)

  /* build dynamic update params according to TUserDetail keys */
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

  const updateUser = async (key: keyof TUserDetail, newVal: string | null | undefined, isAdding: boolean = true) => {
    if (!me) return
    setLoading(true)

    // mutate db
    const { errors } = await mutateMemberOf({
      variables: {
        id: me?.id,
        ...buildUpdateParams(me, key, newVal, isAdding)
      },
      update: (cache: ApolloCache<any>, { data: { userByEmail } }) => {
        cache.updateQuery({ query: GET_USER_BY_EMAIL, variables: { email: me?.email } }, (data) => {
          if (!data) return // abort cache update

          return {
            userByEmail
          }
        })
      }
    })
    if (errors) toast.error(errors[0].message)

    setLoading(false)
    return { error: errors }
  }
  return { updateUser, loading }
}

export default useUserUpdate
