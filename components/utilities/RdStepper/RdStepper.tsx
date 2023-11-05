import { TStepperData } from '@/constants/types'
import { Divider, Stack } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Step from '@mui/material/Step'
import StepButton from '@mui/material/StepButton'
import Stepper from '@mui/material/Stepper'
import Typography from '@mui/material/Typography'
import { Dispatch, ReactNode, SetStateAction } from 'react'

type TRdStepperProps = {
  steps: TStepperData[]
  renderStepContent: (activeStep: number) => ReactNode
  activeStep: number
  stepFinished: boolean
  setActiveStep: Dispatch<SetStateAction<number>>
}

const RdStepper = ({ steps, activeStep, setActiveStep, renderStepContent, stepFinished }: TRdStepperProps) => {
  const totalSteps: number = steps?.length || 0
  const isLastStep: boolean = activeStep === totalSteps
  const isFirststep: boolean = activeStep === 1

  const handleNext = () => !isLastStep && setActiveStep((prevStep) => prevStep + 1)
  const handleBack = () => !isFirststep && stepFinished && setActiveStep((prevStep) => prevStep - 1)

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
        {renderStepContent(activeStep)}
      </Box>

      {/* bottom navigation */}
      <Box mt="auto">
        <Divider sx={{ mt: 4 }} />
        <Stack>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, pb: 3 }}>
            <Button disabled={isFirststep} color="orange" onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button disabled={isLastStep || !stepFinished} color="orange" onClick={handleNext} sx={{ mr: 1 }}>
              Next
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
export default RdStepper
