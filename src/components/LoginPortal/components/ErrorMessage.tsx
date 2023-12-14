import { Stack, Typography } from '@/src/mui'

function ErrorMessage({ error }: { error: string }) {
  return (
    <Stack alignItems="center">
      <Typography fontSize="0.8rem" sx={{ color: 'orange.main' }}>
        {error}
      </Typography>
    </Stack>
  )
}

export default ErrorMessage
