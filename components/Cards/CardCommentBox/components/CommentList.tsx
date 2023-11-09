import { MessageBoard } from '@/components'
import { ORDERING, SORT_METHOD } from '@/constants/enums'
import { TComment } from '@/constants/types'
import { Avatar, Box, Stack } from '@/mui'
import { generateSeededHexColor, generateUserImage } from '@/src/utils'
import { orderBy } from 'lodash'
import Link from 'next/link'
import Comment from './Comment'

function CommentList({ commentList, filterTerm }: { commentList: TComment[] | undefined; filterTerm: string }) {
  function filterByTerm(option: TComment): boolean {
    return option.text.toLowerCase().includes(filterTerm.toLowerCase()) || option.user.username.toLowerCase().includes(filterTerm.toLowerCase())
  }
  return (
    <Box bgcolor="lightblue.main" m={1} pb={3} pt={2}>
      {commentList && commentList.length > 0 ? (
        orderBy(commentList.filter(filterByTerm), SORT_METHOD.New, ORDERING.Desc).map(({ id, text, user: { username }, created_at }, i) => (
          <Stack sx={{ pt: i === 0 ? 1 : 3 }} direction="row" key={`comment_by_user_${username}_${id}`}>
            {/* side column */}
            <Box width={40} mx={-1}>
              <Link href={`/u/${username}`}>
                <Avatar
                  sx={{
                    width: 35,
                    height: 35,
                    mr: 0.5,
                    backgroundColor: generateSeededHexColor(username || 'seed'),
                    border: (theme): string => `1px solid ${theme.palette.inputBorder.main}`
                  }}
                  alt={`comment of user ${username}`}
                  src={generateUserImage(username)}
                />
              </Link>
            </Box>

            {/* comment section */}
            <Comment commentId={id?.toString()} username={username} created_at={created_at} text={text} />
          </Stack>
        ))
      ) : (
        <MessageBoard pt={1} head="This post has no comment" />
      )}
    </Box>
  )
}

export default CommentList
