import { useAppSession } from '@/src/Layouts/MainLayout'
import { SUBREDDIT_TYPE } from '@/src/constants/enums'
import { HttpsOutlinedIcon, PublicOutlinedIcon } from '@/src/constants/icons'
import { useUserUpdate } from '@/src/hooks'
import { Stack, useMediaQuery, useTheme } from '@/src/mui'
import { useState } from 'react'
import { RdButton, RdChip } from '../..'

type TActionButton = {
  name: string | null | undefined
  subType: string | null | undefined
  isMySub: boolean
}

function ActionButton({ name, subType, isMySub }: TActionButton) {
  const { breakpoints } = useTheme()
  const { session } = useAppSession()
  const me = session?.userDetail
  const isMobile = useMediaQuery(breakpoints.down('xl'))
  const [showLeaveBtn, setShowLeaveBtn] = useState(false)
  const { updateUser } = useUserUpdate()

  async function onLeaveSubreddit() {
    me && updateUser('member_of_ids', name, false)
  }

  return (
    <Stack
      sx={{ alignSelf: 'flex-start', alignItems: 'center', mr: { xs: 'auto', md: 'unset' }, ml: 'auto', mt: { xs: 1, md: 0.5 }, pl: 1 }}
      direction="row"
    >
      {!isMySub && me?.member_of_ids?.includes(name as string) ? (
        <RdButton
          onClick={onLeaveSubreddit}
          filled={isMobile ? true : showLeaveBtn}
          text={showLeaveBtn ? 'Leave' : isMobile ? 'Leave' : 'Joined'}
          onMouseEnter={() => setShowLeaveBtn(true)}
          onMouseLeave={() => setShowLeaveBtn(false)}
          color="blue"
          width="6rem"
          sx={{ px: 3, py: 0.5, fontWeight: 700, fontSize: '0.8rem' }}
        />
      ) : (
        <RdChip
          label={subType === SUBREDDIT_TYPE.Private ? 'Private' : 'Public'}
          sx={{ fontSize: '0.8rem', p: 2, fontWeight: 700, color: 'blue.main' }}
        />
      )}
      {subType === SUBREDDIT_TYPE.Private ? (
        <HttpsOutlinedIcon sx={{ ml: 1, display: 'block', color: 'orange.main' }} />
      ) : (
        <PublicOutlinedIcon sx={{ ml: 1, display: 'block', color: 'blue.main' }} />
      )}
    </Stack>
  )
}

export default ActionButton
