import { RdImageUploader } from '@/components'
import { LinkIcon } from '@/constants/icons'
import { Events, eventEmitter } from '@/services/eventEmitter'
import { Box, IconButton, Stack, Tooltip } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'

type TToolsProps<T extends FieldValues> = {
  control: Control<T>
  isFormClosed: boolean
  setIsLinkPost: Dispatch<SetStateAction<boolean>>
  isLinkPost: boolean
  isEditing: boolean
}

function Tools<T extends FieldValues>({ isEditing, control, isFormClosed, setIsLinkPost, isLinkPost }: TToolsProps<T>) {
  function onCreateLinkPost() {
    eventEmitter.dispatch(Events.OPEN_CREATE_POST_FORM, true)
    setIsLinkPost(!isLinkPost)
  }

  return (
    <Stack spacing={1.5} alignItems="center">
      <Tooltip title={isEditing ? "You can't change mode" : 'Create Link Post'}>
        <Box>
          <IconButton disabled={isEditing} sx={{ bgcolor: isLinkPost ? 'primary.main' : 'unset', mr: '-0.7rem' }} onClick={onCreateLinkPost}>
            <LinkIcon sx={{ display: 'block' }} />
          </IconButton>
        </Box>
      </Tooltip>
      {!isFormClosed && (
        <Tooltip title={isLinkPost ? 'Please switch to text mode' : 'Create Media Post'}>
          <Box>
            <IconButton disabled={isFormClosed || isLinkPost} sx={{ mr: '-0.7rem' }}>
              <RdImageUploader<T> control={control} name={'images' as Path<T>} />
            </IconButton>
          </Box>
        </Tooltip>
      )}
    </Stack>
  )
}

export default Tools
