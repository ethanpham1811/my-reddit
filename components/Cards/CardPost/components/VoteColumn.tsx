import { ImArrowDown, ImArrowUp } from '@/constants/icons'
import { TUserDetail, TVote } from '@/constants/types'
import useVoteAdd from '@/hooks/useVoteAdd'
import useVoteDelete from '@/hooks/useVoteDelete'
import useVoteUpdate from '@/hooks/useVoteUpdate'
import { getTotalUpvote } from '@/src/utils'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { MouseEvent, useState } from 'react'

type TVoteColumn = {
  vote: TVote[] | undefined
  me: TUserDetail | undefined | null
  postId: number
  isMyPost: boolean
  loadedInPostPage: boolean | undefined
}

function VoteColumn({ vote: votes, me, postId, isMyPost, loadedInPostPage }: TVoteColumn) {
  const voteCount: number = votes ? getTotalUpvote(votes) : 0
  const vote: TVote | undefined = votes?.find((vote) => vote.user_id === me?.id)
  const [loading, setLoading] = useState(false)

  /* Mutations */
  const { addVote } = useVoteAdd()
  const { updateVote } = useVoteUpdate()
  const { deleteVote } = useVoteDelete()

  /* vote function */
  const handleVote = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, isUpvoteBtn: boolean) => {
    e.stopPropagation()
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
    <Box width={40} m={-1} mb={isMyPost && loadedInPostPage ? 0 : -1} bgcolor="inputBgOutfocused.main">
      <Stack alignItems="center">
        <IconButton onClick={(e) => handleVote(e, true)}>
          <ImArrowUp style={{ color: `${vote != null && vote.upvote ? '#ff4500' : '#DAE0E6'}` }} />
        </IconButton>
        <Typography>{voteCount}</Typography>
        <IconButton onClick={(e) => handleVote(e, false)}>
          <ImArrowDown style={{ color: `${vote != null && !vote.upvote ? '#ff4500' : '#DAE0E6'}` }} />
        </IconButton>
      </Stack>
    </Box>
  )
}

export default VoteColumn
