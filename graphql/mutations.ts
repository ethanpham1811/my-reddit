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
  mutation AddSubreddit($topic: String!) {
    insertSubreddit(topic: $topic) {
      topic
      created_at
      id
    }
  }
`
