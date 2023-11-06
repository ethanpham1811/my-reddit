import { RdButton, RdCard, RdTextEditor } from '@/components'
import { useAppSession } from '@/components/Layouts/MainLayout'
import { TComment, TPostCommentForm } from '@/constants/types'
import { useCommentAdd } from '@/hooks'
import { Box, Stack, Typography } from '@/mui'
import Link from 'next/link'
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
  const { control, handleSubmit, setValue, watch } = useForm<TPostCommentForm>()
  const commentValue = watch('comment')

  /* submit comment handler*/
  const onSubmit = handleSubmit(async (formData) => {
    if (!formData.comment || formData.comment == '' || post_id == null || user_id == null) return
    setValue('comment', '')

    const res = await createComment(post_id, user_id, formData)

    if (res?.error) return toast.error(res.error[0].message)
  })

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
                <RdTextEditor<TPostCommentForm> control={control} height={200} name={'comment'} placeholder="What are your thoughts?" />
              </Box>
              <Box display="flex" justifyContent="right" p={1} pb={2}>
                <RdButton
                  disabled={!commentValue}
                  color="blue"
                  sx={{ px: 6 }}
                  filled={!loading && !!commentValue}
                  fullWidth={false}
                  text="Comment"
                  type="submit"
                />
              </Box>
            </Stack>
          </form>
        </Stack>
      )}
      <CommentList commentList={commentList} />
    </RdCard>
  )
}

export default CardCommentBox
