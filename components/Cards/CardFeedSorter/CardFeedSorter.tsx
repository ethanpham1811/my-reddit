import { RdCard } from '@/components'
import { LocalFireDepartmentIcon, TrendingUpOutlinedIcon, WbSunnyIcon } from '@/constants/icons'
import { ToggleButton, ToggleButtonGroup, Typography, styled } from '@mui/material'
import { MouseEvent, ReactNode, useState } from 'react'
import { v4 as rid } from 'uuid'

type TSorter = {
  icon: ReactNode
  methodValue: string
  label: string
  description: string
}

const data: TSorter[] = [
  {
    icon: <WbSunnyIcon />,
    methodValue: 'new',
    description: 'New posts',
    label: 'New'
  },
  {
    icon: <LocalFireDepartmentIcon />,
    methodValue: 'upvote',
    description: 'Most upvoted',
    label: 'Hot'
  },
  {
    icon: <TrendingUpOutlinedIcon />,
    methodValue: 'trending',
    description: 'Top trending',
    label: 'Rising'
  }
]

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius
    }
  }
}))

function CardFeedSorter() {
  const [sortMethod, setSortMethod] = useState('new')

  const handleSort = (event: MouseEvent<HTMLElement>, sortMethod: string) => {
    setSortMethod(sortMethod)
  }

  return (
    <RdCard>
      <StyledToggleButtonGroup
        exclusive
        sx={{ display: 'flex', gap: 2 }}
        size="small"
        value={sortMethod}
        onChange={handleSort}
        aria-label="new feeds sorter"
      >
        {data.length > 0 &&
          data.map((item) => (
            <ToggleButton
              key={`sorter_${rid()}`}
              value={item.methodValue}
              aria-label={item.description}
              sx={{ borderRadius: '9999px !important', paddingRight: 1.5, gap: 0.5 }}
            >
              {item.icon}
              <Typography fontWeight={700} textTransform="capitalize">
                {item.label}
              </Typography>
            </ToggleButton>
          ))}
      </StyledToggleButtonGroup>
    </RdCard>
  )
}

export default CardFeedSorter
