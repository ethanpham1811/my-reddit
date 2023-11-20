import { CheckCircleIcon } from '@/src/constants/icons'
import { Jelly } from '@uiball/loaders'
import { ErrorIcon } from 'react-hot-toast'

export const toastOptions = {
  duration: 3000,
  style: {
    background: 'white.main',
    color: '#1A1A1B',
    fontSize: '0.8rem'
  },
  success: {
    icon: <CheckCircleIcon style={{ color: '#337d19' }} />
  },
  error: {
    icon: <ErrorIcon style={{ color: '#ff4500' }} />
  },
  loading: {
    icon: <Jelly size={20} speed={0.7} color="#ff4500" />
  }
}
