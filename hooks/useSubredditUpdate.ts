import { TSubredditDetail } from '@/constants/types'
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
  const updateSub = async (id: string, key: keyof Pick<TSubredditDetail, 'description' | 'headline'>, newVal: string) => {
    setLoading(true)

    const updatedField = { [key]: newVal }

    const { errors } = await mutateSub({
      variables: {
        id,
        ...updatedField
      },
      optimisticResponse: {
        updateSubreddit: {
          id,
          __typename: 'Subreddit',
          ...updatedField
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
