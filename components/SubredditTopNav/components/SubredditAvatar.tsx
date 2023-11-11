import { Avatar, Box } from '@/mui'
import Link from 'next/link'
import { generateSeededHexColor, generateUserImage } from '../../../src/utils'

function SubredditAvatar({ name }: { name: string | undefined }) {
  return (
    <Box position={{ xs: 'absolute', sm: 'relative' }} sx={{ translate: { xs: '-50% calc(-50% - 3.5rem)', sm: 'none' } }} left={{ xs: '50%', sm: 0 }}>
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
  )
}

export default SubredditAvatar
