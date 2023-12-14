import { BORDER_TYPES, DARK_MODE } from '@/src/constants/enums'
import { SxProps, Theme } from '@mui/material/styles'
import { Badge, ToggleButtonGroup, styled } from '..'

/* -------------------------------------------STYLES --------------------------------------------------- */

export const borderColorStyle: SxProps<Theme> = {
  fieldset: {
    borderColor: (theme): string => theme.palette.primary.dark + '!important'
  },
  '.Mui-focused, &:hover': {
    fieldset: {
      borderWidth: '1px !important',
      borderColor: (theme): string => theme.palette.blue.main + '!important'
    }
  }
}
/* ---------------------------------------STYLED COMPONENTS --------------------------------------------- */
export const OnlineDotStyle = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    width: 10,
    height: 10,
    minWidth: 0,
    borderRadius: '50%',
    backgroundColor: theme.palette.green.main,
    color: theme.palette.green.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
}))

export const postHoverStyle = (postId?: string | null | undefined) => ({
  '&:hover': !postId ? { cursor: 'pointer', border: '1px solid', borderColor: 'orange.main' } : {}
})
export const blurBottomStyle = (height: string, mode: DARK_MODE, isTopNav?: boolean) => {
  const bgColor = mode === DARK_MODE.light ? '#fff' : isTopNav ? '#000' : '#121212'
  return {
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      height,
      width: '100%',
      background: `linear-gradient(0deg, ${bgColor} 0%, 0%, ${bgColor} 30%, transparent 100%)`
    }
  }
}

export const RdButtonGroup = styled(ToggleButtonGroup)(() => ({
  display: 'flex',
  gap: '1rem',
  '& .MuiToggleButtonGroup-grouped': {
    margin: '0.25rem',
    border: 0,
    '&.Mui-disabled': {
      border: 0
    },
    '&:not(:first-of-type)': {
      borderRadius: BORDER_TYPES.Circular
    },
    '&:first-of-type': {
      borderRadius: BORDER_TYPES.Circular
    }
  }
}))
