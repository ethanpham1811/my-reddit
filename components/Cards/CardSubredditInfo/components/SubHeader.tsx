import { CardHeader } from '@/mui'
import { generateSeededHexColor } from '@/src/utils'

function SubHeader({ name }: { name: string | undefined }) {
  return (
    <CardHeader
      titleTypographyProps={{ sx: { fontWeight: 600, fontSize: '0.9rem', color: 'white.main' } }}
      title="About Community"
      sx={{
        p: 2,
        mx: -2,
        mt: -2,
        width: 'auto',
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
