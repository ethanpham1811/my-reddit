import { useAppSession } from '@/components/Layouts/MainLayout'
import { RdSkeleton } from '@/components/Skeletons'
import { SEARCH_TABS } from '@/constants/enums'
import { TQueriedSub, TQueriedUser, TUserDetail } from '@/constants/types'
import { CardActions, CardContent, CardHeader, Typography } from '@/mui'
import { formatNumber, validatePostByFollowing, validateSubredditMember } from '@/src/utils'
import Link from 'next/link'
import { MessageBoard, RdCard } from '../..'
import CardSearchItem from './CardSearchItem'

type TCardSearchSideProps<T extends TQueriedSub | TQueriedUser> = {
  title: string
  q: string
  type: SEARCH_TABS
  loading: boolean
  list: T[]
  updateUser: (field: keyof Pick<TUserDetail, 'member_of_ids' | 'following_ids'>, name: string, status: boolean) => void
}

/**
 * Display Subreddit/User info dynamically mapped with mix data
 */
function CardSearchSide<T extends TQueriedSub | TQueriedUser>({ title, q, type, loading, list, updateUser }: TCardSearchSideProps<T>) {
  const { session } = useAppSession()
  const me = session?.userDetail

  return (
    <RdCard sx={{ gap: 1, py: 2, px: 0, display: 'flex', flexDirection: 'column' }}>
      <CardHeader sx={{ py: 0, px: 2 }} titleTypographyProps={{ sx: { fontWeight: 600, fontSize: '0.9rem' } }} title={title} />
      <CardContent sx={{ p: 0 }}>
        {loading ? (
          <RdSkeleton />
        ) : list && list.length > 0 ? (
          list
            .filter((_, i) => i < 3)
            .map((item) => {
              let name = ''
              let status = false
              let btnText = ''
              let revertBtnText = ''
              let extraText = ''
              let link = '/'
              let type = SEARCH_TABS.People

              if ('username' in item) {
                name = item.username?.toString()
                status = me ? validatePostByFollowing(me?.following_ids, item.username) : false
                btnText = status ? 'Following' : 'Follow'
                revertBtnText = status ? 'Unfollow' : 'Follow'
                extraText = formatNumber(item.followers) + ' followers'
                link = `u/${item.username}`
              } else {
                name = item.name?.toString()
                status = me ? validateSubredditMember(me?.member_of_ids, item.name) : false
                btnText = status ? 'Joined' : 'Join'
                revertBtnText = status ? 'Leave' : 'Join'
                extraText = formatNumber(item.member || 0) + ' members'
                link = `r/${item.name}`
                type = SEARCH_TABS.Communities
              }

              return (
                <CardSearchItem
                  revertBtnText={revertBtnText}
                  type={type}
                  updateUser={updateUser}
                  key={`${name}_search_result`}
                  guestMode={!me}
                  name={name}
                  status={status}
                  btnText={btnText}
                  extraText={extraText}
                  link={link}
                />
              )
            })
        ) : (
          <MessageBoard head="Nothing found" />
        )}
      </CardContent>

      {/* See more link */}
      {!loading && list && list.length > 0 && (
        <CardActions disableSpacing sx={{ p: 0, pt: 0.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography sx={{ color: 'blue.main' }} variant="h6" fontSize="0.8rem">
            <Link href={`/search?q=${q}&type=${type}`} style={{ color: 'inherit' }}>{`See more ${title}`}</Link>
          </Typography>
        </CardActions>
      )}
    </RdCard>
  )
}

export default CardSearchSide
