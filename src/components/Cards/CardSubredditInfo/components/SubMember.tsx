import { Box, Typography } from '@/src/mui'
import { formatNumber } from '@/src/services/utils'

function SubMember({ member }: { member: number | undefined }) {
  return (
    <Box display="flex" justifyContent="center" py={1} alignItems="center">
      <Typography variant="subtitle1" fontWeight={700}>
        {formatNumber(member || 0)}
      </Typography>{' '}
      &nbsp;
      <Typography variant="subtitle2" sx={{ color: 'gray.dark' }}>
        members
      </Typography>
    </Box>
  )
}

export default SubMember
