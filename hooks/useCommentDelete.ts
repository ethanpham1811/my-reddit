import { DELETE_COMMENT_BY_ID } from '@/graphql/mutations'
import { ApolloCache, useMutation } from '@apollo/client'
import { useState } from 'react'

function useCommentDelete() {
  const [deleteCm] = useMutation(DELETE_COMMENT_BY_ID)
  const [loading, setLoading] = useState(false)

  const deleteComment = async (id: string | undefined) => {
    if (!id) return

    setLoading(true)
    const { errors } = await deleteCm({
      variables: {
        id
      },
      optimisticResponse: {
        deleteComment: {
          id,
          __typename: 'Comment'
        }
      },
      update: (cache: ApolloCache<any>, { data: { deleteComment } }) => {
        const commentCacheId = cache.identify(deleteComment)
        if (commentCacheId) cache.evict({ id: commentCacheId })
      }
    })
    setLoading(false)
    if (errors) return { error: errors }
  }

  return { deleteComment, loading }
}

export default useCommentDelete
