import { CardHeader, CardMedia, Stack, StackProps, Typography } from '@mui/material'

type TRdAdItemProps = StackProps & {
  title: string
  description: string
  imgUrl: string
}

function RdAdItem({ title, description, imgUrl, ...rest }: TRdAdItemProps) {
  return (
    <Stack
      justifySelf="center"
      spacing={1}
      border="1px solid"
      borderColor="cardBorder.main"
      py={1.5}
      px={1}
      borderRadius={3}
      alignItems="center"
      {...rest}
    >
      <CardMedia component="img" image={imgUrl} alt="ad icon" sx={{ width: '40px' }} />
      <CardHeader titleTypographyProps={{ sx: { fontWeight: 700, fontSize: '0.8rem' } }} title={title} sx={{ p: 0 }} />
      <Typography variant="body2" color="black" fontWeight={400} sx={{ py: 0, px: 2, textAlign: 'center', fontSize: '0.7rem' }}>
        {description}
      </Typography>
    </Stack>
  )
}

export default RdAdItem
