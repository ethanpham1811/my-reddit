import { AppBar, Avatar, Box, Container, Stack, Typography, styled } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { generateSeededHexColor, generateUserCover, generateUserImage } from '../../services'
import ActionButton from './components/ActionButton'

const SubredditNavBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#fff',
  boxShadow: 'none',
  position: 'static'
}))

type TSubredditTopNavProps = {
  name: string | null | undefined
  subType: string | null | undefined
  headline: string | null | undefined
}

function SubredditTopNav({ name, subType, headline }: TSubredditTopNavProps) {
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
            <Link href={`/r/${name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
            </Link>
            <Stack>
              <Typography fontWeight={700} variant="h4">
                {headline || name}
              </Typography>
              <Typography fontWeight={700} variant="subtitle1" sx={{ color: 'hintText.main' }}>
                <Link href={`/r/${name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  r/{name}
                </Link>
              </Typography>
            </Stack>

            {/* member status and subreddit type indicator */}
            <ActionButton name={name} subType={subType} />
          </Stack>
        </Container>
      </SubredditNavBar>
    </Box>
  )
}

export default SubredditTopNav
