import { TSubredditDetail, TSubredditEditForm } from '@/src/constants/types'
import { useSubUpdateForm, useSubredditUpdate } from '@/src/hooks'
import { Typography } from '@/src/mui'
import { textValidation } from '@/src/services/formValidations'
import { useEffect } from 'react'
import { RdInlineInput } from '../..'

type TSubredditHeadlineProps = {
  subreddit: TSubredditDetail | null
  isMySub: boolean
}

function SubredditHeadLine({ subreddit, isMySub }: TSubredditHeadlineProps) {
  const { updateSub } = useSubredditUpdate()
  const { control, onChangeSubInfo, setFormValue } = useSubUpdateForm(subreddit, updateSub)
  const { headline } = subreddit || {}

  // populate current headline to the form
  useEffect(() => {
    if (subreddit) {
      setFormValue('headline', headline as string)
    }
  }, [subreddit, setFormValue, headline])
  return (
    <Typography fontWeight={700} variant="h4" width="100%" fontSize="1.8rem" textAlign={{ xs: 'center', md: 'left' }}>
      {isMySub ? (
        <RdInlineInput<TSubredditEditForm>
          registerOptions={{ validate: (val) => textValidation(val, 60) }}
          onFieldSubmit={onChangeSubInfo}
          control={control}
          name="headline"
          headline
          fontSize="1.8rem"
          endIcon
        />
      ) : (
        headline
      )}
    </Typography>
  )
}

export default SubredditHeadLine
