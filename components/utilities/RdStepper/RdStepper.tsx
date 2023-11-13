import { TStepperData } from '@/constants/types'
import { Box, Button, Step, StepButton, Stepper, Typography } from '@/mui'
import { Divider, Stack } from '@mui/material'
import { Dispatch, ReactNode, SetStateAction } from 'react'

type TRdStepperProps = {
  steps: TStepperData[]
  renderStepTab: (activeStep: number) => ReactNode
  activeStep: number
  stepFinished: boolean
  middleBtnSlot?: ReactNode
  setActiveStep: Dispatch<SetStateAction<number>>
}

const RdStepper = ({ middleBtnSlot, steps, activeStep, setActiveStep, renderStepTab, stepFinished }: TRdStepperProps) => {
  const totalSteps: number = steps?.length || 0
  const isLastStep: boolean = activeStep === totalSteps
  const isFirststep: boolean = activeStep === 1

  const handleNext = () => !isLastStep && stepFinished && setActiveStep((prevStep) => prevStep + 1)
  const handleBack = () => !isFirststep && setActiveStep((prevStep) => prevStep - 1)

  return (
    <Box sx={{ width: '100%', height: '100%' }} display="flex" flexDirection="column">
      {/* header indicator */}
      <Stepper nonLinear activeStep={activeStep - 1}>
        {steps?.map(({ stepLabel }, index) => (
          <Step key={stepLabel} completed={index + 1 < activeStep}>
            <StepButton
              disableRipple
              disabled
              sx={{
                '.Mui-completed': {
                  svg: {
                    color: 'orange.main'
                  }
                },
                '.Mui-active': {
                  svg: {
                    borderRadius: '999px',
                    border: '2px solid',
                    borderColor: 'orange.main',
                    color: 'white.main',
                    '.MuiStepIcon-text': { color: 'white.main' }
                  }
                },
                svg: { color: 'primary.main' }
              }}
            >
              {stepLabel}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Divider sx={{ mt: 4, mb: 2 }} />

      {/* dynamic step content */}
      <Typography sx={{ mb: 2 }} variant="subtitle2" fontSize="1rem" textAlign="center">
        {steps[activeStep - 1]?.stepLabel}
      </Typography>
      <Box display="flex" my="auto">
        {renderStepTab(activeStep)}
      </Box>

      {/* bottom navigation */}
      <Box mt="auto">
        <Divider sx={{ mt: 4 }} />
        <Stack>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, pb: 0 }}>
            <Button disabled={isFirststep} color="orange" onClick={handleBack}>
              Back
            </Button>
            <Box flex={1} display="flex" justifyContent="center">
              {middleBtnSlot}
            </Box>
            <Button disabled={isLastStep || !stepFinished} color="orange" onClick={handleNext}>
              Next
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
export default RdStepper
