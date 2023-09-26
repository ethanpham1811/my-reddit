import { Color } from '@/constants/types'
import { Badge, styled } from '@mui/material'
import { ReactNode } from 'react'

type RdNotiBubbleProps = {
  content: number | string
  color: Color | undefined
  max: number
  children: ReactNode
}

function RdNotiBubble({ content, color, max, children }: RdNotiBubbleProps) {
  const RdNotiBubble = styled(Badge)(() => {
    return {
      '.MuiBadge-badge': { fontSize: '0.5rem', padding: '0 2px', height: '16px', lineHeight: 1, minWidth: '16px' }
    }
  })
  return (
    <RdNotiBubble badgeContent={content} color={color} max={max}>
      {children}
    </RdNotiBubble>
  )
}

export default RdNotiBubble
