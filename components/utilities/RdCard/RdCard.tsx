import { Card } from '@mui/material'
import { ReactNode } from 'react'

type RdCardProps = {
  children: ReactNode
}

function RdCard({ children }: RdCardProps) {
  return (
    <Card variant="outlined" sx={{ padding: '0.5rem', border: (theme) => `1px solid ${theme.palette.cardBorder.main}` }}>
      {children}
    </Card>
  )
}

export default RdCard
