import { CardHeader, Stack, Typography } from '@/src/mui'
import { StackProps } from '@mui/material/Stack'
import { v4 as rid } from 'uuid'

type TRdAdItemProps = StackProps & {
  title: string
  list: string[]
}

function RdFunctionItem({ title, list, ...rest }: TRdAdItemProps) {
  const id: string = rid()

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
      {/* <CardMedia component="img" image={imgUrl} alt="ad icon" sx={{ width: '40px' }} /> */}
      <CardHeader titleTypographyProps={{ sx: { fontWeight: 700, fontSize: '0.8rem' } }} title={title} sx={{ p: 0 }} />
      {list.map((item, i) => (
        <Typography
          key={`function_list_item_${id}_${i}`}
          variant="body2"
          color="black"
          fontWeight={400}
          sx={{ py: 0, px: 2, textAlign: 'center', fontSize: '0.7rem' }}
        >
          {item}
        </Typography>
      ))}
    </Stack>
  )
}

export default RdFunctionItem
