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
export const GET_SUBREDDIT_BY_NAME = gql`
  query MyQuery($name: String!) {
    subredditByName(name: $name) {
      coverUrl
      created_at
      description
      headline
      id
      isChildrenContent
      member
      name
      subType
      topics
      post {
        username
        title
        body
        comment {
          created_at
          username
          text
        }
        created_at
        images
        vote {
          upvote
        }
      }
    }
  }
`
export const GET_SUBREDDIT_LIST_SHORT = gql`
  query {
    subredditList {
      id
      name
    }
  }
`
export const GET_SUBREDDIT_LIST_FULL = gql`
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
export const GET_POST_LIST_BY_SUB_ID = gql`
  query MyQuery($id: ID!) {
    postUsingPost_subreddit_id_fkey(id: $id) {
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
