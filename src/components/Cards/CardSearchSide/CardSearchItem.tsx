import { useAppSession } from '@/src/Layouts/MainLayout'
import { SEARCH_TABS } from '@/src/constants/enums'
import { TUserDetail } from '@/src/constants/types'
import { Avatar, Divider, Stack, Typography, useMediaQuery, useTheme } from '@/src/mui'
import { generateSeededHexColor, generateUserImage } from '@/src/services/utils'
import Link from 'next/link'
import { useState } from 'react'
import { RdButton } from '../..'

type TCardSearchItemProps = {
  flex?: number
  width?: string
  name: string
  status: boolean
  btnText: string
  revertBtnText: string
  extraText: string
  link: string
  ownerUsername?: string
  px?: number
  py?: number
  updateUser: (field: keyof Pick<TUserDetail, 'member_of_ids' | 'following_ids'>, name: string, status: boolean) => void
  type: Exclude<SEARCH_TABS, SEARCH_TABS.Post>
}

function CardSearchItem({
  flex,
  width,
  name,
  status,
  btnText,
  extraText,
  link,
  ownerUsername,
  updateUser,
  revertBtnText,
  type,
  px = 3,
  py = 2
}: TCardSearchItemProps) {
  const { session } = useAppSession()
  const me = session?.userDetail
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('md'))
  const [hoverState, setHoverState] = useState(false)
  const isMySub: boolean = ownerUsername ? ownerUsername === me?.username : false

  /* handle Join/leave and Follow/Unfollow */
  function onClick() {
    if (type === SEARCH_TABS.Communities) updateUser('member_of_ids', name, !status)
    if (type === SEARCH_TABS.People) updateUser('following_ids', name, !status)
  }

  return (
    <>
      <Stack direction="row" spacing={1} py={py} px={px} alignItems="center">
        {/* Sub/user avatar */}
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
            alt="avatar"
            src={generateUserImage(name)}
          />
        </Link>

        {/* Sub/user name + extra infos */}
        <Stack flex={flex != null ? flex : 'auto'} width={width}>
          <Link href={link} style={{ color: 'inherit' }}>
            <Typography fontSize="0.8rem" variant="h6" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{`${
              type === SEARCH_TABS.Communities ? 'r' : 'u'
            }/${name}`}</Typography>
          </Link>
          <Typography fontSize="0.8rem" sx={{ color: 'hintText.main' }}>
            {extraText}
          </Typography>
        </Stack>

        {/* Join/Leave or Follow/Unfollow buttons */}
        {me && (
          <RdButton
            disabled={isMySub}
            text={isMySub ? 'My subreddit' : isMobile || hoverState ? revertBtnText : btnText}
            filled={isMySub ? false : (isMobile || hoverState) && status ? status : !status}
            onMouseEnter={() => !isMobile && setHoverState(true)}
            onMouseLeave={() => !isMobile && setHoverState(false)}
            onClick={onClick}
            minWidth="5rem"
            sx={{ height: '30px' }}
            color="blue"
            fullWidth={false}
          />
        )}
      </Stack>
      <Divider sx={{ borderColor: 'inputBorder.main' }} />
    </>
  )
}

export default CardSearchItem
