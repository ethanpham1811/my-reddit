import { TComment, TVote } from '@/src/constants/types'
import { Stack, Typography } from '@/src/mui'
import { getTotalUpvote } from '@/src/services/utils'

/**
 * Bottom bar of postItem with "Vote counter" and "Comment counter"
 */
function SearchPostItemFooter({ vote, comment }: { vote: TVote[] | undefined; comment: TComment[] | undefined }) {
  return (
    <Stack direction="row" sx={{ bgcolor: 'white.main', position: 'absolute', left: 0, bottom: 0, width: '100%', pl: 3, py: 1.5 }}>
      <Typography fontWeight={400} fontSize="0.8rem" sx={{ color: 'hintText.main', mr: 2 }}>
        {vote ? getTotalUpvote(vote) : 0} upvotes
      </Typography>
      <Typography fontWeight={400} fontSize="0.8rem" sx={{ color: 'hintText.main' }}>
        {comment ? comment.length : 0} comments
      </Typography>
    </Stack>
  )
}

export default SearchPostItemFooter
