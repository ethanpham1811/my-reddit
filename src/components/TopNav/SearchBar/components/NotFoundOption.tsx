import { TQueryNotFound } from '@/src/constants/types'
import { ListItem, Typography } from '@/src/mui'
import { HTMLAttributes } from 'react'

function NotFoundOption({ option, props }: { option: TQueryNotFound; props: HTMLAttributes<HTMLLIElement> }) {
  return (
    <ListItem
      key={`search_result_item_${option.text}`}
      onClick={(e) => e.stopPropagation()}
      {...props}
      sx={{
        '&.MuiListItem-root': { cursor: 'auto', gap: 2, alignItems: 'flex-start', '&.Mui-focused': { backgroundColor: 'inherit' } },
        '&:hover': { bgcolor: 'primary.light' }
      }}
    >
      <Typography>{option.text}</Typography>
    </ListItem>
  )
}

export default NotFoundOption
