import { BORDER_TYPES } from '@/constants/enums'
import { useSubredditUpdate } from '@/hooks'
import { AppBar, Avatar, Box, Container, Stack, Typography, styled } from '@/mui'
import { textValidation } from '@/src/formValidations'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { RdChip, RdInlineInput, RdToast } from '..'
import { generateSeededHexColor, generateUserCover, generateUserImage } from '../../src/utils'
import { useAppSession } from '../Layouts/MainLayout'
import ActionButton from './components/ActionButton'

const SubredditNavBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.white.main,
  boxShadow: 'none',
  position: 'static'
}))

type TSubredditTopNavProps = {
  id: number | undefined
  isChildrenContent: boolean | undefined
  name: string | undefined
  owner: string | undefined
  subType: string | undefined
  headline: string | undefined
}
type TSubredditEditForm = {
  headline: string
}

/**
 * 100% wide subreddit cover component
 */
function SubredditTopNav({ id, isChildrenContent, name, owner, subType, headline }: TSubredditTopNavProps) {
  const { session } = useAppSession()
  const me = session?.userDetail
  const isMySub: boolean = owner === me?.username
  const { updateSub } = useSubredditUpdate()
  const { control, setValue, getValues, handleSubmit, clearErrors } = useForm<TSubredditEditForm>()

  // populate current headline to the form
  useEffect(() => {
    headline && setValue('headline', headline as string)
  }, [headline, setValue])

  /* Edit headline request */
  async function onChangeHeadline(field: keyof TSubredditEditForm, val: unknown) {
    if (typeof val !== 'string' || !id || !val) return
    const value = val || getValues(field)

    if (me && value && value !== headline) {
      handleSubmit(
        async () => {
          toast.promise(updateSub(id.toString(), { headline: val }), {
            loading: <RdToast message="Updating Subreddit..." />,
            success: <RdToast message="Subreddit saved!" />,
            error: <RdToast message="Could not save." />
          })
        },
        () => {
          // reset the field with initial value
          setValue('headline', headline ? headline : name ? name : '')
        }
      )()
    } else setValue('headline', headline ? headline : name ? name : '') // reset the field with initial value

    clearErrors()
  }

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
            {/* Sub avatar */}
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

            {/* Headline & sub Name */}
            <Stack alignItems={{ xs: 'center', sm: 'flex-start' }} flex={1}>
              <Typography fontWeight={700} variant="h4" width="100%" fontSize="1.8rem" textAlign={{ xs: 'center', sm: 'left' }}>
                {isMySub ? (
                  <RdInlineInput<TSubredditEditForm>
                    registerOptions={{ validate: (val) => textValidation(val, 60) }}
                    onFieldSubmit={onChangeHeadline}
                    control={control}
                    name="headline"
                    headline
                    fontSize="1.8rem"
                    endIcon
                  />
                ) : (
                  headline || name
                )}
              </Typography>

              {/* sub name + is SFW chip */}
              <Stack direction="row" spacing={0.5} mt={0.5}>
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
