import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'

import { client } from '@/apollo-client'
import { ADD_POST, ADD_SUBREDDIT } from '@/graphql/mutations'
import { GET_SUBREDDIT_BY_TOPIC } from '@/graphql/quries'
import { ApolloError, useMutation } from '@apollo/client'
import { ErrorMessage } from '@hookform/error-message'
import toast from 'react-hot-toast'

type Post = {
  title: string
  body: string
  image: string
  subreddit: string
}

function NewPostForm() {
  const { data: session } = useSession()
  const [addSubreddit] = useMutation(ADD_SUBREDDIT, {
    onError: (error: ApolloError) => {
      toast.error(error.message)
    }
  })
  const [addPost] = useMutation(ADD_POST, {
    onCompleted: () => {
      toast.success('Your post sucessfully added!')
    },
    onError: (error: ApolloError) => {
      toast.error(error.message)
    }
  })

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Post>()

  const onSubmit = handleSubmit(async (formData) => {
    const res = await client.query({ query: GET_SUBREDDIT_BY_TOPIC, variables: { topic: formData.subreddit } })
    const subredditExists = res?.data?.subredditListByTopic?.length > 0

    if (!subredditExists) {
      addSubreddit({ variables: { topic: formData.subreddit } }).then((res) => {
        const newSubredditId = res?.data?.insertSubreddit.id
        addPost({
          variables: {
            body: formData.body,
            image: '',
            subreddit_id: newSubredditId,
            title: formData.title,
            username: session?.user?.name
          }
        })
      })
    }
    // clear the form
    reset()
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

export default NewPostForm
