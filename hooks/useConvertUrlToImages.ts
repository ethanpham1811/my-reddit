import { urlsToFile } from '@/services'
import { useEffect, useState } from 'react'

function useConvertUrlToImages(urls: string[] | undefined): [FileList | null] {
  const [uploadedImgFiles, setUploadedImgFiles] = useState<FileList | null>(null)

  useEffect(() => {
    if (!urls || urls.length === 0) return
    async function convertUrls() {
      urls = urls?.map((url) => `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET_URL}/${url}`)
      const convertedFiles: FileList | null = await urlsToFile(urls)
      setUploadedImgFiles(convertedFiles)
    }
    convertUrls()
  }, [urls])

  return [uploadedImgFiles]
}
export default useConvertUrlToImages
