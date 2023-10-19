import { ArrowDownwardOutlinedIcon, ArrowUpwardOutlinedIcon } from '@/constants/icons'
import { TUserDetail } from '@/constants/types'
import { ADD_VOTE } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { MouseEvent, useState } from 'react'
import toast from 'react-hot-toast'

type TVoteColumn = {
  upvote: number
  me: TUserDetail | undefined | null
  postId: number
}

function VoteColumn({ upvote, me, postId }: TVoteColumn) {
  const [voteCount, setVoteCount] = useState(upvote)
  const [loading, setLoading] = useState(false)

  /* vote function */
  const vote = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, upvote: boolean) => {
    e.stopPropagation()
    if (loading) return
    if (me) {
      setLoading(true)
      setVoteCount(voteCount + (upvote ? 1 : -1)) // optimistic manual update
      const { errors } = await addVote({
        variables: {
          post_id: postId,
          user_id: me?.id,
          upvote
        }
      })
      // TODO: update cache vote
      if (errors) {
        setVoteCount(voteCount - (upvote ? 1 : -1)) // revert if mutation fails
        toast.error(errors[0].message)
      }
      setLoading(false)
    }
  }

  /* Mutations */
  const [addVote] = useMutation(ADD_VOTE)
  return (
    <Box width={40} m={-1} py={1} bgcolor="inputBgOutfocused.main">
      <Stack alignItems="center">
        <IconButton onClick={(e) => vote(e, true)} disabled={!me}>
          <ArrowUpwardOutlinedIcon sx={{ color: `${voteCount > 0 ? 'orange' : 'hintText'}.main` }} />
        </IconButton>
        <Typography>{voteCount}</Typography>
        <IconButton onClick={(e) => vote(e, false)} disabled={!me}>
          <ArrowDownwardOutlinedIcon sx={{ color: `${voteCount < 0 ? 'orange' : 'hintText'}.main` }} />
        </IconButton>
      </Stack>
    </Box>
  )
}

export default VoteColumn
