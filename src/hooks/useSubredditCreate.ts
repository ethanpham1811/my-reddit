import { useAppSession } from '@/src/Layouts/MainLayout'
import { TCommunityCreatorForm } from '@/src/constants/types'
import { ADD_SUBREDDIT } from '@/src/graphql/mutations'
import { GET_SUBREDDIT_LIST_SHORT } from '@/src/graphql/queries'
import { ApolloCache, useMutation } from '@apollo/client'
import { useState } from 'react'
import useUserUpdate from './useUserUpdate'

/**
 * Create new subreddit
 * Update user member_of_ids with new sub name
 */
function useSubredditCreate() {
  const { session } = useAppSession()
  const me = session?.userDetail
  const [addSubreddit] = useMutation(ADD_SUBREDDIT)
  const { updateUser } = useUserUpdate()
  const [loading, setLoading] = useState(false)

  const createSubreddit = async (formData: TCommunityCreatorForm) => {
    if (!me) return

    setLoading(true)
    const { name, topic_ids, subType, isChildrenContent } = formData

    const { errors } = await addSubreddit({
      variables: {
        name,
        topic_ids,
        subType,
        isChildrenContent,
        user_id: me?.id
      },
      update: (cache: ApolloCache<any>, { data: { insertSubreddit } }) => {
        cache.updateQuery({ query: GET_SUBREDDIT_LIST_SHORT }, (data) => {
          if (!data) return // abort cache update
          return {
            subredditList: [...data.subredditList, insertSubreddit]
          }
        })
      }
    })

    if (errors) {
      setLoading(false)
      return { error: errors }
    }

    // update user to automatically join the new subreddit as first member
    const res = await updateUser('member_of_ids', name)

    setLoading(false)
    if (res?.error) return { error: res?.error }
  }

  return { createSubreddit, loading }
}

export default useSubredditCreate
