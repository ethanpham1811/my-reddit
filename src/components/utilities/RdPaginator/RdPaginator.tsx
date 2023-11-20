import { QUERY_LIMIT } from '@/src/constants/enums'
import Pagination, { PaginationProps } from '@mui/material/Pagination'
import { useRouter } from 'next/router'

type TRdPaginatorProps<T> = PaginationProps & {
  totalItems: number
}

function RdPaginator<T extends {}>({ totalItems, sx, ...rest }: TRdPaginatorProps<T>) {
  const { query, push: navigate } = useRouter()
  const curPage = query.page ? parseInt(query.page as string) : 1
  const totalPages: number = Math.ceil(totalItems / QUERY_LIMIT)

  /* add page param to current route */
  function onChange(_: React.ChangeEvent<unknown>, nextPage: number) {
    navigate({
      query: {
        ...query,
        page: nextPage
      }
    })
  }

  return (
    <Pagination
      count={totalPages}
      onChange={onChange}
      page={curPage}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        py: 2,
        '.MuiButtonBase-root': {
          transition: 'none',
          '&.Mui-selected': {
            bgcolor: 'orange.main',
            color: 'white.main'
          }
        },
        ...sx
      }}
      {...rest}
    />
  )
}

export default RdPaginator
