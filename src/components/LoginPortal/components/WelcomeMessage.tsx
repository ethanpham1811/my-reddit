import { Stack, Typography } from '@/src/mui'

function WelcomeMessage({ userEmail }: { userEmail: string }) {
  return (
    <Stack alignItems="center">
      <Typography sx={{ color: 'gray.dark' }}>
        Welcome <Typography sx={{ color: 'orange.main' }}>{userEmail}</Typography>!
      </Typography>
      <Typography fontSize="0.8rem">Please login with your account</Typography>
    </Stack>
  )
}

export default WelcomeMessage
