import { useAppSession } from '@/components/Layouts/MainLayout'
import { SEARCH_TABS } from '@/constants/enums'
import { TQueriedSub, TQueriedUser, TUserDetail } from '@/constants/types'
import { Avatar, Divider, Stack, Typography } from '@/mui'
import { isQueriedSub } from '@/src/typeCheck'
import { generateSeededHexColor, generateUserImage } from '@/src/utils'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { RdButton } from '../..'
import { getFields } from '../utils'

type TSearchSubUserItemProps = {
  item: TQueriedSub | TQueriedUser
  revertBtnText: string
  type: Exclude<SEARCH_TABS, SEARCH_TABS.Post>
  updateUser: (field: keyof Pick<TUserDetail, 'member_of_ids' | 'following_ids'>, name: string, status: boolean) => void
}

/**
 * Queried Sub/User Item with "name", "extra content" and "Join/leave or Follow/Unfollow buttons"
 */
function SearchSubUserItem({ item, updateUser, revertBtnText, type }: TSearchSubUserItemProps) {
  const { session } = useAppSession()
  const me = session?.userDetail
  const [hoverState, setHoverState] = useState(false)
  const { name, status, btnText, extraText, link } = getFields(me, item)
  const isMySub: boolean = isQueriedSub(item) ? item?.user?.username === me?.username : false

  /* handle Join/leave and Follow/Unfollow */
  function onClick() {
    if (type === SEARCH_TABS.Communities) updateUser('member_of_ids', name, !status)
    if (type === SEARCH_TABS.People) updateUser('following_ids', name, !status)
  }

  return (
    <Fragment key={`${name}_search_result`}>
      <Stack direction="row" spacing={1} py={2} px={3} alignItems="center">
        {/* Sub/User avatar */}
        <Link href={link} style={{ color: 'inherit' }}>
          <Avatar
            variant="circular"
            sx={{
              width: 45,
              height: 45,
              ml: '-4px',
              backgroundColor: generateSeededHexColor(name),
              border: (theme): string => `4px solid ${theme.palette.white.main}`
            }}
            src={generateUserImage(name)}
          />
        </Link>

        {/* Sub/User name + extra infos */}
        <Stack flex={1}>
          <Link href={link} style={{ color: 'inherit', width: 'max-content' }}>
            <Typography fontSize="0.8rem" variant="h6">{`${type === SEARCH_TABS.Communities ? 'r' : 'u'}/${name}`}</Typography>
          </Link>
          <Typography fontSize="0.8rem" sx={{ color: 'hintText.main' }}>
            {extraText}
          </Typography>
        </Stack>

        {/* Join/leave and Follow/Unfollow buttons */}
        {me && (
          <RdButton
            disabled={isMySub}
            text={isMySub ? 'My subreddit' : hoverState ? revertBtnText : btnText}
            filled={hoverState && status ? status : !status}
            onMouseEnter={() => setHoverState(true)}
            onMouseLeave={() => setHoverState(false)}
            onClick={onClick}
            minWidth="5rem"
            sx={{ height: '30px' }}
            color="blue"
            fullWidth={false}
          />
        )}
      </Stack>
      <Divider sx={{ borderColor: 'inputBorder.main' }} />
    </Fragment>
  )
}

export default SearchSubUserItem
