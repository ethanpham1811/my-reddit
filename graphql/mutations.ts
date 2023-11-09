import { gql } from '@apollo/client'

/* ------------------------------ USER--------------------------------- */
export const ADD_USER = gql`
  mutation AddUser($email: String, $role: String, $fullName: String, $coverUrl: String, $username: String!, $dob: Date) {
    insertUser(email: $email, role: $role, fullName: $fullName, coverUrl: $coverUrl, username: $username, dob: $dob) {
      id
      role
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
    $created_at: Date
    $dob: String
    $email: String
    $followers: ID
    $fullName: String
    $karma: ID
    $photoUrl: String
    $username: String
    $member_of_ids: [String]
    $following_ids: [String]
    $role: String
  ) {
    updateUser(
      id: $id
      coverUrl: $coverUrl
      created_at: $created_at
      dob: $dob
      email: $email
      followers: $followers
      fullName: $fullName
      karma: $karma
      photoUrl: $photoUrl
      username: $username
      member_of_ids: $member_of_ids
      following_ids: $following_ids
      role: $role
    ) {
      id
      role
      username
      fullName
      followers
      coverUrl
      email
      dob
      created_at
      karma
      socialLinks
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
          id
          upvote
          user_id
        }
        link
        linkDescription
      }
    }
  }
`
export const UPDATE_USER_FRAG = gql`
  fragment UpdatedUserFrag on User {
    id
    created_at
    email
    dob
    coverUrl
    photoUrl
    karma
    socialLinks
    member_of_ids
    following_ids
    post
  }
`

/* ----------------------------- POST -------------------------------- */
export const ADD_POST = gql`
  mutation AddPost($body: String, $images: [String], $subreddit_id: ID!, $title: String!, $user_id: ID!, $link: String, $linkDescription: String) {
    insertPost(
      user_id: $user_id
      subreddit_id: $subreddit_id
      body: $body
      title: $title
      images: $images
      link: $link
      linkDescription: $linkDescription
    ) {
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
        id
        upvote
        user_id
      }
      link
      linkDescription
      totalUpvotes
    }
  }
`
export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`
export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $body: String, $images: [String], $title: String, $link: String, $linkDescription: String) {
    updatePost(id: $id, body: $body, images: $images, title: $title, link: $link, linkDescription: $linkDescription) {
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
        subType
      }
      vote {
        upvote
      }
      link
      linkDescription
    }
  }
`
export const UPDATE_POST_WITH_VOTE_FRAG = gql`
  fragment UpdatedPostWithVote on Post {
    id
    vote {
      id
      user_id
      upvote
    }
  }
`
export const UPDATE_POST_FRAG = gql`
  fragment UpdatedPost on Post {
    id
  }
`

/* ----------------------------- VOTE -------------------------------- */
export const ADD_VOTE = gql`
  mutation AddVote($post_id: ID!, $user_id: ID!, $upvote: Boolean!) {
    insertVote(post_id: $post_id, user_id: $user_id, upvote: $upvote) {
      id
      user_id
      upvote
    }
  }
`
export const DELETE_VOTES_BY_POST_ID = gql`
  mutation DeleteVotesOfPost($post_id: ID!) {
    deleteVotesOfPost(post_id: $post_id) {
      id
      user_id
      upvote
    }
  }
`
export const DELETE_VOTE = gql`
  mutation DeleteVote($id: ID!) {
    deleteVote(id: $id) {
      id
    }
  }
`
export const UPDATE_VOTE = gql`
  mutation UpdateVote($id: ID!, $upvote: Boolean!) {
    updateVote(id: $id, upvote: $upvote) {
      id
      user_id
      upvote
    }
  }
`

/* ------------------------------ SUBREDDIT ------------------------------ */
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

/* ----------------------------- COMMENT -------------------------------- */
export const ADD_COMMENT = gql`
  mutation AddComment($user_id: ID!, $post_id: ID!, $text: String!) {
    insertComment(user_id: $user_id, post_id: $post_id, text: $text) {
      id
      text
      user {
        username
      }
      created_at
    }
  }
`
export const UPDATE_COMMENT = gql`
  mutation UpdateComment($id: ID!, $text: String!) {
    updateComment(id: $id, text: $text) {
      id
      text
      user {
        username
      }
      created_at
    }
  }
`
export const DELETE_COMMENT_BY_ID = gql`
  mutation DeleteCommentById($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
`
export const DELETE_COMMENTS_BY_POST_ID = gql`
  mutation DeleteCommentsSOfPost($post_id: ID!) {
    deleteCommentsOfPost(post_id: $post_id) {
      post_id
    }
  }
`

/* ------------------------------ AUTHEN --------------------------------- */
export const LOGIN_MUTATION = gql`
  mutation Login($username: String!) {
    userSession(username: $username) {
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
  mutation Register($username: String!) {
    userRegisterSession(username: $username) {
      id
      username
      fullName
      email
      coverUrl
      dob
    }
  }
`
