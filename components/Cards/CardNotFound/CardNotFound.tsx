import notFoundUrl from '@/public/telescope-robot.png'
import { CardContent, CardMedia, Link, Stack, Typography } from '@mui/material'
import { RdCard } from '../..'

function CardNotFound() {
  const focusSearchBar = () => {
    // TODO: focus search bar
  }
  return (
    <RdCard>
      <CardMedia sx={{ objectFit: 'contain', pt: 2 }} component="img" height="150" image={notFoundUrl.src} alt="Content not found" />
      <CardContent>
        <Stack alignItems="center">
          <Typography variant="h6" color="black" gutterBottom>
            Hm... we couldn’t find any results for “j”
          </Typography>
          <Typography variant="body1" sx={{ color: 'hintText.main' }}>
            Double-check your spelling or try different keywords to{' '}
            <Link color="blue.main" sx={{ cursor: 'pointer' }} onClick={focusSearchBar}>
              adjust your search
            </Link>
          </Typography>
        </Stack>
      </CardContent>
    </RdCard>
  )
}

export default CardNotFound
