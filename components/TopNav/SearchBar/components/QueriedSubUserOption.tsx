import { TQueriedSub, TQueriedUser } from '@/constants/types'
import { formatNumber, generateSeededHexColor, generateUserImage, isQueriedSub } from '@/services'
import { Avatar, Box, ListItem, Stack, Typography } from '@mui/material'
import { HTMLAttributes } from 'react'

function QueriedSubUserOption({ option, props }: { option: TQueriedSub | TQueriedUser; props: HTMLAttributes<HTMLLIElement> }) {
  const isSub = isQueriedSub(option)

  return (
    <ListItem
      key={`search_result_item_${isSub ? option.name : option.username}`}
      {...props}
      sx={{ '&.MuiListItem-root': { gap: 2, alignItems: 'flex-start' }, '&:hover': { bgcolor: 'inputBgOutfocused.main' } }}
    >
      <Box pt={0.6}>
        <Avatar
          sx={{
            width: 20,
            height: 20,
            backgroundColor: generateSeededHexColor(isSub ? option.name : option.username)
          }}
          alt={isSub ? option.name : option.username}
          src={generateUserImage(isSub ? option.name : option.username)}
        />
      </Box>
      <Stack>
        <Typography>r/{isSub ? option.name : option.username}</Typography>
        <Typography variant="caption" sx={{ color: 'hintText.main' }}>
          {isSub && `Community • ${formatNumber(option.member)} members`}
          {!isSub && `User • ${formatNumber(option.followers)} followers`}
        </Typography>
      </Stack>
    </ListItem>
  )
}

export default QueriedSubUserOption