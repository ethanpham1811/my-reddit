import { RdCard } from '@/components'
import { Elements } from '@stripe/react-stripe-js'
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js'
import RdStripeForm from '../../utilities/RdStripeForm/RdStripeForm'

function CardPayment() {
  const options: StripeElementsOptions = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
    appearance: {}
  }

  const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh')
  return (
    <RdCard sx={{ p: 2.5, pt: 1.5 }}>
      {/* <RdStepper /> */}
      <Elements stripe={stripePromise} options={options}>
        <RdStripeForm />
      </Elements>
    </RdCard>
  )
}

export default CardPayment
