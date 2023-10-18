import { urlValidation } from '@/services'
import { Stack } from '@mui/material'
import { Control, FieldValues, Path } from 'react-hook-form'
import { RdButton, RdImageList, RdInput, RdSubredditSelect, RdTextEditor } from '../../..'

type TMainFormProps<T extends FieldValues> = {
  control: Control<T>
  isLinkPost: boolean
  imagesValue: FileList
  subId: number | undefined
}

function MainForm<T extends FieldValues>({ isLinkPost, control, imagesValue, subId }: TMainFormProps<T>) {
  return (
    <Stack spacing={1}>
      {/* link or textEditor */}
      {isLinkPost ? (
        <Stack spacing={1.5}>
          <RdInput<T>
            registerOptions={{ validate: (val) => urlValidation(val) }}
            bgcolor="white"
            flex={1}
            control={control}
            name={'link' as Path<T>}
            placeholder="Link URL"
          />
          <RdInput<T>
            registerOptions={{ required: 'Description is required' }}
            bgcolor="white"
            flex={1}
            control={control}
            name={'linkDescription' as Path<T>}
            placeholder="Short description"
          />
        </Stack>
      ) : (
        <RdTextEditor<T>
          registerOptions={{ required: 'Body is required' }}
          control={control}
          name={'body' as Path<T>}
          placeholder="Start your essay.."
        />
      )}

      {/* uploaded images preview */}
      {imagesValue && imagesValue.length > 0 && <RdImageList images={imagesValue} cols={5} />}

      {/* Subreddit select & Submit button */}
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" width="100%">
        {subId == null && <RdSubredditSelect registerOptions={{ required: true }} control={control} name={'subreddit_id' as Path<T>} width="180px" />}
        <RdButton type="submit" text={'Post'} filled color="blue" invertColor width="30%" />
      </Stack>
    </Stack>
    // {/* <ErrorMessage errors={errors} render={({ message }) => <p>{message}</p>} /> */}
  )
}

export default MainForm
