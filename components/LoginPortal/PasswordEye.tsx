import { RemoveRedEyeIcon, VisibilityOffIcon } from '@/constants/icons'
import { Dispatch, SetStateAction } from 'react'

type TPasswordEyeProps = {
  showPassword: boolean
  setShowPassword: Dispatch<SetStateAction<boolean>>
}
function PasswordEye({ showPassword, setShowPassword }: TPasswordEyeProps) {
  return (
    <>
      {showPassword ? (
        <RemoveRedEyeIcon onClick={() => setShowPassword(!showPassword)} sx={{ fontSize: '1rem', ml: 1.5, cursor: 'pointer' }} />
      ) : (
        <VisibilityOffIcon onClick={() => setShowPassword(!showPassword)} sx={{ fontSize: '1rem', ml: 1.5, cursor: 'pointer' }} />
      )}
    </>
  )
}

export default PasswordEye
