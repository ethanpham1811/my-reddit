import { Avatar, Box } from '@/src/mui'
import { generateSeededHexColor, generateUserImage } from '@/src/services/utils'
import Link from 'next/link'

function SubredditAvatar({ name }: { name: string | undefined }) {
  return (
    <Box position={{ xs: 'absolute', md: 'relative' }} sx={{ translate: { xs: '-50% calc(-50% - 3.5rem)', md: 'none' } }} left={{ xs: '50%', md: 0 }}>
      <Link href={`/r/${name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Avatar
          sx={{
            width: 100,
            height: 100,
            backgroundColor: generateSeededHexColor(name),
            border: (theme): string => `5px solid ${theme.palette.white.main}`,
            position: 'relative',
            top: { xs: 0, md: '-2.5rem' },
            mr: 2
          }}
          alt={`subreddit ${name} avatar`}
          src={generateUserImage(name)}
        />
      </Link>
    </Box>
  )
}

export default SubredditAvatar
