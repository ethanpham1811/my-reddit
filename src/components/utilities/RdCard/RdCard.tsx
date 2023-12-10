import Card, { CardProps } from '@mui/material/Card'

function RdCard({ children, sx, ...rest }: CardProps) {
  return (
    <Card variant="outlined" sx={{ p: 1, border: (theme): string => `1px solid ${theme.palette.gray.light}`, ...sx }} {...rest}>
      {children}
    </Card>
  )
}

export default RdCard
