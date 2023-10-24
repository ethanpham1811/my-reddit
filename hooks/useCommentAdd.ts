import { TPostCommentForm } from '@/constants/types'
import { useMutation } from '@apollo/client'
import { useState } from 'react'

import { ADD_COMMENT } from '@/graphql/mutations'
import { GET_POST_BY_ID } from '@/graphql/queries'

function useCommentAdd() {
  const [addComment] = useMutation(ADD_COMMENT)
  const [loading, setLoading] = useState(false)

  const createComment = async (post_id: number, user_id: number, subName: string | undefined, formData: TPostCommentForm) => {
    setLoading(true)
    const { errors } = await addComment({
      variables: {
        post_id: post_id.toString(),
        user_id: user_id.toString(),
        text: formData.comment
      },
      update: (cache, { data: { insertComment } }) => {
        /* TODO: currently using updateQuery since got bug with updateFragment, fix this later */
        cache.updateQuery(
          {
            query: GET_POST_BY_ID,
            variables: { id: post_id }
          },
          (data) => {
            if (!data) return // abort cache update

            const newCommentList = data.post?.comment ? [...data.post?.comment, insertComment] : [insertComment]

            return {
              post: { ...data?.post, comment: newCommentList }
            }
          }
        )
      }
    })
    setLoading(false)
    if (errors) return { error: errors }
  }

  return { createComment, loading }
}

export default useCommentAdd
