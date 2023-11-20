import { useAppSession } from '@/src/Layouts/MainLayout'
import { RdButton, RdCard, RdNakedInput } from '@/src/components'
import RdStaticInput from '@/src/components/utilities/RdInput/RdStaticInput'
import { TComment, TPostCommentForm } from '@/src/constants/types'
import { useCommentAdd } from '@/src/hooks'
import { Box, Stack, Typography } from '@/src/mui'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import CommentList from './components/CommentList'

type TCardCommentBoxProps = {
  post_id: number | undefined
  user_id: number | undefined
  username: string | undefined
  commentList: TComment[] | undefined
}

function CardCommentBox({ post_id, user_id, username, commentList }: TCardCommentBoxProps) {
  const { session } = useAppSession()
  const me = session?.userDetail
  const { createComment, loading } = useCommentAdd()
  const [filterTerm, setFilterTerm] = useState('')
  const { control, handleSubmit, setValue, watch } = useForm<TPostCommentForm>({ mode: 'all' })
  const commentValue = watch('comment')

  /* submit comment handler*/
  const onSubmit = handleSubmit(async (formData) => {
    if (!formData.comment || post_id == null || user_id == null) return
    setValue('comment', '')

    const res = await createComment(post_id, user_id, formData)

    if (res?.error) return toast.error(res.error[0].message)
  })

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    setFilterTerm(e.target.value)
  }

  return (
    <RdCard sx={{ p: 2 }}>
      {me && (
        <Stack direction="row">
          <form onSubmit={onSubmit} style={{ display: 'flex', flex: 1 }}>
            <Stack sx={{ flex: 1 }}>
              {/* Comment as <username> */}
              {
                <Typography variant="body2" sx={{ p: 1, color: 'hintText.main' }}>
                  Comment as{' '}
                  <Link href={`/u/${username}`} style={{ textDecoration: 'none' }}>
                    <Typography variant="body2" sx={{ color: 'blue.main' }}>
                      {username}
                    </Typography>
                  </Link>
                </Typography>
              }

              {/* body text editor */}
              <Box p={1}>
                <RdNakedInput<TPostCommentForm> multiline fullWidth control={control} name={'comment'} placeholder="What are your thoughts?" />
              </Box>

              <Stack justifyContent="space-between" direction="row" p={1} spacing={1}>
                {/* comment filter */}
                <Box display="flex">
                  {commentList && commentList.length > 0 && (
                    <RdStaticInput bgcolor="white" fullWidth={false} onChange={handleFilter} placeholder="Filter comments" />
                  )}
                </Box>

                {/* Post comment btn */}
                <RdButton
                  disabled={!commentValue}
                  color="blue"
                  sx={{ px: 6 }}
                  filled={!loading && !!commentValue}
                  fullWidth={false}
                  text="Comment"
                  type="submit"
                />
              </Stack>
            </Stack>
          </form>
        </Stack>
      )}
      <CommentList filterTerm={filterTerm} commentList={commentList} />
    </RdCard>
  )
}

export default CardCommentBox
