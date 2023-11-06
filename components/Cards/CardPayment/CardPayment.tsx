import RdStepper from '@/components/utilities/RdStepper/RdStepper'
import { CloseIcon } from '@/constants/icons'
import { Box, IconButton } from '@/mui'
import { Dispatch, SetStateAction, createElement, useState } from 'react'
import { componentRegistry, pricinginfoData, steps } from './data'

function CardPayment({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  const [activeStep, setActiveStep] = useState<number>(1)
  const [selectedPricing, setSelectedPricing] = useState<number | null>(null)
  const stepFinished = checkSelectedPricing(activeStep)

  // retrieve price from pricing data
  const selectedPrice = selectedPricing != null ? pricinginfoData[selectedPricing].price : 0

  const closeDrawerBtn = (
    <IconButton onClick={() => setOpen(false)}>
      <CloseIcon sx={{ color: 'actionIcon.main', fontSize: '1.5rem' }} />
    </IconButton>
  )

  /* dynamically return step components */
  function renderStepContent(activeStep: number) {
    const componentName: string = steps[activeStep - 1].component
    const StepContent = componentRegistry[componentName]
    const props: { [key: string]: unknown } = {}

    /* pass the needed props */
    if (componentName === 'PricingInfo') {
      props.selectedPricing = selectedPricing
      props.setSelectedPricing = setSelectedPricing
    }
    if (componentName === 'PaymentCheckout') {
      props.amount = selectedPrice
    }

    return createElement(StepContent, props)
  }

  /* if user hasn't choose pricing at step 2, block next step */
  function checkSelectedPricing(activeStep: number): boolean {
    return activeStep === 2 ? selectedPricing != null : true
  }

  return (
    <Box
      alignSelf="center"
      px={{ xs: 2, sm: 5 }}
      py={{ xs: 1, sm: 5 }}
      height="100vh"
      display="flex"
      flexDirection="column"
      width={{ xs: '100vw', sm: 520, lg: 720 }}
    >
      <RdStepper
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        stepFinished={stepFinished}
        steps={steps}
        renderStepContent={renderStepContent}
        middleBtnSlot={closeDrawerBtn}
      />
    </Box>
  )
}

export default CardPayment

// maxWidth={{ xs: '100vw', sm: '50vw' }}
