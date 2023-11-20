import { Box } from '@/src/mui'
import { Jelly } from '@uiball/loaders'

export const DrawerFallback = () => (
  <Box width={{ xs: '100vw', sm: 520, lg: 720 }} height="100dvh" display="flex" justifyContent="center" alignItems="center">
    <Jelly size={30} speed={0.7} color="#ff4500" />
  </Box>
)
