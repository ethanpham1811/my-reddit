import { INIT_SCROLL_TOP_THRESHOLD, SHOW_SCROLL_TOP_THRESHOLD } from '@/src/constants/enums'
import { ArrowCircleRightSharpIcon, ArrowDownwardTwoToneIcon, ArrowUpwardTwoToneIcon } from '@/src/constants/icons'
import { Box, Button, IconButton, Typography, useMediaQuery } from '@/src/mui'
import { useTheme } from '@mui/material/styles'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import { MutableRefObject, useEffect, useState } from 'react'

type TRdScrollBtnProps = {
  wrapperRef: MutableRefObject<HTMLDivElement | null>
  topRef: MutableRefObject<HTMLDivElement | null>
  bottomRef: MutableRefObject<HTMLDivElement | null>
}

/**
 * Show/hide at a specific top offset
 * Switch top/bottom icon on scrolling across half wrapper length
 * Has mobile-pc styling
 */
function RdScrollBtn({ wrapperRef, topRef, bottomRef }: TRdScrollBtnProps) {
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('md'))
  const [scrollThreshold, setScrollThreshold] = useState<number>(SHOW_SCROLL_TOP_THRESHOLD)

  // set threshold point for scroll top/bottom button
  useEffect(() => {
    const wrapperHeight = wrapperRef?.current?.offsetHeight
    wrapperHeight && setScrollThreshold(Math.floor(wrapperHeight / 2))
  }, [wrapperRef?.current?.offsetHeight, wrapperRef])

  /* detect scroll position at 300px to show/hide this button */
  const is200pxPassed = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold: INIT_SCROLL_TOP_THRESHOLD
  })

  /* detect scroll position to switch scroll-to-button state */
  const isHalfWayScrolled = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold: scrollThreshold
  })

  function scrollTo() {
    isHalfWayScrolled ? topRef?.current?.scrollIntoView() : bottomRef?.current?.scrollIntoView()
  }

  return (
    <Box
      sx={{
        opacity: is200pxPassed ? 1 : 0,
        transition: '0.3s ease all',
        pointerEvents: is200pxPassed ? 'auto' : 'none'
      }}
    >
      {isMobile ? (
        <Button
          sx={{
            boxShadow: (theme) => `0 0 5px ${theme.palette.inputBorder.main}`,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            left: { xs: '80dvw', sm: '90dvw' },
            transform: 'translateX(-50%)',
            position: 'fixed',
            bottom: 0,
            bgcolor: 'black.main',
            zIndex: 999,
            px: 2,
            py: 0.5,
            textTransform: 'none',
            '&:hover': {
              bgcolor: 'black.main'
            }
          }}
          onClick={scrollTo}
        >
          <Box>
            <Typography color="white.main" fontWeight={500} variant="body2" display="flex" alignItems="center" gap={0.5}>
              Scroll{' '}
              {!isHalfWayScrolled ? (
                <ArrowDownwardTwoToneIcon sx={{ fontSize: '1rem', color: 'blue.main' }} />
              ) : (
                <ArrowUpwardTwoToneIcon sx={{ fontSize: '1rem', color: 'blue.main' }} />
              )}
            </Typography>
          </Box>
        </Button>
      ) : (
        <IconButton sx={{ mx: 'auto', display: 'flex', mt: 0.5 }} onClick={scrollTo} aria-label="top/bottom scroller">
          <ArrowCircleRightSharpIcon sx={{ fontSize: '2rem', color: 'blue.main', transform: `rotate(${isHalfWayScrolled ? '-90deg' : '90deg'})` }} />
        </IconButton>
      )}
    </Box>
  )
}

export default RdScrollBtn
