import { RdCard } from '@/src/components'
import { BORDER_TYPES, ORDERING, SORT_METHOD } from '@/src/constants/enums'
import { SwapVertOutlinedIcon } from '@/src/constants/icons'
import { TSortOptions } from '@/src/constants/types'
import { IconButton, ToggleButton, ToggleButtonGroup, Typography } from '@/src/mui'
import { Dispatch, MouseEvent, SetStateAction, createElement } from 'react'
import { v4 as rid } from 'uuid'
import { data } from './data'

export type TCardFeedSorterProps = {
  disabled: boolean
  sortOptions: TSortOptions
  setSortOptions: Dispatch<SetStateAction<TSortOptions>>
}
function CardFeedSorter({ sortOptions, setSortOptions, disabled }: TCardFeedSorterProps) {
  const onChange = (_: MouseEvent<HTMLElement, globalThis.MouseEvent>, method: SORT_METHOD | null) => {
    method && setSortOptions({ ordering: ORDERING.Desc, method })
  }

  return (
    <RdCard sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* Sort by New/Hot/Trending buttons */}
      <ToggleButtonGroup
        exclusive
        size="small"
        value={sortOptions.method}
        onChange={onChange}
        aria-label="new feeds sorter"
        sx={{
          display: 'flex',
          gap: 2,
          '& .MuiToggleButtonGroup-grouped': {
            margin: 0.5,
            border: 0,
            '&.Mui-disabled': {
              border: 0
            },
            '&:not(:first-of-type)': {
              borderRadius: BORDER_TYPES.Circular
            },
            '&:first-of-type': {
              borderRadius: BORDER_TYPES.Circular
            }
          }
        }}
      >
        {data.length > 0 &&
          data.map(({ optionDisabled, methodValue, description, icon, label }) => (
            <ToggleButton
              disabled={disabled || optionDisabled}
              key={`sorter_${rid()}`}
              value={methodValue}
              aria-label={description}
              sx={{ borderRadius: '9999px !important', paddingRight: 1.5, gap: 0.5 }}
            >
              {createElement(icon)}
              <Typography fontWeight={700} textTransform="capitalize">
                {label}
              </Typography>
            </ToggleButton>
          ))}
      </ToggleButtonGroup>

      {/* Asc/Desc switcher */}
      <IconButton
        sx={{ ml: 'auto !important', width: '35px', height: '35px' }}
        onClick={(e) => setSortOptions({ ...sortOptions, ordering: sortOptions.ordering === ORDERING.Desc ? ORDERING.Asc : ORDERING.Desc })}
      >
        <SwapVertOutlinedIcon sx={{ display: 'block' }} />
      </IconButton>
    </RdCard>
  )
}

export default CardFeedSorter
