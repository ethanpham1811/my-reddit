import { TPost } from '@/constants/types'
import usePostList from '@/hooks/usePostList'
import { ApolloError } from '@apollo/client'
import { ComponentType } from 'react'

type TWrappedProps = {
  postList: TPost[]
  loading: boolean
  error: ApolloError
}

const withPostList = <T extends TWrappedProps = TWrappedProps>(WrappedComponent: ComponentType<T>) => {
  const WithPostListHoc = (props: Omit<T, keyof TWrappedProps>) => {
    const hocProps = usePostList()

    return <WrappedComponent {...hocProps} {...(props as T)} />
  }
  return WithPostListHoc
}

export default withPostList
