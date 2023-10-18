import { RdImageUploader } from '@/components'
import { LinkIcon } from '@/constants/icons'
import { Box, IconButton, Stack, Tooltip } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'

type TToolsProps<T extends FieldValues> = {
  control: Control<T>
  isFormClosed: boolean
  setIsLinkPost: Dispatch<SetStateAction<boolean>>
  isLinkPost: boolean
}

function Tools<T extends FieldValues>({ control, isFormClosed, setIsLinkPost, isLinkPost }: TToolsProps<T>) {
  return (
    <Stack spacing={1.5} alignItems="center">
      <Tooltip title="Create Link Post">
        <Box>
          <IconButton sx={{ bgcolor: isLinkPost ? 'primary.main' : 'unset', mr: '-0.7rem' }} onClick={() => setIsLinkPost(!isLinkPost)}>
            <LinkIcon sx={{ display: 'block' }} />
          </IconButton>
        </Box>
      </Tooltip>
      {!isFormClosed && (
        <Tooltip title="Create Media Post">
          <Box>
            <IconButton disabled={isFormClosed} sx={{ mr: '-0.7rem' }}>
              <RdImageUploader<T> control={control} name={'images' as Path<T>} />
            </IconButton>
          </Box>
        </Tooltip>
      )}
    </Stack>
  )
}

export default Tools
