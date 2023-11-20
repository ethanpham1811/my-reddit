import { BUCKET, BUCKET_SUBFOLDER } from '@/src/constants/enums'
import { TStorageError } from '@/src/constants/types'
import { useSupabaseClient } from '@supabase/auth-helpers-react/dist'
import { v4 as rid } from 'uuid'

/**
 * Upload to Supabase bucket with registered policy
 * only authenticated user be able to upload images
 */
function useSupabaseUpload() {
  const supabase = useSupabaseClient()

  const uploadFiles = async (files: FileList): Promise<{ uploadedFilePaths: string[] | null; error?: TStorageError }> => {
    const uploadedFilePaths: string[] = []
    for (const file of files) {
      const { data, error } = await supabase!.storage.from(BUCKET).upload(`${BUCKET_SUBFOLDER}/${rid()}.png`, file, {
        cacheControl: '3600',
        upsert: false
      })
      if (error) return { uploadedFilePaths: null, error: error as TStorageError }

      data && uploadedFilePaths.push(`${BUCKET}/` + data.path)
    }
    return { uploadedFilePaths: uploadedFilePaths.length === 0 ? null : uploadedFilePaths }
  }

  return uploadFiles
}

export default useSupabaseUpload
