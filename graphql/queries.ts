import { gql } from '@apollo/client'

/* ------------------------------ USER--------------------------------- */
export const GET_USER_BY_USERNAME = gql`
  query User_by_username($username: String!) {
    userByUsername(username: $username) {
      id
      username
      fullName
      followers
      coverUrl
      email
      dob
      created_at
      karma
      socialLinks
      password
      member_of_ids
      following_ids
      post {
        id
        title
        body
        images
        created_at
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
          id
          subType
        }
        vote {
          upvote
        }
      }
    }
  }
`

/* --------------------------- SUBREDDIT ------------------------------ */
export const GET_SUBREDDIT_BY_TOPIC = gql`
  query Sub_by_topic($topic: String!) {
    subredditListByTopic(topic: $topic) {
      id
      topic_ids
      created_at
    }
  }
`
export const GET_SUBREDDIT_BY_NAME = gql`
  query Sub_by_name($name: String!) {
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
        id
        title
        body
        images
        created_at
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
          id
          subType
        }
        vote {
          upvote
        }
      }
    }
  }
`
export const GET_SUBREDDIT_LIST_SHORT = gql`
  query Subs_short {
    subredditList {
      id
      name
    }
  }
`
export const GET_SUBREDDIT_LIST_FULL = gql`
  query Subs_full {
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
  query Posts {
    postList {
      id
      title
      body
      images
      created_at
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
      }
      vote {
        upvote
      }
    }
  }
`
export const GET_POST_LIST_BY_SUB_ID = gql`
  query Posts_by_subId($id: ID!) {
    postUsingPost_subreddit_id_fkey(id: $id) {
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
      }
      vote {
        upvote
      }
    }
  }
`
export const GET_POST_LIST_BY_USER_ID = gql`
  query Posts_by_userId($id: ID!) {
    postUsingPost_user_id_fkey(id: $id) {
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
      }
      vote {
        upvote
      }
    }
  }
`
export const GET_POST_AND_SUB_BY_POST_ID = gql`
  query Post_Sub_by_id($id: ID!, $name: String!) {
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
    }
    post(id: $id) {
      id
      title
      body
      images
      created_at
      user {
        username
      }
      comment {
        id
        created_at
        user {
          username
        }
        text
      }
      subreddit {
        name
        id
        subType
      }
      vote {
        upvote
      }
    }
  }
`
/* ----------------------------- TOPIC -------------------------------- */
export const GET_TOPIC_LIST = gql`
  query Topics {
    topicList {
      name
      id
    }
  }
`

/* ------------------------------- MIX --------------------------------- */
export const GET_TOP_TRENDING_POSTS = gql`
  query Posts_trending($quantity: Int!) {
    queriedTrending(quantity: $quantity) {
      id
      title
      body
      created_at
      totalUpvotes
      subreddit {
        name
      }
      groupBy
    }
  }
`
export const GET_QUERIED_SUBS_USERS = gql`
  query Subs_n_Users_by_term($quantity: Int!, $term: String!) {
    queriedSubs(quantity: $quantity, term: $term) {
      id
      name
      headline
      member
      isChildrenContent
      groupBy
    }
    queriedUsers(quantity: $quantity, term: $term) {
      id
      username
      fullName
      followers
      groupBy
    }
  }
`
export const GET_SEARCHED_RESULTS = gql`
  query Search_result($quantity: Int!, $term: String!) {
    queriedPosts(quantity: $quantity, term: $term) {
      id
      title
      body
      images
      created_at
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
      }
      vote {
        upvote
      }
      groupBy
    }
    queriedSubs(quantity: $quantity, term: $term) {
      id
      name
      headline
      member
      isChildrenContent
      groupBy
    }
    queriedUsers(quantity: $quantity, term: $term) {
      id
      username
      fullName
      followers
      groupBy
    }
  }
`
