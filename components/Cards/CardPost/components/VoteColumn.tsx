import { ImArrowDown, ImArrowUp } from '@/constants/icons'
import { TUserDetail, TVote } from '@/constants/types'
import useVoteAdd from '@/hooks/useVoteAdd'
import useVoteDelete from '@/hooks/useVoteDelete'
import useVoteUpdate from '@/hooks/useVoteUpdate'
import { getTotalUpvote } from '@/services'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { MouseEvent, useState } from 'react'

type TVoteColumn = {
  vote: TVote[] | undefined
  me: TUserDetail | undefined | null
  postId: number
}

function VoteColumn({ vote, me, postId }: TVoteColumn) {
  const originVoteCount: number = vote ? getTotalUpvote(vote) : 0
  const originVote: TVote | undefined = vote?.find((vote) => vote.user_id === me?.id)

  const [voteCount, setVoteCount] = useState<number>(originVoteCount)
  const [currentVote, setCurrentVote] = useState<TVote | undefined>(originVote)
  const [loading, setLoading] = useState(false)
  const currentUpvote: boolean | undefined = currentVote?.upvote

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
    if (currentVote == null) {
      await addVote(voteCount, setVoteCount, setCurrentVote, isUpvoteBtn, me.id, postId)
    } else {
      /* if user already voted this post */
      const isUpvoted = currentVote.upvote
      const voteId = currentVote.id

      /* if user click the same button twice, remove the vote  */
      if (isUpvoted === isUpvoteBtn) {
        await deleteVote(voteCount, setVoteCount, currentVote, setCurrentVote, isUpvoteBtn, voteId)
      } else {
        /* otherwise switch the vote status from true to false & vice versa */
        await updateVote(voteCount, setVoteCount, currentVote, setCurrentVote, isUpvoteBtn, isUpvoted, voteId)
      }
    }
    setLoading(false)
  }

  return (
    <Box width={40} m={-1} py={1} bgcolor="inputBgOutfocused.main">
      <Stack alignItems="center">
        <IconButton onClick={(e) => handleVote(e, true)} disabled={!me}>
          <ImArrowUp style={{ color: `${currentUpvote != null && currentUpvote ? '#ff4500' : '#DAE0E6'}` }} />
        </IconButton>
        <Typography>{voteCount}</Typography>
        <IconButton onClick={(e) => handleVote(e, false)} disabled={!me}>
          {/* <ArrowDownwardOutlinedIcon sx={{ color: `${currentUpvote != null && !currentUpvote ? 'orange' : 'hintText'}.main` }} /> */}
          <ImArrowDown style={{ color: `${currentUpvote != null && !currentUpvote ? '#ff4500' : '#DAE0E6'}` }} />
        </IconButton>
      </Stack>
    </Box>
  )
}

export default VoteColumn
