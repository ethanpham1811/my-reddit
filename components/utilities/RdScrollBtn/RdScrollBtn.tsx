import { INIT_SCROLL_TOP_THRESHOLD, SHOW_SCROLL_TOP_THRESHOLD } from '@/constants/enums'
import { ArrowCircleRightSharpIcon, ArrowDownwardTwoToneIcon, ArrowUpwardTwoToneIcon } from '@/constants/icons'
import { Box, IconButton, Link, Typography, useMediaQuery } from '@/mui'
import { useTheme } from '@mui/material/styles'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import { MutableRefObject, useEffect, useState } from 'react'

/**
 * Show/hide at a specific top offset
 * Switch top/bottom icon on scrolling across half wrapper length
 * Has mobile-pc styling
 */
function RdScrollBtn({ wrapperRef }: { wrapperRef: MutableRefObject<HTMLDivElement | null> }) {
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

  return (
    <Box
      sx={{
        opacity: is200pxPassed ? 1 : 0,
        transition: '0.3s ease all',
        position: { xs: 'fixed', md: 'static' },
        bottom: { xs: 0, md: 'unset' },
        left: { xs: 10, md: 'unset' },
        zIndex: 99999,
        pointerEvents: is200pxPassed ? 'auto' : 'none'
      }}
    >
      <Link href={isHalfWayScrolled ? '#top-nav' : '#bottom-anchor'}>
        {isMobile ? (
          <Box
            position="fixed"
            bottom={0}
            bgcolor="black.main"
            px={2}
            py={0.5}
            sx={{
              boxShadow: (theme) => `0 0 5px ${theme.palette.inputBorder.main}`,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          >
            <Typography color="white.main" fontWeight={500} variant="body2" display="flex" alignItems="center" gap={0.5}>
              Scroll{' '}
              {!isHalfWayScrolled ? (
                <ArrowDownwardTwoToneIcon sx={{ fontSize: '1rem', color: 'blue.main' }} />
              ) : (
                <ArrowUpwardTwoToneIcon sx={{ fontSize: '1rem', color: 'blue.main' }} />
              )}
            </Typography>
          </Box>
        ) : (
          <IconButton sx={{ mx: 'auto', display: 'flex', mt: 0.5 }}>
            <ArrowCircleRightSharpIcon
              sx={{ fontSize: '2rem', color: 'blue.main', transform: `rotate(${isHalfWayScrolled ? '-90deg' : '90deg'})` }}
            />
          </IconButton>
        )}
      </Link>
    </Box>
  )
}

export default RdScrollBtn
