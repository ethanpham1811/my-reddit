import { gql } from '@apollo/client'

/* ----------------------------- FRAGMENT ------------------------------ */

export const POST_FRAGMENT = gql`
  fragment PostFragment on Post {
    id
    title
    body
    created_at
    images
    link
    linkDescription
    user {
      username
    }
    subreddit {
      id
      name
      subType
    }
    comment {
      id
      created_at
      user {
        username
      }
      text
    }
    vote {
      id
      upvote
      user_id
    }
    totalUpvotes
    totalComments
  }
`
export const QUERIED_POST_FRAGMENT = gql`
  fragment QueriedPostFragment on QueriedPost {
    id
    title
    body
    created_at
    images
    link
    linkDescription
    user {
      username
    }
    subreddit {
      id
      name
      subType
    }
    comment {
      id
      created_at
      user {
        username
      }
      text
    }
    vote {
      id
      upvote
      user_id
    }
    totalUpvotes
    totalComments
    groupBy
    totalItems
  }
`

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    role
    username
    fullName
    followers
    email
    dob
    created_at
    karma
    socialLinks
    member_of_ids
    following_ids
  }
`
export const SUBREDDIT_FRAGMENT = gql`
  fragment SubredditFragment on Subreddit {
    coverUrl
    created_at
    description
    headline
    id
    isChildrenContent
    member
    name
    subType
    topic_ids
    user {
      username
    }
  }
`
export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    text
    user {
      username
    }
    created_at
  }
`
export const UPDATE_USER_FRAG = gql`
  fragment UpdatedUserFrag on User {
    id
    created_at
    email
    dob
    karma
    socialLinks
    member_of_ids
    following_ids
  }
`
export const UPDATE_POST_WITH_VOTE_FRAG = gql`
  fragment UpdatedPostWithVote on Post {
    id
    vote {
      id
      user_id
      upvote
    }
  }
`
export const UPDATE_POST_FRAG = gql`
  fragment UpdatedPost on Post {
    id
  }
`
