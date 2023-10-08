import { gql } from '@apollo/client'

export const ADD_USER = gql`
  mutation AddUser($email: String, $fullName: String, $coverUrl: String, $username: String!, $dob: Date) {
    insertUser(email: $email, fullName: $fullName, coverUrl: $coverUrl, username: $username, dob: $dob) {
      id
      username
      fullName
      email
      coverUrl
      dob
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
