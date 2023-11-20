import { RdChip } from '@/src/components'
import { useAppSession } from '@/src/Layouts/MainLayout'
import { Avatar, Stack, Typography } from '@/src/mui'
import { generateSeededHexColor, generateUserImage } from '@/src/services/utils'
import Link from 'next/link'

function SubOwner({ ownerUsername }: { ownerUsername: string | undefined }) {
  const { session } = useAppSession()
  const me = session?.userDetail
  const isMySub: boolean = ownerUsername === me?.username

  return (
    <Stack justifyContent="center" alignItems="center" py={1}>
      {!isMySub ? (
        <>
          <Typography variant="subtitle1" fontWeight={700}>
            Admin
          </Typography>{' '}
          <Link
            href={`/u/${ownerUsername}`}
            style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Avatar
              variant="circular"
              sx={{
                width: 30,
                height: 30,
                backgroundColor: generateSeededHexColor(ownerUsername),
                border: (theme): string => `4px solid ${theme.palette.primary.main}`
              }}
              src={generateUserImage(ownerUsername)}
            />
            <Typography variant="subtitle2" sx={{ color: 'blue.main' }}>
              {ownerUsername}
            </Typography>
          </Link>
        </>
      ) : (
        <RdChip label="My subreddit" sx={{ fontSize: '0.8rem', p: 2, fontWeight: 700, color: 'blue.main' }} />
      )}
    </Stack>
  )
}

export default SubOwner
