import { RdCard } from '@/components'
import { StripeElementsOptions } from '@stripe/stripe-js'

function CardPayment() {
  const options: StripeElementsOptions = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
    appearance: {}
  }

  // const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh')
  return (
    <RdCard sx={{ p: 2.5, pt: 1.5 }}>
      {/* <RdStepper /> */}
      {/* <Elements stripe={stripePromise} options={options}>
        <RdStripeForm />
      </Elements> */}
    </RdCard>
  )
}

export default CardPayment
