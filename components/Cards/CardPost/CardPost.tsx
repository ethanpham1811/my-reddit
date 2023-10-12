import { RdCard, RdImageCarousel } from '@/components'
import { ArrowDownwardOutlinedIcon, ArrowUpwardOutlinedIcon } from '@/constants/icons'
import { TCardPostProps, TSession } from '@/constants/types'
import { ADD_VOTE } from '@/graphql/mutations'
import { parseHtml } from '@/services'
import { useMutation } from '@apollo/client'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import PostHeader from './components/PostHeader'

function CardPost({ id, images, inGroup, body, title, username, createdAt, upvote, subName, comment }: TCardPostProps) {
  const { data: session }: TSession = useSession()
  const {
    push: navigate,
    query: { postid }
  } = useRouter()
  const [voteCount, setVoteCount] = useState(upvote)
  const [addVote] = useMutation(ADD_VOTE)

  /* mockup post images */
  const imgList: string[] = [
    process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET_URL +
      'post_images/Realtime%20Chat%20Application%20using%20PHP%20with%20MySQL%20&%20JavaScript%20Ajax.jpg',
    process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET_URL + 'post_images/wallpaperflare.com_wallpaper.jpg'
  ]

  /* vote function */
  const vote = async (upvote: boolean) => {
    if (session) {
      setVoteCount(voteCount + (upvote ? 1 : -1)) // optimistic manual update
      const { errors } = await addVote({
        variables: {
          post_id: id,
          user_id: session?.user?.id,
          upvote
        }
      })
      if (errors) {
        setVoteCount(voteCount - (upvote ? 1 : -1)) // revert if mutation fails
        toast.error(errors[0].message)
      }
    }
  }

  /* navigate to post detail page */
  const goToPost = () => {
    !postid && navigate(`/r/${subName}/post/${id}`)
  }

  return (
    <RdCard onClick={goToPost} sx={{ '&:hover': !postid ? { cursor: 'pointer', border: '1px solid', borderColor: 'orange.main' } : {} }}>
      <Stack direction="row">
        {/* side column */}
        <Box width={40} m={-1} py={1} bgcolor="inputBgOutfocused.main">
          <Stack alignItems="center">
            <IconButton onClick={() => vote(true)} disabled={!session}>
              <ArrowUpwardOutlinedIcon />
            </IconButton>
            <Typography>{voteCount}</Typography>
            <IconButton onClick={() => vote(false)} disabled={!session}>
              <ArrowDownwardOutlinedIcon />
            </IconButton>
          </Stack>
        </Box>

        {/* main content */}
        <Box flex={1} ml={1} pl={1}>
          {/* post Header */}
          <PostHeader inGroup={inGroup} subName={subName} username={username} createdAt={createdAt} />

          {/* post content */}
          <Box p={1}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body1">{parseHtml(body)}</Typography>
          </Box>

          {/* image carousel */}
          {images && <RdImageCarousel width="100%" height="300px" imgList={imgList} />}
        </Box>
      </Stack>
    </RdCard>
  )
}

export default CardPost
