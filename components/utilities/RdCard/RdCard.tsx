import { Card, CardOwnProps } from '@mui/material'

function RdCard({ children, sx, ...rest }: CardOwnProps) {
  return (
    <Card variant="outlined" sx={{ p: 1, border: (theme): string => `1px solid ${theme.palette.cardBorder.main}`, ...sx }} {...rest}>
      {children}
    </Card>
  )
}

export default RdCard
