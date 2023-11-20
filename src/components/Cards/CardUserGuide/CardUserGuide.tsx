import { RdCard } from '@/src/components'
import { CloseIcon } from '@/src/constants/icons'
import { IconButton, List, ListItem, Stack, Typography } from '@/src/mui'
import { Dispatch, SetStateAction, createElement } from 'react'
import { guideListData } from './data'

/**
 * Quick user guide with steps
 */
function CardUserGuide({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  return (
    <RdCard sx={{ p: 2, display: 'flex', border: 'none' }}>
      <Stack spacing={2} flex={1} width={{ xs: '90vw', sm: '400px' }}>
        {/* header */}
        <Stack spacing={2} py={1} sx={{ mx: '-1rem !important', mt: '-1rem !important' }} bgcolor="blue.main">
          <Typography
            display="flex"
            color="white.main"
            gap={1}
            alignItems="center"
            justifyContent="center"
            variant="subtitle2"
            fontSize="1rem"
            textAlign="center"
          >
            Quick user guide
          </Typography>
        </Stack>
        {/* <Divider sx={{ my: 1 }} /> */}

        {/* step list */}
        <Stack flex={1} spacing={2} sx={{ maxHeight: '400px', overflowY: 'auto' }}>
          <List>
            {guideListData.map(({ text, icon, color }, i) => (
              <ListItem key={`function_list_${i}`} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                {createElement(icon, { sx: { color } })}
                <Typography variant="body1" textAlign="center">
                  {text}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Stack>

        {/* close btn */}
        <Stack direction="row" spacing={2} justifyContent="center">
          <IconButton
            sx={{ backgroundColor: 'inputBorder.main', '&:hover': { '.MuiSvgIcon-root': { color: 'black.main' } } }}
            onClick={() => setOpen(false)}
          >
            <CloseIcon sx={{ color: 'white.main', fontSize: '1.5rem' }} />
          </IconButton>
        </Stack>
      </Stack>
    </RdCard>
  )
}

export default CardUserGuide
