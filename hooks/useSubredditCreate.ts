import { TCommunityCreatorForm } from '@/constants/types'
import { ADD_SUBREDDIT } from '@/graphql/mutations'
import { GET_SUBREDDIT_LIST_SHORT } from '@/graphql/queries'
import { ApolloCache, useMutation } from '@apollo/client'
import { useState } from 'react'
import useUserUpdate from './useUserUpdate'

function useSubredditCreate() {
  const [addSubreddit] = useMutation(ADD_SUBREDDIT)
  const { updateUser } = useUserUpdate()
  const [loading, setLoading] = useState(false)

  const createSubreddit = async (formData: TCommunityCreatorForm) => {
    setLoading(true)
    const { name, topic_ids, subType, isChildrenContent } = formData

    const { errors } = await addSubreddit({
      variables: {
        name,
        topic_ids,
        subType,
        isChildrenContent
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

    // error
    if (errors) {
      setLoading(false)
      return { error: errors }
    }
    // update user to join the new subreddit as first member
    const res = await updateUser('member_of_ids', name)

    setLoading(false)
    if (res?.error) return { error: res?.error }
  }

  return { createSubreddit, loading }
}

export default useSubredditCreate
