import { Box, Typography } from '@/src/mui'
import { format } from 'date-fns'

function SubCreatedDate({ created_at }: { created_at: string | undefined }) {
  return (
    <Box display="flex" justifyContent="center" py={1} alignItems="center">
      <Typography variant="subtitle2" sx={{ fontSize: '0.8rem', mr: '5px', color: 'gray.dark' }}>
        Started since
      </Typography>
      <Typography variant="subtitle1" color="black" fontWeight={700}>
        {created_at && format(new Date(created_at), 'MMM yyyy')}
      </Typography>
    </Box>
  )
}

export default SubCreatedDate
