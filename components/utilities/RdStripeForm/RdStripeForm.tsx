import { RdButton } from '@/components'
import { Divider, Stack, Typography } from '@mui/material'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { StripeError } from '@stripe/stripe-js'
import { FormEvent, useState } from 'react'

const RdStripeForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (elements == null) return

    // Trigger form validation and wallet collection
    const { error: submitError }: { error?: StripeError | undefined } = await elements.submit()
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message || null)
      return
    }

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    const res = await fetch('/create-intent', {
      method: 'POST'
    })

    const { client_secret: clientSecret } = await res.json()

    if (!stripe) return
    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: 'http://localhost:3000'
      }
    })

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error?.message || 'Something went wrong')
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <PaymentElement />
        {/* Show error message to your customers */}
        {errorMessage && (
          <Typography variant="body2" color="orange.main">
            {errorMessage}
          </Typography>
        )}

        <Divider />
        {/* disabled={!stripe || !elements}  */}
        <Typography display="block" textAlign="center" color="blue.main" fontSize="0.8rem">
          Feature comming soon
        </Typography>
        <RdButton text={'Subscribe'} invertColor filled />
      </Stack>
    </form>
  )
}

export default RdStripeForm
