import { gql } from '@apollo/client'

/* ----------------------------- FRAGMENT ------------------------------ */

export const POST_FRAGMENT = gql`
  fragment PostFragment on Post {
    id
    title
    body
    link
    linkDescription
    images
    created_at
    user {
      username
    }
    subreddit {
      id
      name
      subType
    }
    vote {
      id
      upvote
      user_id
    }
    comment {
      id
      created_at
      user {
        username
      }
      text
    }
    totalUpvotes
    totalComments
  }
`
export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    role
    username
    fullName
    followers
    coverUrl
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
    coverUrl
    photoUrl
    karma
    socialLinks
    member_of_ids
    following_ids
    post
  }
`
