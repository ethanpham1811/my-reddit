import { ImArrowDown, ImArrowUp } from '@/constants/icons'
import { TUserDetail, TVote } from '@/constants/types'
import { useVoteAdd, useVoteDelete, useVoteUpdate } from '@/hooks'
import { Box, IconButton, Stack, Typography } from '@/mui'
import { getTotalUpvote } from '@/src/utils'
import { useState } from 'react'

type TVoteColumn = {
  vote: TVote[] | undefined
  me: TUserDetail | undefined | null
  postId: number
  isMyPost: boolean
  onPostPage: boolean | undefined
}

function VoteColumn({ vote: votes, me, postId, isMyPost, onPostPage }: TVoteColumn) {
  const voteCount: number = votes ? getTotalUpvote(votes) : 0
  const vote: TVote | undefined = votes?.find((vote) => vote.user_id === me?.id)
  const [loading, setLoading] = useState(false)

  /* Mutations */
  const { addVote } = useVoteAdd()
  const { updateVote } = useVoteUpdate()
  const { deleteVote } = useVoteDelete()

  /* vote function */
  const handleVote = async (isUpvoteBtn: boolean) => {
    if (loading || !me) return

    setLoading(true)
    /* if user hasn't voted this post */
    if (vote == null) {
      await addVote(isUpvoteBtn, me.id, postId)
    } else {
      /* if user already voted this post */
      const isUpvoted = vote.upvote
      const voteId = vote.id

      /* if user click the same button twice, remove the vote  */
      if (isUpvoted === isUpvoteBtn) {
        await deleteVote(voteId)
      } else {
        /* otherwise switch the vote status from true to false & vice versa */
        await updateVote(isUpvoted, voteId, me.id)
      }
    }
    setLoading(false)
  }

  return (
    <Box width={40} m={-1} mb={isMyPost && onPostPage ? 0 : -1} bgcolor="inputBgOutfocused.main">
      <Stack alignItems="center" onClick={(e) => e.stopPropagation()}>
        <IconButton sx={{ cursor: loading || !me ? 'auto' : 'pointer' }} disableRipple={loading || !me} onClick={() => handleVote(true)}>
          <ImArrowUp style={{ color: `${vote != null && vote.upvote ? '#ff4500' : '#DAE0E6'}` }} />
        </IconButton>
        <Typography sx={{ cursor: 'default' }}>{voteCount}</Typography>
        <IconButton sx={{ cursor: loading || !me ? 'auto' : 'pointer' }} disableRipple={loading || !me} onClick={() => handleVote(false)}>
          <ImArrowDown style={{ color: `${vote != null && !vote.upvote ? '#ff4500' : '#DAE0E6'}` }} />
        </IconButton>
      </Stack>
    </Box>
  )
}

export default VoteColumn
