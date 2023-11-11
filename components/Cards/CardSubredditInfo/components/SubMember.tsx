import { Box, Typography } from '@/mui'
import { formatNumber } from '@/src/utils'

function SubMember({ member }: { member: number | undefined }) {
  return (
    <Box display="flex" justifyContent="center" py={1} alignItems="center">
      <Typography variant="subtitle1" fontWeight={700}>
        {formatNumber(member || 0)}
      </Typography>{' '}
      &nbsp;
      <Typography variant="subtitle2" sx={{ color: 'hintText.main' }}>
        members
      </Typography>
    </Box>
  )
}

export default SubMember
