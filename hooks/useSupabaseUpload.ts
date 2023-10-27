import { BUCKET, BUCKET_SUBFOLDER } from '@/constants/enums'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import toast from 'react-hot-toast'
import { v4 as rid } from 'uuid'

function useSupabaseUpload() {
  const supabase = useSupabaseClient()

  const uploadFiles = async (files: FileList): Promise<string[] | null> => {
    const filePaths: string[] = []
    for (const file of files) {
      const { data, error } = await supabase!.storage.from(BUCKET).upload(`${BUCKET_SUBFOLDER}/${rid()}.png`, file, {
        cacheControl: '3600',
        upsert: false
      })
      if (error) {
        toast.error(error.message)
        return null
      }
      data && filePaths.push(`${BUCKET}/` + data.path)
    }
    return filePaths
  }

  return uploadFiles
}

export default useSupabaseUpload
