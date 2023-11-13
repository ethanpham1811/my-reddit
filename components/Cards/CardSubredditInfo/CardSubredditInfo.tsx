import { RdSkeleton } from '@/components/Skeletons'
import { TSubredditDetail } from '@/constants/types'
import { CardContent, Divider } from '@/mui'
import { RdCard } from '../..'
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
  return (
    <RdCard sx={{ gap: 1, flex: 1, display: 'flex', flexDirection: 'column', p: 2, position: 'sticky' }}>
      {!loading && subreddit ? (
        <>
          {/* Sub avatar + title */}
          <SubHeader name={subreddit?.name} />

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
        </>
      ) : (
        <RdSkeleton />
      )}
    </RdCard>
  )
}

export default CardSubredditInfo
