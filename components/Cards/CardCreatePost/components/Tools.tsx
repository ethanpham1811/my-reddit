import { RdImageUploader } from '@/components'
import { LinkIcon } from '@/constants/icons'
import { Box, IconButton, Stack, Tooltip } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'

type TToolsProps<T extends FieldValues> = {
  control: Control<T>
  titleValue: string
  setShowLinkInput: Dispatch<SetStateAction<boolean>>
  showLinkInput: boolean
}

function Tools<T extends FieldValues>({ control, titleValue, setShowLinkInput, showLinkInput }: TToolsProps<T>) {
  return (
    <Stack direction="row">
      <Tooltip title="Create Media Post">
        <Box>
          <IconButton disabled={!titleValue}>
            <RdImageUploader<T> control={control} name={'images' as Path<T>} />
          </IconButton>
        </Box>
      </Tooltip>
      <Tooltip title="Create Link Post">
        <Box>
          <IconButton
            disabled={!titleValue}
            sx={{ bgcolor: showLinkInput ? 'primary.main' : 'unset' }}
            onClick={() => setShowLinkInput(!showLinkInput)}
          >
            <LinkIcon sx={{ display: 'block' }} />
          </IconButton>
        </Box>
      </Tooltip>
    </Stack>
  )
}

export default Tools
