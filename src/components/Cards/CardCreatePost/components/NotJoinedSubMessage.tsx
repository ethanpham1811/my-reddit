import { Typography } from '@/src/mui'

function NotJoinedSubMessage() {
  return (
    <Typography
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }}
      variant="body2"
    >
      Please join at least one subreddit to create a post.
    </Typography>
  )
}

export default NotJoinedSubMessage
