import { TCardCreatePostForm, TEditModePayload } from '@/src/constants/types'
import { useConvertUrlToImages } from '@/src/hooks'
import { useEffect } from 'react'
import { Path, PathValue, UseFormSetValue } from 'react-hook-form'

function useEditPostDataMap(editModePayload: TEditModePayload | undefined, setFormValue: UseFormSetValue<TCardCreatePostForm>): void {
  const [uploadedImgFiles] = useConvertUrlToImages(editModePayload?.images)

  /* mapping post data and populate fields value in edit mode  */
  useEffect(() => {
    if (editModePayload) {
      Object.keys(editModePayload).forEach((key) => {
        const value = key !== 'images' ? editModePayload[key as keyof TEditModePayload] : uploadedImgFiles
        setFormValue(key as Path<TCardCreatePostForm>, value as PathValue<TCardCreatePostForm, Path<TCardCreatePostForm>>)
      })
    }
  }, [setFormValue, editModePayload, uploadedImgFiles])
}

export default useEditPostDataMap
