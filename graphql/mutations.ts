import { gql } from '@apollo/client'

export const ADD_POST = gql`
  mutation AddPost($body: String!, $image: String!, $subreddit_id: ID!, $title: String!, $username: String!) {
    insertPost(body: $body, title: $title, username: $username, subreddit_id: $subreddit_id, image: $image, created_at: $created_at) {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
    }
  }
`

export const ADD_SUBREDDIT = gql`
  mutation AddSubreddit($topic: String!) {
    insertSubreddit(body: $topic) {
      topic
      created_at
      id
    }
  }
`
