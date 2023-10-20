import { client } from '@/apollo-client'
import { useAppSession } from '@/components/Layouts/MainLayout'
import { TUserDetail } from '@/constants/types'
import { UPDATE_USER } from '@/graphql/mutations'
import { GET_USER_BY_EMAIL } from '@/graphql/queries'
import { useMutation } from '@apollo/client'
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
      }
    })
    if (errors) toast.error(errors[0].message)

    // get cached data
    const cachedData = client.readQuery({ query: GET_USER_BY_EMAIL, variables: { email: me?.email } })
    if (!cachedData) {
      setLoading(false)
      return
    }

    // updating cache
    const userData = cachedData.userByEmail
    client.writeQuery({
      query: GET_USER_BY_EMAIL,
      data: {
        userByEmail: {
          ...userData,
          ...buildUpdateParams(userData, key, newVal, isAdding)
        }
      },
      variables: { email: me?.email }
    })

    setLoading(false)
  }

  return { updateUser, loading }
}

export default useUserUpdate
