import { gql } from '@apollo/client'

export const ADD_POST = gql`
  mutation AddPost($body: String!, $images: String, $subreddit_id: ID!, $title: String!, $username: String!) {
    insertPost(body: $body, title: $title, username: $username, subreddit_id: $subreddit_id, images: $images) {
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
  mutation AddSubreddit($name: String!, $topic: String!, $subType: String!, $isChildrenContent: Boolean!) {
    insertSubreddit(name: $name, topic: $topic, subType: $subType, isChildrenContent: $isChildrenContent) {
      name
      topic
      subType
      isChildrenContent
      created_at
      id
    }
  }
`
