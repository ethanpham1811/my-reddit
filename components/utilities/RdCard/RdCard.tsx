import { Card, SxProps, Theme } from '@mui/material'
import { ReactNode } from 'react'

type RdCardProps = {
  children: ReactNode
  sx?: SxProps<Theme> | undefined
}

function RdCard({ children, sx }: RdCardProps) {
  return (
    <Card variant="outlined" sx={{ p: '0.5rem', border: (theme): string => `1px solid ${theme.palette.cardBorder.main}`, ...sx }}>
      {children}
    </Card>
  )
}

export default RdCard
