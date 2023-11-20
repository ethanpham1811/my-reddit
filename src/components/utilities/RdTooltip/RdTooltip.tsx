import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import { ReactNode } from 'react'

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} arrow={true} classes={{ popper: className }} />)(
  ({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.orange.main,
      color: 'white',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      '.MuiTooltip-arrow': {
        color: theme.palette.orange.main
      }
    }
  })
)

function RdTooltip({ children, ...props }: TooltipProps & { children: ReactNode }) {
  return (
    <StyledTooltip arrow={true} {...props}>
      {children}
    </StyledTooltip>
  )
}

export default RdTooltip
