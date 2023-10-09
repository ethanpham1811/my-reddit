import { NotificationsIcon } from '@/constants/icons'
import coverUrl from '@/public/1.jpg'
import { AppBar, Avatar, Box, Container, IconButton, Stack, Typography, styled } from '@mui/material'
import Image from 'next/image'
import { RdButton } from '..'
import { generateSeededHexColor, generateUserImage } from '../../services'

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
  headline: string | null | undefined
}

function SubredditTopNav({ name, headline }: TSubredditTopNavProps) {
  return (
    <Box flexGrow={1}>
      <SubredditNavBar sx={{ pb: 2 }}>
        <Image src={coverUrl} style={{ width: '100%', height: '30vh', objectFit: 'cover' }} alt="subreddit cover" aria-label="subreddit cover" />
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
            <Stack sx={{ alignSelf: 'flex-start' }} direction="row">
              <RdButton text="Joined" color="blue" sx={{ px: 3, py: 0, mx: 2, fontWeight: 700, fontSize: '0.8rem' }} />
              <IconButton>
                <NotificationsIcon sx={{ display: 'block', color: 'blue.main' }} />
              </IconButton>
            </Stack>
          </Stack>
        </Container>
      </SubredditNavBar>
    </Box>
  )
}

export default SubredditTopNav
