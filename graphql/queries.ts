import { gql } from '@apollo/client'

/* --------------------------- SUBREDDIT ------------------------------ */
export const GET_SUBREDDIT_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    subredditListByTopic(topic: $topic) {
      id
      topic_ids
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
      topic_ids
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
      topic_ids
      name
      subType
      created_at
      isChildrenContent
    }
  }
`

/* ----------------------------- POST -------------------------------- */
export const GET_POST_LIST = gql`
  query {
    postList {
      id
      title
      body
      images
      created_at
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
      id
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
/* ----------------------------- TOPIC -------------------------------- */
export const GET_TOPIC_LIST = gql`
  query {
    topicList {
      name
      id
    }
  }
`

/* ------------------------------- MIX --------------------------------- */
export const GET_TOP_TRENDING_POSTS_AND_SUBS = gql`
  query MyQuery($quantity: Int!) {
    topTrending(quantity: $quantity) {
      id
      title
      body
      created_at
      totalUpvotes
      groupBy
    }
    topSubreddits(quantity: $quantity) {
      id
      name
      headline
      member
      isChildrenContent
      groupBy
    }
  }
`
