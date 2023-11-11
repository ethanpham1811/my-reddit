import { gql } from '@apollo/client'
import { COMMENT_FRAGMENT, POST_FRAGMENT, SUBREDDIT_FRAGMENT, USER_FRAGMENT } from './fragments'

/* ------------------------------ USER--------------------------------- */
export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $coverUrl: String
    $created_at: Date
    $dob: String
    $email: String
    $followers: ID
    $fullName: String
    $karma: ID
    $photoUrl: String
    $username: String
    $member_of_ids: [String]
    $following_ids: [String]
    $role: String
  ) {
    updateUser(
      id: $id
      coverUrl: $coverUrl
      created_at: $created_at
      dob: $dob
      email: $email
      followers: $followers
      fullName: $fullName
      karma: $karma
      photoUrl: $photoUrl
      username: $username
      member_of_ids: $member_of_ids
      following_ids: $following_ids
      role: $role
    ) {
      ...UserFragment
      post {
        ...PostFragment
      }
    }
  }
  ${POST_FRAGMENT}
  ${USER_FRAGMENT}
`

/* ----------------------------- POST -------------------------------- */
export const ADD_POST = gql`
  mutation AddPost($body: String, $images: [String], $subreddit_id: ID!, $title: String!, $user_id: ID!, $link: String, $linkDescription: String) {
    insertPost(
      user_id: $user_id
      subreddit_id: $subreddit_id
      body: $body
      title: $title
      images: $images
      link: $link
      linkDescription: $linkDescription
    ) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`
export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`
export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $body: String, $images: [String], $title: String, $link: String, $linkDescription: String) {
    updatePost(id: $id, body: $body, images: $images, title: $title, link: $link, linkDescription: $linkDescription) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
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

/* ----------------------------- VOTE -------------------------------- */
export const ADD_VOTE = gql`
  mutation AddVote($post_id: ID!, $user_id: ID!, $upvote: Boolean!) {
    insertVote(post_id: $post_id, user_id: $user_id, upvote: $upvote) {
      id
      user_id
      upvote
    }
  }
`
export const DELETE_VOTES_BY_POST_ID = gql`
  mutation DeleteVotesOfPost($post_id: ID!) {
    deleteVotesOfPost(post_id: $post_id) {
      id
      user_id
      upvote
    }
  }
`
export const DELETE_VOTE = gql`
  mutation DeleteVote($id: ID!) {
    deleteVote(id: $id) {
      id
    }
  }
`
export const UPDATE_VOTE = gql`
  mutation UpdateVote($id: ID!, $upvote: Boolean!) {
    updateVote(id: $id, upvote: $upvote) {
      id
      user_id
      upvote
    }
  }
`

/* ------------------------------ SUBREDDIT ------------------------------ */
export const ADD_SUBREDDIT = gql`
  mutation AddSubreddit($name: String!, $topic_ids: [String]!, $subType: String!, $isChildrenContent: Boolean!, $user_id: ID!) {
    insertSubreddit(name: $name, topic_ids: $topic_ids, subType: $subType, isChildrenContent: $isChildrenContent, user_id: $user_id) {
      id
      name
      topic_ids
      subType
      isChildrenContent
      created_at
      user {
        username
      }
    }
  }
`
export const UPDATE_SUBREDDIT = gql`
  mutation UpdateSubreddit($id: ID!, $headline: String, $description: String) {
    updateSubreddit(id: $id, headline: $headline, description: $description) {
      ...SubredditFragment
    }
  }
  ${SUBREDDIT_FRAGMENT}
`

/* ----------------------------- COMMENT -------------------------------- */
export const ADD_COMMENT = gql`
  mutation AddComment($user_id: ID!, $post_id: ID!, $text: String!) {
    insertComment(user_id: $user_id, post_id: $post_id, text: $text) {
      ...CommentFragment
    }
  }
  ${COMMENT_FRAGMENT}
`
export const UPDATE_COMMENT = gql`
  mutation UpdateComment($id: ID!, $text: String!) {
    updateComment(id: $id, text: $text) {
      ...CommentFragment
    }
  }
  ${COMMENT_FRAGMENT}
`
export const DELETE_COMMENT_BY_ID = gql`
  mutation DeleteCommentById($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
`
export const DELETE_COMMENTS_BY_POST_ID = gql`
  mutation DeleteCommentsSOfPost($post_id: ID!) {
    deleteCommentsOfPost(post_id: $post_id) {
      post_id
    }
  }
`

/* ------------------------------ AUTHEN --------------------------------- */
export const LOGIN_MUTATION = gql`
  mutation Login($username: String!) {
    userSession(username: $username) {
      token
      user {
        id
        username
        fullName
        email
        coverUrl
        dob
      }
    }
  }
`
export const REGISTER_MUTATION = gql`
  mutation Register($username: String!) {
    userRegisterSession(username: $username) {
      id
      username
      fullName
      email
      coverUrl
      dob
    }
  }
`
