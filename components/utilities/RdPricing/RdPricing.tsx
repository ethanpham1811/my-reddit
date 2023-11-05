import { CheckIcon } from '@/constants/icons'
import { Divider, List, ListItem, Stack, StackProps, Typography } from '@mui/material'

type TRdAdItemProps = StackProps & {
  title: string
  description: string
  price: number
  benefits: string[]
  active: boolean
}

function RdPricing({ active, title, description, price, benefits, sx, ...rest }: TRdAdItemProps) {
  return (
    <Stack
      sx={{ '&:hover': { cursor: 'pointer' }, bgcolor: active ? 'lightblue.main' : 'transparent', ...sx }}
      justifySelf="center"
      spacing={1}
      border="1px solid"
      borderColor="cardBorder.main"
      py={1.5}
      px={2}
      borderRadius={3}
      flex={1}
      {...rest}
    >
      <Stack direction="row" alignItems="flex-end" gap={0.5}>
        <Typography variant="h5" color="black" fontWeight={700} sx={{ p: 0 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="black" fontWeight={600} sx={{ fontSize: '1rem', pb: 0.2 }}>
          {active && '(selected)'}
        </Typography>
      </Stack>
      <Typography variant="subtitle2" color="black" fontWeight={400} sx={{ p: 0, fontSize: '0.8rem' }}>
        {description}
      </Typography>
      <Stack direction="row" alignItems="flex-end">
        <Typography variant="h3" ml="auto">
          {price}
        </Typography>
        <Typography variant="body1" fontWeight={400} fontSize="1.2rem" mr="auto">
          $/yr
        </Typography>
      </Stack>
      <Divider />
      <List>
        {benefits.map((benefit, i) => (
          <ListItem key={`pricing_benefit_${i}`} sx={{ p: 0 }}>
            <Typography variant="body2" display="flex" alignItems="flex-start" gap={0.5}>
              <CheckIcon sx={{ fontSize: '1rem' }} />
              {benefit}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}

export default RdPricing
