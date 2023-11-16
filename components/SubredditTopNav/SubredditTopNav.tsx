import { BORDER_TYPES } from '@/constants/enums'
import { TSubredditDetail, TSubredditEditForm } from '@/constants/types'
import { useSubUpdateForm, useSubredditUpdate } from '@/hooks'
import { AppBar, Box, Container, Stack, Typography, styled } from '@/mui'
import { textValidation } from '@/src/formValidations'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { RdChip, RdInlineInput } from '..'
import { generateUserCover } from '../../src/utils'
import { useAppSession } from '../Layouts/MainLayout'
import ActionButton from './components/ActionButton'
import SubredditAvatar from './components/SubredditAvatar'

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
  const { updateSub } = useSubredditUpdate()
  const { control, onChangeSubInfo, setFormValue } = useSubUpdateForm(subreddit, updateSub)
  const { headline, name, isChildrenContent, subType } = subreddit || {}

  // populate current headline to the form
  useEffect(() => {
    if (subreddit) {
      setFormValue('headline', headline as string)
    }
  }, [subreddit, setFormValue, headline])

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
              <Typography fontWeight={700} variant="h4" width="100%" fontSize="1.8rem" textAlign={{ xs: 'center', md: 'left' }}>
                {isMySub ? (
                  <RdInlineInput<TSubredditEditForm>
                    registerOptions={{ validate: (val) => textValidation(val, 60) }}
                    onFieldSubmit={onChangeSubInfo}
                    control={control}
                    name="headline"
                    headline
                    fontSize="1.8rem"
                    endIcon
                  />
                ) : (
                  headline
                )}
              </Typography>

              {/* sub name + is SFW chip */}
              <Stack direction="row" spacing={0.5} mt={1}>
                <Typography fontWeight={700} variant="subtitle1" sx={{ color: 'hintText.main' }}>
                  <Link href={`/r/${name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    r/{name}
                  </Link>
                </Typography>
                {isChildrenContent && (
                  <RdChip shape={BORDER_TYPES.Rounded} clickable={false} size="small" label="Super SFW" color="success" variant="filled" />
                )}
              </Stack>
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
