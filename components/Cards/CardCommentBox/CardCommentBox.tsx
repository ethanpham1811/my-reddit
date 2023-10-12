import { client } from '@/apollo-client'
import { RdButton, RdCard, RdTextEditor } from '@/components'
import { TComment } from '@/constants/types'
import { ADD_COMMENT } from '@/graphql/mutations'
import { GET_POST_AND_SUB_BY_POST_ID } from '@/graphql/queries'
import { useMutation } from '@apollo/client'
import { Box, Link, Stack, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import CommentList from './components/CommentList'

type TPostCommentForm = {
  comment: string
}

type TCardCommentBoxProps = {
  post_id: number | undefined
  user_id: number | undefined
  username: string | undefined
  subName: string | undefined
  commentList: TComment[] | undefined
}

function CardCommentBox({ subName, post_id, user_id, username, commentList }: TCardCommentBoxProps) {
  const [addComment] = useMutation(ADD_COMMENT)
  const { control, handleSubmit } = useForm<TPostCommentForm>()

  /* submit comment */
  const onSubmit = handleSubmit(async (formData) => {
    if (!formData.comment || formData.comment == '' || post_id == null || user_id == null) return
    const newPost = {
      post_id: post_id.toString(),
      user_id: user_id.toString(),
      text: formData.comment,
      created_at: new Date().toISOString()
    }
    const { errors } = await addComment({
      variables: newPost
    })
    if (errors) toast.error(errors[0].message)

    /* update cache */
    const cachedPost = client.readQuery({ query: GET_POST_AND_SUB_BY_POST_ID, variables: { id: post_id, name: subName } })
    if (!cachedPost) return
    const postData = cachedPost.post
    client.writeQuery({
      query: GET_POST_AND_SUB_BY_POST_ID,
      data: {
        post: {
          ...postData,
          comment: postData.comment ? [...postData.comment, newPost] : [newPost]
        }
      },
      variables: { id: post_id, name: subName }
    })
  })

  return (
    <RdCard>
      <Stack direction="row">
        {/* side column */}
        <Box width={40} m={-1} py={1}></Box>

        {/* comment form section */}
        <form onSubmit={onSubmit}>
          <Stack sx={{ ml: 1, pl: 1 }}>
            <Typography variant="body2" sx={{ p: 1, color: 'hintText.main' }}>
              Comment as{' '}
              <Link href={`/u/${username}`}>
                <Typography variant="body2" sx={{ color: 'blue.main' }}>
                  {username}
                </Typography>
              </Link>
            </Typography>
            {/* body text editor */}
            <Box p={1}>
              <RdTextEditor<TPostCommentForm>
                registerOptions={{ required: true }}
                control={control}
                height={200}
                name={'comment'}
                placeholder="What are your thoughts?"
              />
            </Box>
            <Box display="flex" justifyContent="right" p={1} pb={2}>
              <RdButton color="blue" sx={{ px: 4 }} filled fullWidth={false} text="Comment" type="submit" />
            </Box>
          </Stack>
        </form>
      </Stack>
      <CommentList commentList={commentList} />
    </RdCard>
  )
}

export default CardCommentBox
