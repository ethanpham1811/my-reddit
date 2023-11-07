import { ErrorOutlineIcon } from '@/constants/icons'
import { Box, Typography } from '@/mui'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'

const RdPaypalForm = ({ amount }: { amount: number }) => {
  function createOrder() {
    // replace this url with your server
    return fetch('https://react-paypal-js-storybook.fly.dev/api/paypal/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // use the "body" param to optionally pass additional order information
      // like product ids and quantities
      body: JSON.stringify({
        cart: [
          {
            sku: '1blwyeo8',
            quantity: 2
          }
        ]
      })
    })
      .then((response) => response.json())
      .then((order) => {
        // Your code here after create the order
        return order.id
      })
  }
  function onApprove(data: unknown) {
    // replace this url with your server
    return fetch('https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        orderID: data && typeof data === 'object' && 'orderID' in data && data.orderID
      })
    })
      .then((response) => response.json())
      .then((orderData) => {
        // Your code here after capture the order
      })
  }

  const [{ isPending }] = usePayPalScriptReducer()

  return (
    <Box sx={{ width: '100%', mx: 'auto', '.paypal-buttons': { width: '520px', minWidth: '100% !important' } }}>
      {isPending && <div className="spinner"></div>}
      <PayPalButtons
        style={{ layout: 'vertical', color: 'silver', height: 48, shape: 'pill', tagline: false }}
        disabled={false}
        forceReRender={[{ layout: 'vertical' }]}
        fundingSource={undefined}
        createOrder={createOrder}
        onApprove={onApprove}
      />
      <Typography textAlign="center" variant="body1" display="flex" justifyContent="center" alignItems="center">
        <ErrorOutlineIcon sx={{ fontSize: '1.2rem', color: 'orange.main', mr: 0.5 }} />
        Problem with sandbox account, please come back later!
      </Typography>
    </Box>
  )
}

export default RdPaypalForm
