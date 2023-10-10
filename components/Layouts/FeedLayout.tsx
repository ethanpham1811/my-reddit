import { CardCreatePost, CardFeedSorter } from '@/components'
import { TSession, TSortOptions } from '@/constants/types'

import { Box, Container, Grid, Stack } from '@mui/material'
import { useSession } from 'next-auth/react'
import { Children, Dispatch, ReactElement, ReactNode, SetStateAction, cloneElement, isValidElement, useState } from 'react'

type TFeedLayoutProps = {
  children: ReactNode
  top: string
  subredditId?: number
  sortOptions: TSortOptions
  setSortOptions: Dispatch<SetStateAction<TSortOptions>>
}

function FeedLayout({ children, top, subredditId, sortOptions, setSortOptions }: TFeedLayoutProps) {
  const [hasNoPost, setHasNoPost] = useState(false)
  const { data: session }: TSession = useSession()
  const mainContent = Children.toArray(children)[0]
  const sideContent = Children.toArray(children)[1]

  const mainWithProps =
    isValidElement(mainContent) && cloneElement(mainContent as ReactElement<{ setHasNoPost: Dispatch<SetStateAction<boolean>> }>, { setHasNoPost })

  return (
    <Container maxWidth="md" sx={{ pt: top }}>
      <Box>
        <Grid container spacing={3}>
          <Grid xs={16} md={8} item order={{ xs: 2, md: 1 }}>
            <Stack spacing={2}>
              {session && <CardCreatePost subId={subredditId} />}
              <CardFeedSorter disabled={hasNoPost} sortOptions={sortOptions} setSortOptions={setSortOptions} />
              {mainWithProps}
            </Stack>
          </Grid>
          <Grid xs={16} md={4} item order={{ xs: 1, md: 2 }}>
            {sideContent}
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default FeedLayout
