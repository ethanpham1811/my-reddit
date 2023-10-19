import { gql } from '@apollo/client'

/* ------------------------------ USER--------------------------------- */
export const ADD_USER = gql`
  mutation AddUser($email: String, $role: String, $fullName: String, $coverUrl: String, $username: String!, $dob: Date) {
    insertUser(email: $email, role: $role, fullName: $fullName, coverUrl: $coverUrl, username: $username, dob: $dob) {
      id
      role
      username
      fullName
      email
      coverUrl
      dob
    }
  }
`
export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $coverUrl: String
    $created_at: Date
    $dob: Date
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
      id
      dob
      role
      email
      followers
      fullName
      karma
      username
      coverUrl
      member_of_ids
      following_ids
    }
  }
`

/* ----------------------------- POST -------------------------------- */
export const ADD_POST = gql`
  mutation AddPost($body: String, $images: [String], $subreddit_id: ID!, $title: String!, $user_id: ID!, $link: String) {
    insertPost(body: $body, title: $title, user_id: $user_id, subreddit_id: $subreddit_id, images: $images, link: $link) {
      id
      images
      body
      created_at
      title
      user {
        username
      }
      comment {
        created_at
        user {
          username
        }
        text
      }
      subreddit {
        name
        subType
      }
      vote {
        upvote
      }
      link
    }
  }
`
export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`

/* ----------------------------- VOTE -------------------------------- */
export const ADD_VOTE = gql`
  mutation AddVote($post_id: ID!, $user_id: ID!, $upvote: Boolean!) {
    insertVote(post_id: $post_id, user_id: $user_id, upvote: $upvote) {
      post_id
    }
  }
`
export const DELETE_VOTES_BY_POST_ID = gql`
  mutation DeleteVoteSOfPost($post_id: ID!) {
    deleteVotesOfPost(post_id: $post_id) {
      post_id
    }
  }
`

/* ------------------------------ SUBREDDIT ------------------------------ */
export const ADD_SUBREDDIT = gql`
  mutation AddSubreddit($name: String!, $topic_ids: [String]!, $subType: String!, $isChildrenContent: Boolean!) {
    insertSubreddit(name: $name, topic_ids: $topic_ids, subType: $subType, isChildrenContent: $isChildrenContent) {
      name
      topic_ids
      subType
      isChildrenContent
      created_at
      id
    }
  }
`

/* ----------------------------- COMMENT -------------------------------- */
export const ADD_COMMENT = gql`
  mutation AddComment($user_id: ID!, $post_id: ID!, $text: String!) {
    insertComment(user_id: $user_id, post_id: $post_id, text: $text) {
      post_id
      text
      user_id
      created_at
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
