import { SEARCH_TABS } from '@/src/constants/enums'
import { ToggleButton, ToggleButtonGroup, Typography } from '@/src/mui'
import { useRouter } from 'next/router'
import { v4 as rid } from 'uuid'
import { tabList } from '../data'

type TSearchFeedsTabBarProps = {
  type: SEARCH_TABS | undefined
  top: string
}

/**
 * Search Tab bar with 3 tabs:
 * - Post
 * - Community
 * - People
 */
function SearchFeedsTabBar({ type = SEARCH_TABS.Post, top }: TSearchFeedsTabBarProps) {
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
            aria-label={`${title}`}
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
