import { RemoveRedEyeIcon, VisibilityOffIcon } from '@/src/constants/icons'
import { Box } from '@/src/mui'
import { Dispatch, SetStateAction } from 'react'

type TPasswordEyeProps = {
  showPassword: boolean
  setShowPassword: Dispatch<SetStateAction<boolean>>
}
function PasswordEye({ showPassword, setShowPassword }: TPasswordEyeProps) {
  return (
    <Box
      sx={{
        svg: {
          fontSize: '1rem',
          ml: 1.5,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          '&:focus': { outline: 'none', color: 'orange.main' }
        }
      }}
    >
      {showPassword ? (
        <RemoveRedEyeIcon
          tabIndex={0}
          onClick={() => setShowPassword(!showPassword)}
          onKeyDown={(e) => e.key === 'Enter' && setShowPassword(!showPassword)}
        />
      ) : (
        <VisibilityOffIcon
          tabIndex={0}
          onClick={() => setShowPassword(!showPassword)}
          onKeyDown={(e) => e.key === 'Enter' && setShowPassword(!showPassword)}
        />
      )}
    </Box>
  )
}

export default PasswordEye
