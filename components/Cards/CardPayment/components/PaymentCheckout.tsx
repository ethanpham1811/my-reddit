import { RdPaypalForm } from '@/components'
import { Stack, Typography } from '@mui/material'

type TPaymentCheckoutProps = {
  amount: number | null
}

function PaymentCheckout({ amount }: TPaymentCheckoutProps) {
  return (
    <Stack width={{ xs: '100%', sm: 520 }} mx="auto">
      {amount ? (
        <RdPaypalForm amount={amount} />
      ) : (
        <Typography textAlign="center" width="100%">
          Please choose your package
        </Typography>
      )}
    </Stack>
  )
}

export default PaymentCheckout
