import { TRdNotiBubbleProps } from '@/constants/types'
import { Badge, styled } from '@mui/material'

function RdNotiBubble({ content, max, children }: TRdNotiBubbleProps) {
  const RdNotiBubble = styled(Badge)(({ theme }) => {
    return {
      '.MuiBadge-badge': {
        fontSize: '0.5rem',
        padding: '0 4px',
        height: '16px',
        lineHeight: 1,
        color: 'white',
        minWidth: '16px',
        backgroundColor: theme.palette.orange.main
      }
    }
  })
  return (
    <RdNotiBubble badgeContent={content} max={max}>
      {children}
    </RdNotiBubble>
  )
}

export default RdNotiBubble
