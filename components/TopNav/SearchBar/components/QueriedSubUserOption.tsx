import { TQueriedSub, TQueriedUser } from '@/constants/types'
import { Avatar, Box, ListItem, Stack, Typography } from '@/mui'
import { isQueriedSub } from '@/src/typeCheck'
import { formatNumber, generateSeededHexColor, generateUserImage } from '@/src/utils'
import { useRouter } from 'next/router'
import { HTMLAttributes } from 'react'

type TQueriedSubUserOptionProps = {
  option: TQueriedSub | TQueriedUser
  props: HTMLAttributes<HTMLLIElement>
  url: string
}

function QueriedSubUserOption({ option, props, url }: TQueriedSubUserOptionProps) {
  const { push: navigate } = useRouter()
  const isSub = isQueriedSub(option)

  return (
    <ListItem
      onClick={(e) => {
        e.preventDefault()
        navigate(url)
      }}
      key={`search_result_item_${isSub ? option.name : option.username}`}
      {...props}
      sx={{
        '&.MuiListItem-root': { gap: 2, alignItems: 'flex-start' },
        '&.Mui-focused.MuiAutocomplete-option, &.Mui-focusVisible.MuiAutocomplete-option': {
          bgcolor: (theme) => `${theme.palette.inputBgOutfocused.main} !important`
        }
      }}
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
