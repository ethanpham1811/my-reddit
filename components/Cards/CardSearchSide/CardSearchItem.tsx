import { useAppSession } from '@/components/Layouts/MainLayout'
import { SEARCH_TABS } from '@/constants/enums'
import { TUserDetail } from '@/constants/types'
import { Avatar, Divider, Stack, Typography } from '@/mui'
import { generateSeededHexColor, generateUserImage } from '@/src/utils'
import Link from 'next/link'
import { useState } from 'react'
import { RdButton } from '../..'

type TCardSearchItemProps = {
  name: string
  status: boolean
  btnText: string
  revertBtnText: string
  extraText: string
  link: string
  ownerUsername?: string
  guestMode?: boolean
  updateUser: (field: keyof Pick<TUserDetail, 'member_of_ids' | 'following_ids'>, name: string, status: boolean) => void
  type: Exclude<SEARCH_TABS, SEARCH_TABS.Post>
}

function CardSearchItem({ name, ownerUsername, status, btnText, revertBtnText, extraText, link, guestMode, updateUser, type }: TCardSearchItemProps) {
  const { session } = useAppSession()
  const me = session?.userDetail
  const [hoverState, setHoverState] = useState(false)
  const isMySub: boolean = ownerUsername ? ownerUsername === me?.username : false

  function onClick() {
    if (type === SEARCH_TABS.Communities) updateUser('member_of_ids', name, !status)
    if (type === SEARCH_TABS.People) updateUser('following_ids', name, !status)
  }

  return (
    <>
      <Stack direction="row" spacing={1} py={1} px={2} alignItems="center">
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
            src={generateUserImage(name)}
          />
        </Link>

        {/* Sub/user name + extra infos */}
        <Stack flex="auto" width="20px">
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
        {!guestMode && (
          <RdButton
            disabled={isMySub}
            text={isMySub ? 'My subreddit' : hoverState ? revertBtnText : btnText}
            onMouseEnter={() => setHoverState(true)}
            onMouseLeave={() => setHoverState(false)}
            onClick={onClick}
            minWidth="5rem"
            sx={{ height: '30px' }}
            filled={hoverState && status ? status : !status}
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
