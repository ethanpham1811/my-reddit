import { RdCard } from '@/components'
import { ORDERING, SORT_METHOD } from '@/constants/enums'
import { LocalFireDepartmentIcon, SwapVertOutlinedIcon, TrendingUpOutlinedIcon, WbSunnyIcon } from '@/constants/icons'
import { TCardFeedSorterProps, TSorter } from '@/constants/types'
import { IconButton, ToggleButton, ToggleButtonGroup, Typography, styled } from '@mui/material'
import { v4 as rid } from 'uuid'

const data: TSorter[] = [
  {
    icon: <WbSunnyIcon />,
    methodValue: SORT_METHOD.new,
    description: 'New posts',
    label: 'New',
    disabled: false
  },
  {
    icon: <LocalFireDepartmentIcon />,
    methodValue: SORT_METHOD.hot,
    description: 'Most upvoted',
    label: 'Hot',
    disabled: false
  },
  {
    icon: <TrendingUpOutlinedIcon />,
    methodValue: SORT_METHOD.rising,
    description: 'Top trending',
    label: 'Rising',
    disabled: true
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

function CardFeedSorter({ sortOptions, setSortOptions }: TCardFeedSorterProps) {
  const onChange = (_: any, method: SORT_METHOD | null) => {
    method && setSortOptions({ ordering: ORDERING.desc, method })
  }

  return (
    <RdCard>
      <StyledToggleButtonGroup
        exclusive
        sx={{ display: 'flex', gap: 2 }}
        size="small"
        value={sortOptions.method}
        onChange={onChange}
        aria-label="new feeds sorter"
      >
        {data.length > 0 &&
          data.map((item) => (
            <ToggleButton
              disabled={item.disabled}
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
        <IconButton
          sx={{ ml: 'auto !important' }}
          onClick={(e) => setSortOptions({ ...sortOptions, ordering: sortOptions.ordering === ORDERING.asc ? ORDERING.desc : ORDERING.asc })}
        >
          <SwapVertOutlinedIcon sx={{ display: 'block' }} />
        </IconButton>
      </StyledToggleButtonGroup>
    </RdCard>
  )
}

export default CardFeedSorter
