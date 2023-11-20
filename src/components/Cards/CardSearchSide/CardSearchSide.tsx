import { useAppSession } from '@/src/Layouts/MainLayout'
import { getFields } from '@/src/components/SearchNewFeeds/utils'
import { RdSkeleton } from '@/src/components/Skeletons'
import { SEARCH_TABS } from '@/src/constants/enums'
import { TQueriedSub, TQueriedUser, TUserDetail } from '@/src/constants/types'
import { CardActions, CardContent, CardHeader, Typography } from '@/src/mui'
import Link from 'next/link'
import { RdCard, RdMessageBoard } from '../..'
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
    <RdCard sx={{ flex: 1, gap: 1, py: 2, px: 0, display: 'flex', flexDirection: 'column' }}>
      <CardHeader sx={{ py: 0, px: 2 }} titleTypographyProps={{ sx: { fontWeight: 600, fontSize: '0.9rem' } }} title={title} />
      <CardContent sx={{ p: 0 }}>
        {loading ? (
          <RdSkeleton />
        ) : list && list.length > 0 ? (
          list
            .filter((_, i) => i < 3)
            .map((item) => {
              const { name, status, btnText, extraText, link, revertBtnText, ownerUsername, type } = getFields(me, item)

              return (
                <CardSearchItem
                  width="20px"
                  name={name}
                  status={status}
                  btnText={btnText}
                  extraText={extraText}
                  link={link}
                  revertBtnText={revertBtnText}
                  ownerUsername={ownerUsername}
                  type={type}
                  updateUser={updateUser}
                  key={`${name}_search_result`}
                  px={2}
                  py={1}
                />
              )
            })
        ) : (
          <RdMessageBoard head="Nothing found" />
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
