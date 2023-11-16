import { CardHeader } from '@/mui'
import { generateSeededHexColor } from '@/src/utils'

function SubHeader({ name, isMobile }: { name: string | undefined; isMobile: boolean }) {
  return (
    <CardHeader
      titleTypographyProps={{ sx: { fontWeight: 600, fontSize: '0.9rem', color: 'white.main' } }}
      title="About Community"
      sx={{
        p: 2,
        mx: -2,
        mt: -2,
        width: 'auto',
        flex: 1,
        cursor: { xs: 'pointer', md: 'auto' },
        bgcolor: generateSeededHexColor(name || 'seed'),
        '.MuiCardHeader-content': {
          display: 'flex',
          alignItems: 'center'
        }
      }}
    />
  )
}

export default SubHeader
