import notFoundUrl from '@/public/telescope-robot.png'
import { CardContent, CardMedia, Link, Stack, Typography } from '@mui/material'
import { RdCard } from '../..'

export const NotFound = ({ searchTerm }: { searchTerm?: string }) => {
  const focusSearchBar = () => {
    // TODO: focus search bar
  }
  return (
    <>
      <CardMedia sx={{ objectFit: 'contain', pt: 2 }} component="img" height="150" image={notFoundUrl.src} alt="Content not found" />
      <CardContent>
        <Stack alignItems="center">
          <Typography variant="h6" color="black" gutterBottom>
            {searchTerm ? `Hm... we couldn’t find any results for “${searchTerm}”` : '404 - Page not found'}
          </Typography>
          <Typography variant="body1" sx={{ color: 'hintText.main' }}>
            {searchTerm ? 'Double-check your spelling or try different keywords to ' : 'You might want to return to '}
            {searchTerm ? (
              <Link color="blue.main" sx={{ cursor: 'pointer' }} onClick={focusSearchBar}>
                adjust your search
              </Link>
            ) : (
              <Link href={'/'} color="blue.main" sx={{ cursor: 'pointer' }} onClick={focusSearchBar}>
                Homepage
              </Link>
            )}
          </Typography>
        </Stack>
      </CardContent>
    </>
  )
}
function CardNotFound({ searchTerm }: { searchTerm: string }) {
  return (
    <RdCard>
      <NotFound searchTerm={searchTerm} />
    </RdCard>
  )
}

export default CardNotFound
