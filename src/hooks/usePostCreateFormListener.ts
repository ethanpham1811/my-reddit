import { TCardCreatePostForm } from '@/src/constants/types'
import { Events, eventEmitter } from '@/src/services/eventEmitter'
import { useRouter } from 'next/router'
import { MutableRefObject, useEffect } from 'react'
import { Path, PathValue, UseFormGetValues, UseFormSetValue } from 'react-hook-form'

/**
 * Event subscriber for opening the form from somewhere else
 */
function usePostCreateFormListener(
  subId: number | undefined,
  ref: MutableRefObject<HTMLInputElement | null>,
  getFormValues: UseFormGetValues<TCardCreatePostForm>,
  setFormValue: UseFormSetValue<TCardCreatePostForm>
): void {
  const {
    query: { postid }
  } = useRouter()

  useEffect(() => {
    let sto: NodeJS.Timeout | null = null

    eventEmitter.subscribe(Events.OPEN_CREATE_POST_FORM, (_) => {
      ref?.current?.focus()
      !getFormValues('title' as Path<TCardCreatePostForm>) &&
        setFormValue('title' as Path<TCardCreatePostForm>, 'Your post title' as PathValue<TCardCreatePostForm, Path<TCardCreatePostForm>>)

      sto = setTimeout(() => {
        ref?.current?.select()
      }, 100)
    })
    return () => {
      sto && clearTimeout(sto)
      eventEmitter.unsubscribe(Events.OPEN_CREATE_POST_FORM)
    }
  }, [setFormValue, getFormValues, postid, subId, ref])
}

export default usePostCreateFormListener
