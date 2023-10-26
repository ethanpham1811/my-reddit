import { RdImageUploader } from '@/components'
import { LinkIcon } from '@/constants/icons'
import { Events, eventEmitter } from '@/services/eventEmitter'
import { Box, IconButton, Stack, Tooltip } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'

type TToolsProps<T extends FieldValues> = {
  control: Control<T>
  formOpened: boolean
  setIsLinkPost: Dispatch<SetStateAction<boolean>>
  isLinkPost: boolean
  isEditing: boolean
  isMobile: boolean
  userName: string | undefined
  imagesValue: FileList | undefined
}

function Tools<T extends FieldValues>({
  userName,
  imagesValue,
  isMobile,
  isEditing,
  control,
  formOpened,
  setIsLinkPost,
  isLinkPost
}: TToolsProps<T>) {
  function onCreateLinkPost() {
    eventEmitter.dispatch(Events.OPEN_CREATE_POST_FORM, true)
    setIsLinkPost(!isLinkPost)
  }

  return (
    <Stack spacing={1.5} alignItems="center" direction={{ xs: 'row', sm: 'column' }}>
      <Tooltip title={isEditing ? "You can't change mode" : 'Create Link Post'}>
        <Box>
          <IconButton disabled={isEditing} sx={{ bgcolor: isLinkPost ? 'primary.main' : 'unset', ml: '7px' }} onClick={onCreateLinkPost}>
            <LinkIcon sx={{ display: 'block' }} />
          </IconButton>
        </Box>
      </Tooltip>
      {formOpened && (
        <Tooltip title={isLinkPost ? 'Please switch to text mode' : 'Create Media Post'}>
          <Box>
            <IconButton
              disabled={!formOpened || isLinkPost}
              sx={{ bgcolor: imagesValue && imagesValue?.length !== 0 ? 'primary.main' : 'unset', ml: '7px' }}
            >
              <RdImageUploader<T> control={control} name={'images' as Path<T>} />
            </IconButton>
          </Box>
        </Tooltip>
      )}
    </Stack>
  )
}

export default Tools
