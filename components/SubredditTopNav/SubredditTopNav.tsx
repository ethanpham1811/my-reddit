import { SUBREDDIT_TYPE } from '@/constants/enums'
import { HttpsOutlinedIcon, PublicOutlinedIcon } from '@/constants/icons'
import { AppBar, Avatar, Box, Container, Stack, Typography, styled } from '@mui/material'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { RdButton, RdChip } from '..'
import { generateSeededHexColor, generateUserCover, generateUserImage } from '../../services'
import { AppContext } from '../Layouts/MainLayout'

const SubredditNavBar = styled(AppBar)(({ theme }) => {
  return {
    backgroundColor: '#fff',
    boxShadow: 'none',
    // padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
    position: 'static'
    // height: '50vh'
  }
})

type TSubredditTopNavProps = {
  name: string | null | undefined
  subType: string | null | undefined
  headline: string | null | undefined
}

function SubredditTopNav({ name, subType, headline }: TSubredditTopNavProps) {
  const { me } = useContext(AppContext)
  const [showLeaveBtn, setShowLeaveBtn] = useState(false)

  return (
    <Box flexGrow={1}>
      <SubredditNavBar sx={{ pb: 2 }}>
        <Image
          src={generateUserCover(name, 2000, 300)}
          width={2000}
          height={300}
          style={{ width: '100%', height: '30vh', objectFit: 'cover' }}
          alt="subreddit cover"
          aria-label="subreddit cover"
        />
        <Container maxWidth="md" sx={{ pt: 2 }}>
          <Stack direction="row" justifyContent="flex-start">
            <Avatar
              sx={{
                width: 100,
                height: 100,
                backgroundColor: generateSeededHexColor(name),
                border: (theme): string => `5px solid ${theme.palette.white.main}`,
                position: 'relative',
                top: '-2.5rem',
                mr: 2
              }}
              alt={`subreddit ${name} avatar`}
              src={generateUserImage(name)}
            />
            <Stack>
              <Typography fontWeight={700} variant="h4">
                {headline ?? name}
              </Typography>
              <Typography fontWeight={700} variant="subtitle1" sx={{ color: 'hintText.main' }}>
                r/{name}
              </Typography>
            </Stack>
            <Stack sx={{ alignSelf: 'flex-start', alignItems: 'center', ml: 'auto' }} direction="row">
              {me?.member_of_ids?.includes(name as string) ? (
                <RdButton
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
          </Stack>
        </Container>
      </SubredditNavBar>
    </Box>
  )
}

export default SubredditTopNav
