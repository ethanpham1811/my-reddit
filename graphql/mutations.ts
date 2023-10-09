import { gql } from '@apollo/client'

export const ADD_USER = gql`
  mutation AddUser($email: String, $fullName: String, $coverUrl: String, $username: String!, $dob: Date, $password: String) {
    insertUser(email: $email, fullName: $fullName, coverUrl: $coverUrl, username: $username, dob: $dob, password: $password) {
      id
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
    $dob: Date
    $email: String
    $followers: ID
    $fullName: String
    $karma: ID
    $photoUrl: String
    $username: String
    $password: String
  ) {
    updateUser(
      id: $id
      coverUrl: $coverUrl
      dob: $dob
      email: $email
      followers: $followers
      fullName: $fullName
      karma: $karma
      photoUrl: $photoUrl
      username: $username
      password: $password
    ) {
      id
      dob
      email
      followers
      fullName
      karma
      username
      coverUrl
    }
  }
`

export const ADD_POST = gql`
  mutation AddPost($body: String!, $images: String, $subreddit_id: ID!, $title: String!, $user_id: ID!) {
    insertPost(body: $body, title: $title, user_id: $user_id, subreddit_id: $subreddit_id, images: $images) {
      body
      created_at
      id
      images
      subreddit_id
      title
      username
    }
  }
`

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

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    userSession(username: $username, password: $password) {
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
  mutation Register($username: String!, $password: String!) {
    userRegisterSession(username: $username, password: $password) {
      id
      username
      fullName
      email
      coverUrl
      dob
    }
  }
`
