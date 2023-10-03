import { TPost } from '@/constants/types'
import usePostListBySubId from '@/hooks/usePostListBySubId'
import { ApolloError } from '@apollo/client'
import { ComponentType } from 'react'

type TWrappedProps = {
  postList: TPost[]
  loading: boolean
  error: ApolloError
}

const withSubredditPostList = <T extends TWrappedProps = TWrappedProps>(WrappedComponent: ComponentType<T>, subId: number | undefined) => {
  const WithSubredditPostListHoc = (props: Omit<T, keyof TWrappedProps>) => {
    const hocProps = usePostListBySubId(subId)

    return <WrappedComponent {...hocProps} {...(props as T)} />
  }
  return WithSubredditPostListHoc
}

export default withSubredditPostList
