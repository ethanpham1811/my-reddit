import { TSubredditDetail } from '@/src/constants/types'
import { AppBar, Box, Container, Stack, styled } from '@/src/mui'
import { generateUserCover } from '@/src/services/utils'
import Image from 'next/image'
import { useAppSession } from '../../Layouts/MainLayout'
import ActionButton from './components/ActionButton'
import SubredditAvatar from './components/SubredditAvatar'
import SubredditHeadLine from './components/SubredditHeadLine'
import SubredditInfo from './components/SubredditInfo'

const SubredditNavBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.white.main,
  boxShadow: 'none',
  position: 'static'
}))

type TSubredditTopNavProps = {
  subreddit: TSubredditDetail | null
  owner: string | undefined
}

/**
 * 100% wide subreddit cover component
 */
function SubredditTopNav({ subreddit, owner }: TSubredditTopNavProps) {
  const { session } = useAppSession()
  const me = session?.userDetail
  const isMySub: boolean = owner === me?.username
  const { name, isChildrenContent, subType } = subreddit || {}

  return (
    <Box flexGrow={1}>
      <SubredditNavBar sx={{ pb: 2 }}>
        <Image
          src={generateUserCover(name, 2000, 300)}
          width={2000}
          height={300}
          style={{ width: '100%', height: '30dvh', objectFit: 'cover' }}
          alt="subreddit cover"
          aria-label="subreddit cover"
        />
        <Container maxWidth="md" sx={{ pt: { xs: 7, md: 2 } }}>
          <Stack direction={{ xs: 'column', md: 'row' }}>
            {/* Sub avatar */}
            <SubredditAvatar name={name} />

            <Stack alignItems={{ xs: 'center', md: 'flex-start' }} flex={1}>
              {/* Headline */}
              <SubredditHeadLine isMySub={isMySub} subreddit={subreddit} />

              {/* sub name + is SFW chip */}
              <SubredditInfo isChildrenContent={isChildrenContent} name={name} />
            </Stack>

            {/* member status and subreddit type indicator */}
            <ActionButton isMySub={isMySub} name={name} subType={subType} />
          </Stack>
        </Container>
      </SubredditNavBar>
    </Box>
  )
}

export default SubredditTopNav
