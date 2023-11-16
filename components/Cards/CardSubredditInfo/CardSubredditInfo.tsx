import { RdAccordion, RdCard } from '@/components'
import { RdSkeleton } from '@/components/Skeletons'
import { TSubredditDetail } from '@/constants/types'
import { CardContent, Divider, Stack, useMediaQuery, useTheme } from '@/mui'
import SubCreatedDate from './components/SubCreatedDate'
import SubDescription from './components/SubDescription'
import SubHeader from './components/SubHeader'
import SubMember from './components/SubMember'
import SubOwner from './components/SubOwner'
import SubredditButtons from './components/SubredditButtons'

type TCardSubredditInfoProps = {
  subreddit: TSubredditDetail | null
  loading: boolean
}

function CardSubredditInfo({ subreddit, loading }: TCardSubredditInfoProps) {
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('md'))

  return (
    <RdCard sx={{ gap: 1, flex: 1, display: 'flex', flexDirection: 'column', p: 0, position: 'sticky' }}>
      {!loading && subreddit ? (
        <>
          <RdAccordion isMobile={isMobile}>
            {/* Sub avatar + title */}
            <SubHeader isMobile={isMobile} name={subreddit?.name} />

            <Stack gap={1}>
              <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                {/* Description */}
                <SubDescription subreddit={subreddit} />
                <Divider sx={{ my: 1 }} />
                {/* subreddit owner */}
                <SubOwner ownerUsername={subreddit?.user?.username} />
                <Divider sx={{ my: 1 }} />
                {/* Member count */}
                <SubMember member={subreddit?.member} />
                <Divider sx={{ my: 1 }} />
                {/* Started since mmm/yyyy */}
                <SubCreatedDate created_at={subreddit?.created_at} />
              </CardContent>
              <SubredditButtons subreddit={subreddit} />
            </Stack>
          </RdAccordion>
        </>
      ) : (
        <RdSkeleton />
      )}
    </RdCard>
  )
}

export default CardSubredditInfo
