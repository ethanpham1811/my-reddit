import { TPostCommentForm } from '@/constants/types'
import { useMutation } from '@apollo/client'
import { useState } from 'react'

import { TPost } from '@/constants/types'
import { ADD_COMMENT } from '@/graphql/mutations'
import { GET_POST_AND_SUB_BY_POST_ID } from '@/graphql/queries'

function useCommentAdd() {
  const [addComment] = useMutation(ADD_COMMENT)
  const [loading, setLoading] = useState(false)

  const createComment = async (post_id: number, user_id: number, subName: string | undefined, formData: TPostCommentForm) => {
    setLoading(true)
    const newPost = {
      post_id: post_id.toString(),
      user_id: user_id.toString(),
      text: formData.comment,
      created_at: new Date().toISOString()
    }
    const { errors } = await addComment({
      variables: newPost,
      update: (cache, { data: { insertComment } }) => {
        cache.updateQuery({ query: GET_POST_AND_SUB_BY_POST_ID, variables: { id: post_id.toString(), name: subName } }, (data) => {
          const cachedData = data as { post: TPost }
          cachedData.post?.comment?.push(insertComment)

          return {
            post: data
          }
        })
      }
    })
    setLoading(false)
    if (errors) return { error: errors }
  }

  return { createComment, loading }
}

export default useCommentAdd
