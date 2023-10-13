import { Badge, SxProps, Theme, styled } from '@mui/material'

/* -------------------------------------------STYLES --------------------------------------------------- */

export const borderColorStyle: SxProps<Theme> = {
  fieldset: {
    borderColor: (theme): string => theme.palette.inputBorder.main + '!important'
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
export const blurBottomStyle = {
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '100px',
    width: '100%',
    background: 'linear-gradient(to top, #fff, transparent)'
  }
}
