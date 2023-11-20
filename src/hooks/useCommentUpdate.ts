import { UPDATE_COMMENT } from '@/src/graphql/mutations'
import { useAppSession } from '@/src/Layouts/MainLayout'
import { useMutation } from '@apollo/client'
import { useState } from 'react'

function useCommentUpdate() {
  const { session } = useAppSession()
  const me = session?.userDetail
  const [updateCm] = useMutation(UPDATE_COMMENT)
  const [loading, setLoading] = useState(false)

  const editComment = async (id: string | undefined, text: string, created_at: string) => {
    if (!id) return

    setLoading(true)
    const { errors } = await updateCm({
      variables: {
        id,
        text
      },
      optimisticResponse: {
        updateComment: {
          id,
          text,
          user: {
            username: me?.username,
            __typename: 'User'
          },
          created_at,
          __typename: 'Comment'
        }
      }
    })
    setLoading(false)
    if (errors) return { error: errors }
  }

  return { editComment, loading }
}

export default useCommentUpdate
