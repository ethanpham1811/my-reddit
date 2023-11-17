import { gql } from '@apollo/client'

/* ------------------------------ USER--------------------------------- */
export const GET_USER_BY_EMAIL = gql`
  query User_by_email($email: String!) {
    userByEmail(email: $email) {
      ...UserFragment
    }
  }
`
export const GET_USER_BY_USERNAME_WITH_POSTS = gql`
  query User_by_username_with_posts($username: String!, $offset: Int, $limit: Int) {
    userByUsernameWithPosts(username: $username) {
      ...UserFragment
      post(offset: $offset, limit: $limit) {
        ...PostFragment
      }
    }
  }
`
export const GET_USER_LIST_SHORT = gql`
  query Users_short {
    userList {
      id
      username
    }
  }
`

/* --------------------------- SUBREDDIT ------------------------------ */
export const GET_SUBREDDIT_BY_NAME = gql`
  query Sub_by_name($name: String!) {
    subredditByName(name: $name) {
      ...SubredditFragment
    }
  }
`
export const GET_SUBREDDIT_BY_NAME_WITH_POSTS = gql`
  query Sub_by_name($name: String!, $offset: Int, $limit: Int) {
    subredditByNameWithPosts(name: $name) {
      ...SubredditFragment
      post(offset: $offset, limit: $limit) {
        ...PostFragment
      }
    }
  }
`
export const GET_SUBREDDIT_LIST_SHORT = gql`
  query Subs_short {
    subredditList {
      id
      name
      subType
    }
  }
`
export const GET_SUBREDDIT_LIST = gql`
  query Subs_full {
    subredditList {
      ...SubredditFragment
    }
  }
`

/* ----------------------------- POST -------------------------------- */
export const GET_POST_LIST = gql`
  query Posts {
    postList {
      ...PostFragment
    }
  }
`
export const GET_PAGINATED_POST_LIST = gql`
  query Posts($offset: Int, $limit: Int) {
    postPaginatedList(offset: $offset, limit: $limit) {
      ...PostFragment
    }
  }
`
export const GET_POST_BY_ID = gql`
  query Post_by_id($id: ID!) {
    post(id: $id) {
      ...PostFragment
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
      totalComments
      images
      subreddit {
        name
      }
      groupBy
      link
    }
  }
`
export const GET_QUERIED_SUBS_USERS = gql`
  query Subs_n_Users_by_term($offset: Int, $limit: Int, $term: String!) {
    queriedSubs(offset: $offset, limit: $limit, term: $term) {
      id
      name
      headline
      member
      isChildrenContent
      groupBy
    }
    queriedUsers(offset: $offset, limit: $limit, term: $term) {
      id
      username
      fullName
      followers
      groupBy
    }
  }
`
export const GET_SEARCHED_RESULTS = gql`
  query Search_result($offset: Int, $limit: Int, $term: String!) {
    queriedPosts(offset: $offset, limit: $limit, term: $term) {
      ...QueriedPostFragment
    }
    queriedSubs(offset: $offset, limit: $limit, term: $term) {
      id
      name
      headline
      member
      isChildrenContent
      groupBy
      totalItems
      user {
        username
      }
    }
    queriedUsers(offset: $offset, limit: $limit, term: $term) {
      id
      username
      fullName
      followers
      groupBy
      totalItems
    }
  }
`
