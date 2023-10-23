import { useAppSession } from '@/components/Layouts/MainLayout'
import { SUBREDDIT_TYPE } from '@/constants/enums'
import { HttpsOutlinedIcon, PublicOutlinedIcon } from '@/constants/icons'
import useUserUpdate from '@/hooks/useUserUpdate'
import { Stack } from '@mui/material'
import { useState } from 'react'
import { RdButton, RdChip } from '../..'

type TActionButton = { name: string | null | undefined; subType: string | null | undefined }

function ActionButton({ name, subType }: TActionButton) {
  const { session } = useAppSession()
  const me = session?.userDetail
  const [showLeaveBtn, setShowLeaveBtn] = useState(false)
  const { updateUser, loading } = useUserUpdate()

  async function onLeaveSubreddit() {
    me && updateUser('member_of_ids', name, false)
  }

  return (
    <Stack sx={{ alignSelf: 'flex-start', alignItems: 'center', ml: 'auto', mt: 0.5, pl: 1 }} direction="row">
      {me?.member_of_ids?.includes(name as string) ? (
        <RdButton
          onClick={onLeaveSubreddit}
          filled={showLeaveBtn}
          text={showLeaveBtn ? 'Leave' : 'Joined'}
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
