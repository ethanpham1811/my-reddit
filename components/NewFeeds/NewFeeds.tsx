import { useAppSession } from '@/components/Layouts/MainLayout'
import { SUBREDDIT_TYPE } from '@/constants/enums'
import { TCardPostProps, TPost, TSortOptions } from '@/constants/types'
import { ApolloError } from '@apollo/client'
import orderBy from 'lodash/orderBy'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { v4 as rid } from 'uuid'
import { CardPost, MessageBoard } from '..'
import { getTotalUpvote, validatePostBySubname, validateSubredditMember } from '../../services'
import { RdSkeletonListItem } from '../Skeletons'

type TNewFeedsProps = {
  subType?: SUBREDDIT_TYPE | undefined
  sortOptions: TSortOptions
  postList: TPost[] | null
  loading: boolean
  error: ApolloError | undefined
  setHasNoPost?: Dispatch<SetStateAction<boolean>>
}

function NewFeeds({ sortOptions: { method, ordering }, postList, loading, subType, setHasNoPost }: TNewFeedsProps) {
  const { session } = useAppSession()
  const me = session?.userDetail
  const {
    query: { subreddit: subPageName }
  } = useRouter()

  useEffect(() => {
    setHasNoPost && postList && setHasNoPost(!loading && postList.length === 0)
  }, [postList, loading, setHasNoPost])

  // weather if the post belongs to the public subreddit
  const verifyIsMember = (): boolean => {
    return validateSubredditMember(me?.member_of_ids, subPageName)
  }

  // weather if the post belongs to the public subreddit
  const verifyPost = (post: TPost): boolean => {
    return me ? validatePostBySubname(me?.member_of_ids, post?.subreddit?.name, subType) : post.subreddit.subType === SUBREDDIT_TYPE.Public
  }

  /* postList mapping */
  const cardPostList: TCardPostProps[] | null =
    postList &&
    orderBy(
      postList
        .filter((post): boolean => verifyPost(post))
        .map(
          ({ id, title, body, images, comment, created_at, user: { username }, subreddit, vote }: TPost): TCardPostProps => ({
            id,
            title,
            body,
            comment,
            username,
            createdAt: new Date(created_at),
            subName: subreddit.name,
            images,
            upvote: vote ? getTotalUpvote(vote) : 0
          })
        ),
      method,
      ordering
    )

  return (
    <>
      {loading || !cardPostList ? (
        [0, 1].map((el) => <RdSkeletonListItem key={el.toString()} />)
      ) : // ON SUBREDDIT FEEDS: check weather if I haven't join this subreddit or this subreddit is not public
      subPageName && !verifyIsMember() && subType !== SUBREDDIT_TYPE.Public ? (
        <MessageBoard head="This community is private, please join " highlight={subPageName as string} />
      ) : cardPostList.length > 0 ? (
        cardPostList.map(({ id, title, body, images, comment, createdAt, username, subName, upvote }) => {
          return (
            <CardPost
              id={id}
              key={`post_${rid()}`}
              images={images}
              title={title}
              body={body}
              createdAt={createdAt}
              upvote={upvote}
              subName={subName}
              username={username}
              comment={comment}
              inGroup={!!subPageName}
            />
          )
        })
      ) : (
        <MessageBoard head={subPageName ? 'This Subreddit has no post' : 'Something wrong with the server, please come back again'} />
      )}
    </>
  )
}

export default NewFeeds
