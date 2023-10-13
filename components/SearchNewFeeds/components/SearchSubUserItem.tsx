import { TQueriedSub, TQueriedUser, TUserDetail } from '@/constants/types'

import { AppContext } from '@/components/Layouts/MainLayout'
import { SEARCH_TABS } from '@/constants/enums'
import useUserByUsername from '@/hooks/useUserByUsername'
import { generateSeededHexColor, generateUserImage } from '@/services'
import { Avatar, Divider, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { Fragment, useContext, useState } from 'react'
import { RdButton } from '../..'
import { getFields } from '../utils'

type TSearchSubUserItemProps = {
  item: TQueriedSub | TQueriedUser
  revertBtnText: string
  type: Exclude<SEARCH_TABS, SEARCH_TABS.Post>
  updateUser: (field: keyof Pick<TUserDetail, 'member_of_ids' | 'following_ids'>, name: string, status: boolean) => void
}

function SearchSubUserItem({ item, updateUser, revertBtnText, type }: TSearchSubUserItemProps) {
  const { userName } = useContext(AppContext)
  const [me] = useUserByUsername(userName)
  const [hoverState, setHoverState] = useState(false)
  const { name, status, btnText, extraText, link } = getFields(me, item)

  function onClick() {
    if (type === SEARCH_TABS.Communities) updateUser('member_of_ids', name, !status)
    if (type === SEARCH_TABS.People) updateUser('following_ids', name, !status)
  }

  return (
    <Fragment key={`${name}_search_result`}>
      <Stack direction="row" spacing={1} py={2} px={3} alignItems="center">
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
        <Stack flex={1}>
          <Link href={link} style={{ color: 'inherit' }}>
            <Typography fontSize="0.8rem" variant="h6">{`r/${name}`}</Typography>
          </Link>
          <Typography fontSize="0.8rem" sx={{ color: 'hintText.main' }}>
            {extraText}
          </Typography>
        </Stack>
        {me && (
          <RdButton
            text={hoverState ? revertBtnText : btnText}
            filled={hoverState && status ? status : !status}
            onMouseEnter={() => setHoverState(true)}
            onMouseLeave={() => setHoverState(false)}
            onClick={onClick}
            width="5rem"
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
