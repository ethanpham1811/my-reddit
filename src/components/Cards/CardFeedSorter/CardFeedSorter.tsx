import { RdCard } from '@/src/components'
import { ORDERING, SORT_METHOD } from '@/src/constants/enums'
import { SwapVertOutlinedIcon } from '@/src/constants/icons'
import { TSortOptions } from '@/src/constants/types'
import { IconButton } from '@/src/mui'
import { RdButtonGroup } from '@/src/mui/styles'
import { Dispatch, MouseEvent, SetStateAction } from 'react'
import { v4 as rid } from 'uuid'
import SortButton from './components/SortButton'
import { data } from './data'

export type TCardFeedSorterProps = {
  disabled?: boolean
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
      <RdButtonGroup exclusive size="small" value={sortOptions.method} onChange={onChange} aria-label="new feeds sorter">
        {data.length > 0 &&
          data.map(({ optionDisabled, methodValue, icon, label }) => (
            <SortButton key={`sorter_${rid()}`} disabled={disabled || optionDisabled} value={methodValue} label={label} icon={icon} />
          ))}
      </RdButtonGroup>

      {/* Asc/Desc switcher */}
      <IconButton
        sx={{ ml: 'auto !important', width: '35px', height: '35px' }}
        onClick={(e) => setSortOptions({ ...sortOptions, ordering: sortOptions.ordering === ORDERING.Desc ? ORDERING.Asc : ORDERING.Desc })}
        aria-label="Asc/Desc switcher"
      >
        <SwapVertOutlinedIcon sx={{ display: 'block' }} />
      </IconButton>
    </RdCard>
  )
}

export default CardFeedSorter
