import { TPost } from '@/constants/types'
import usePostListByUserId from '@/hooks/usePostListByUserId'
import { ApolloError } from '@apollo/client'
import { ComponentType } from 'react'

type TWrappedProps = {
  postList: TPost[]
  loading: boolean
  error: ApolloError
}

const withUserPostList = <T extends TWrappedProps = TWrappedProps>(WrappedComponent: ComponentType<T>, userId: number | undefined) => {
  const WithUserPostListHoc = (props: Omit<T, keyof TWrappedProps>) => {
    const hocProps = usePostListByUserId(userId)

    return <WrappedComponent {...hocProps} {...(props as T)} />
  }
  return WithUserPostListHoc
}

export default withUserPostList
