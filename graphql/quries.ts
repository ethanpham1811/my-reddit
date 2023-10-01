import { gql } from '@apollo/client'

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    subredditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`
export const GET_SUBREDDIT_LIST = gql`
  query {
    subredditList {
      id
      topic
      name
      created_at
    }
  }
`
export const GET_POST_LIST = gql`
  query {
    postList {
      images
      body
      created_at
      title
      username
      comment {
        created_at
        username
        text
      }
      subreddit {
        name
      }
      vote {
        upvote
        username
      }
    }
  }
`
