import { AppBar, Avatar, Box, Container, Stack, Typography, styled } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { generateSeededHexColor, generateUserCover, generateUserImage } from '../../src/utils'
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
        <Container maxWidth="md" sx={{ pt: { xs: 7, sm: 2 } }}>
          <Stack direction={{ xs: 'column', sm: 'row' }}>
            <Box
              position={{ xs: 'absolute', sm: 'relative' }}
              sx={{ translate: { xs: '-50% calc(-50% - 3.5rem)', sm: 'none' } }}
              left={{ xs: '50%', sm: 0 }}
            >
              <Link href={`/r/${name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    backgroundColor: generateSeededHexColor(name),
                    border: (theme): string => `5px solid ${theme.palette.white.main}`,
                    position: 'relative',
                    top: { xs: 0, sm: '-2.5rem' },
                    mr: 2
                  }}
                  alt={`subreddit ${name} avatar`}
                  src={generateUserImage(name)}
                />
              </Link>
            </Box>
            <Stack alignItems={{ xs: 'center', sm: 'flex-start' }}>
              <Typography fontWeight={700} variant="h4" textAlign={{ xs: 'center', sm: 'left' }}>
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
