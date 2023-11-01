import { urlsToFile } from '@/src/utils'
import { useEffect, useState } from 'react'

/**
 * Convert image url (Supabase storage domain) to File
 */
function useConvertUrlToImages(urls: string[] | undefined): [FileList | null] {
  const [uploadedImgFiles, setUploadedImgFiles] = useState<FileList | null>(null)

  useEffect(() => {
    if (!urls || urls.length === 0) return

    async function convertUrls() {
      const fullUrls = urls?.map((url) => `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET_URL}/${url}`)
      const convertedFiles: FileList | null = await urlsToFile(fullUrls)
      setUploadedImgFiles(convertedFiles)
    }
    convertUrls()
  }, [urls])

  return [uploadedImgFiles]
}
export default useConvertUrlToImages
