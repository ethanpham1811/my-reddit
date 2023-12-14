import { BORDER_TYPES } from '@/src/constants/enums'
import { Stack, Typography } from '@/src/mui'
import Link from 'next/link'
import { RdChip } from '../..'

type TSubredditInfoProps = {
  isChildrenContent: boolean | undefined
  name: string | undefined
}

function SubredditInfo({ isChildrenContent, name }: TSubredditInfoProps) {
  return (
    <Stack direction="row" spacing={0.5} mt={1}>
      <Typography fontWeight={700} variant="subtitle1" sx={{ color: 'gray.dark' }}>
        <Link href={`/r/${name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          r/{name}
        </Link>
      </Typography>
      {isChildrenContent && <RdChip shape={BORDER_TYPES.Rounded} clickable={false} size="small" label="Super SFW" color="success" variant="filled" />}
    </Stack>
  )
}

export default SubredditInfo
