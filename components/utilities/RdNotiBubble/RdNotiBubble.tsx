import { Badge, styled } from '@mui/material'
import { ReactNode } from 'react'

type RdNotiBubbleProps = {
  content: number | string
  max: number
  children: ReactNode
}

function RdNotiBubble({ content, max, children }: RdNotiBubbleProps) {
  const RdNotiBubble = styled(Badge)(() => {
    return {
      '.MuiBadge-badge': {
        fontSize: '0.5rem',
        padding: '0 2px',
        height: '16px',
        lineHeight: 1,
        color: 'white',
        minWidth: '16px',
        backgroundColor: '#ff4500'
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
