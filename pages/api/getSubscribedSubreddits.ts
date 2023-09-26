// // api/getSubscribedSubreddits.js

// import axios from 'axios'

// const getSubscribedSubreddits = async (_, res) => {
//   try {
//     // Replace with your Reddit API credentials
//     const clientId = 'YOUR_CLIENT_ID'
//     const clientSecret = 'YOUR_CLIENT_SECRET'
//     const username = 'YOUR_REDDIT_USERNAME'
//     const password = 'YOUR_REDDIT_PASSWORD'

//     // Obtain an access token
//     const auth = {
//       username: clientId,
//       password: clientSecret
//     }

//     const data = new URLSearchParams()
//     data.append('grant_type', 'password')
//     data.append('username', username)
//     data.append('password', password)

//     const tokenResponse = await axios.post('https://www.reddit.com/api/v1/access_token', data, { auth })

//     const accessToken = tokenResponse.data.access_token

//     // Retrieve subscribed subreddits
//     const response = await axios.get('https://oauth.reddit.com/subreddits/mine/subscriber', {
//       headers: {
//         Authorization: `Bearer ${accessToken}`
//       }
//     })

//     const subscribedSubreddits = response.data.data.children.map((subreddit) => subreddit.data.display_name)

//     res.status(200).json({ subscribedSubreddits })
//   } catch (error) {
//     console.error('Error:', error.response?.data || error.message)
//     res.status(500).json({ error: 'An error occurred while fetching data.' })
//   }
// }

// export default getSubscribedSubreddits
