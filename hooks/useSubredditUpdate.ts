import { SUBREDDIT_FRAGMENT } from '@/graphql/fragments'
import { UPDATE_SUBREDDIT } from '@/graphql/mutations'
import { ApolloCache, useMutation } from '@apollo/client'
import { useState } from 'react'
import toast from 'react-hot-toast'

/**
 * Create new subreddit
 * Update user member_of_ids with new sub name
 */
function useSubredditUpdate() {
  const [loading, setLoading] = useState(false)
  const [mutateSub] = useMutation(UPDATE_SUBREDDIT)

  /* update function to use in components */
  const updateSub = async (id: string, fields: { headline?: string; description?: string }) => {
    setLoading(true)

    const { errors } = await mutateSub({
      variables: {
        id,
        ...fields
      },
      optimisticResponse: {
        updateSubreddit: {
          id,
          __typename: 'Subreddit',
          ...fields
        }
      },
      update: (cache: ApolloCache<any>, { data: { updateSubreddit } }) => {
        const subCachedId = cache.identify({ id, __typename: 'Subreddit' })

        cache.updateFragment(
          {
            id: subCachedId,
            fragment: SUBREDDIT_FRAGMENT
          },
          (_) => {
            return {
              ...updateSubreddit
            }
          }
        )
      }
    })
    if (errors) toast.error(errors[0].message)

    setLoading(false)
    return { error: errors }
  }
  return { updateSub, loading }
}

export default useSubredditUpdate
