import { SEARCH_TABS } from '@/constants/enums'
import { TSearchTabBtn } from '@/constants/types'
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { v4 as rid } from 'uuid'

const tabList: TSearchTabBtn[] = [
  {
    value: SEARCH_TABS.Post,
    title: 'Posts'
  },
  {
    value: SEARCH_TABS.Communities,
    title: 'Communities'
  },
  {
    value: SEARCH_TABS.People,
    title: 'People'
  }
]

function SearchFeedsTabBar({ type = SEARCH_TABS.Post, top }: { type: SEARCH_TABS | undefined; top: string }) {
  const {
    replace,
    pathname,
    query: { q }
  } = useRouter()

  function onChange(value: SEARCH_TABS) {
    replace({ pathname: pathname, query: { q, type: value } })
  }
  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={type}
      onChange={(e, value: SEARCH_TABS) => onChange(value)}
      aria-label="new feeds sorter"
      sx={{
        pt: top,
        display: 'flex',
        gap: 2,
        '& .MuiToggleButtonGroup-grouped': {
          m: 0.5,
          border: 0,
          '&.Mui-disabled': {
            border: 0
          }
        }
      }}
    >
      {tabList.length > 0 &&
        tabList.map(({ value, title }) => (
          <ToggleButton
            key={`sorter_${rid()}`}
            value={value}
            aria-label={`${title} search tab`}
            sx={{
              '&.Mui-selected': { bgcolor: 'white.main', opacity: 0.8 },
              '.MuiTypography-root': { color: 'black' },
              borderRadius: '999px !important',
              gap: 0.5,
              py: 1.5,
              px: 2.5
            }}
          >
            <Typography fontWeight={700} textTransform="capitalize">
              {title}
            </Typography>
          </ToggleButton>
        ))}
    </ToggleButtonGroup>
  )
}

export default SearchFeedsTabBar
