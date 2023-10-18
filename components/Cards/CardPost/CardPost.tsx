import { CardCommentBox, RdCard, RdImageCarousel } from '@/components'
import { ArrowDownwardOutlinedIcon, ArrowUpwardOutlinedIcon } from '@/constants/icons'
import { TCardPostProps } from '@/constants/types'
import { ADD_VOTE } from '@/graphql/mutations'
import { parseHtml } from '@/services'
import { useMutation } from '@apollo/client'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { User, useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { MouseEvent, useState } from 'react'
import toast from 'react-hot-toast'
import PostHeader from './components/PostHeader'

function CardPost({ id, images, inGroup, body, title, username, createdAt, upvote, subName, comment: commentList, link }: TCardPostProps) {
  const user: User | null = useUser()
  const {
    push: navigate,
    query: { postid }
  } = useRouter()
  const [voteCount, setVoteCount] = useState(upvote)

  /* Mutations */
  const [addVote] = useMutation(ADD_VOTE)

  /* mockup post images */
  const imgList: string[] = [
    process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET_URL +
      'post_images/public/Realtime%20Chat%20Application%20using%20PHP%20with%20MySQL%20&%20JavaScript%20Ajax.jpg',
    process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET_URL + 'post_images/public/wallpaperflare.com_wallpaper.jpg'
  ]

  /* navigate to post detail page */
  const goToPost = () => !postid && navigate(`/r/${subName}/post/${id}`)

  /* vote function */
  const vote = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, upvote: boolean) => {
    e.stopPropagation()
    if (user) {
      setVoteCount(voteCount + (upvote ? 1 : -1)) // optimistic manual update
      const { errors } = await addVote({
        variables: {
          post_id: id,
          user_id: user?.id,
          upvote
        }
      })
      // TODO: update cache vote
      if (errors) {
        setVoteCount(voteCount - (upvote ? 1 : -1)) // revert if mutation fails
        toast.error(errors[0].message)
      }
    }
  }

  return (
    <>
      <RdCard onClick={goToPost} sx={{ '&:hover': !postid ? { cursor: 'pointer', border: '1px solid', borderColor: 'orange.main' } : {} }}>
        <Stack direction="row">
          {/* side column */}
          <Box width={40} m={-1} py={1} bgcolor="inputBgOutfocused.main">
            <Stack alignItems="center">
              <IconButton onClick={(e) => vote(e, true)} disabled={!user}>
                <ArrowUpwardOutlinedIcon />
              </IconButton>
              <Typography>{voteCount}</Typography>
              <IconButton onClick={(e) => vote(e, false)} disabled={!user}>
                <ArrowDownwardOutlinedIcon />
              </IconButton>
            </Stack>
          </Box>
          {/* main section */}
          <Box flex={1} ml={1} pl={1}>
            {/* post Header */}
            <PostHeader inGroup={inGroup} subName={subName} username={username} createdAt={createdAt} />
            {/* post content */}
            <Box p={1}>
              <Typography variant="h6">{title}</Typography>
              <Typography variant="body1" fontWeight={400} fontSize="1rem">
                {parseHtml(body)}
              </Typography>
              {link && <Box>{link}</Box>}
              {/* {link && <LinkPreview url={link} width="400px" />} */}
            </Box>
            {/* image carousel */}
            {images && <RdImageCarousel width="100%" height="300px" imgList={imgList} />}
          </Box>
        </Stack>
      </RdCard>
      {postid != null && <CardCommentBox subName={subName} commentList={commentList} post_id={id} user_id={123} username={user?.email as string} />}
    </>
  )
}

export default CardPost
