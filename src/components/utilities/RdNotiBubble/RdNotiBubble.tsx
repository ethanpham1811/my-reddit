import {} from '@/src/constants/types'
import { styled } from '@/src/mui'
import Badge, { BadgeProps } from '@mui/material/Badge'
import { ReactNode } from 'react'

type TRdNotiBubbleProps = BadgeProps & {
  max: number
  children: ReactNode
}
function RdNotiBubble({ max, children }: TRdNotiBubbleProps) {
  const RdNotiBubble = styled(Badge)(({ theme }) => {
    return {
      '.MuiBadge-badge': {
        fontSize: '0.5rem',
        padding: '0 4px',
        height: '16px',
        lineHeight: 1,
        color: '#fff',
        minWidth: '16px',
        backgroundColor: theme.palette.orange.main
      }
    }
  })
  return <RdNotiBubble max={max}>{children}</RdNotiBubble>
}

export default RdNotiBubble
