import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'

import { client } from '@/apollo-client'
import { ADD_POST, ADD_SUBREDDIT } from '@/graphql/mutations'
import { GET_SUBREDDIT_BY_TOPIC } from '@/graphql/quries'
import { useMutation } from '@apollo/client'
import { ErrorMessage } from '@hookform/error-message'
import toast from 'react-hot-toast'

type Post = {
  title: string
  body: string
  image: string
  subreddit: string
}

function PostWrapper() {
  const { data: session } = useSession()
  const [addPost, addPostRes] = useMutation(ADD_POST)
  const [addSubreddit, addSubredditRes] = useMutation(ADD_SUBREDDIT)

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Post>()

  const onSubmit = handleSubmit(async (formData) => {
    const notification = toast.loading('Processing..')
    try {
      const {
        data: { subredditListByTopic }
      } = await client.query({ query: GET_SUBREDDIT_BY_TOPIC, variables: { topic: formData.subreddit } })

      const subredditExists = subredditListByTopic.length > 0

      if (!subredditExists) {
        const {
          data: { insertSubreddit: newSubreddit }
        } = await addSubreddit({ variables: { topic: formData.subreddit } })

        // const image = formData.postImage || ''

        const {
          data: { insertPost: newPost }
        } = await addPost({
          variables: {
            body: formData.body,
            image: '',
            subreddit_id: newSubreddit.id,
            title: formData.title,
            username: session?.user?.name
          }
        })

        console.log(newPost)
      } else {
      }

      setValue('body', '')
      setValue('title', '')
      setValue('subreddit', '')
      setValue('image', '')

      toast.success('New post created!', {
        id: notification
      })
    } catch (error) {
      toast.error('Oops, something went wrong, please try again!', {
        id: notification
      })
    }
  })

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input type="text" {...register('title', { required: true })} placeholder={session ? 'Type in your post title' : 'Please login first'} />
      </div>

      {!!watch('title') && (
        <div>
          <div>
            <p>body</p>
            <input type="text" {...register('body', { required: true })} />
          </div>
          <div>
            <p>image</p>
            <input type="text" {...register('image', { required: true })} />
          </div>
          <div>
            <p>subreddit</p>
            <input type="text" {...register('subreddit', { required: true })} />
          </div>
          <button type="submit">Post</button>
          <ErrorMessage errors={errors} name="title" render={({ message }) => <p>{message}</p>} />
        </div>
      )}
    </form>
  )
}

export default PostWrapper
