import { TQueryNotFound } from '@/constants/types'
import { ListItem, Typography } from '@mui/material'
import { HTMLAttributes } from 'react'

function NotFoundOption({ option, props }: { option: TQueryNotFound; props: HTMLAttributes<HTMLLIElement> }) {
  return (
    <ListItem
      key={`search_result_item_${option.text}`}
      onClick={(e) => e.stopPropagation()}
      {...props}
      sx={{
        '&.MuiListItem-root': { cursor: 'auto', gap: 2, alignItems: 'flex-start', '&.Mui-focused': { backgroundColor: 'inherit' } },
        '&:hover': { bgcolor: 'inputBgOutfocused.main' }
      }}
    >
      <Typography>{option.text}</Typography>
    </ListItem>
  )
}

export default NotFoundOption
