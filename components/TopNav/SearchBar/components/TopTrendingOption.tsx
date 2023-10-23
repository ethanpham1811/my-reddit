import { OutboundOutlinedIcon } from '@/constants/icons'
import { TQueriedTrending } from '@/constants/types'
import { blurBottomStyle } from '@/mui/styles'
import { generateSeededHexColor, parseHtml } from '@/services'
import { Box, Divider, ListItem, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { HTMLAttributes, useEffect, useRef, useState } from 'react'

function TopTrendingOption({ option, props }: { option: TQueriedTrending; props: HTMLAttributes<HTMLLIElement> }) {
  const [bottomStyle, setBottomStyle] = useState({})
  const postFirsImgUrl = option?.images?.[0] ? `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET_URL}/${option?.images?.[0]}` : null

  const ref = useRef<HTMLDivElement>(null)

  /* if an item > 120px => blur out the overflow bottom part */
  useEffect(() => {
    if (!ref) return
    setBottomStyle(ref?.current?.offsetHeight && ref?.current?.offsetHeight >= 120 ? blurBottomStyle : {})
  }, [ref])

  return (
    <ListItem
      key={`search_result_item_${option.title}`}
      {...props}
      sx={{
        '&.MuiListItem-root': { py: 1.5, gap: 2, alignItems: 'flex-start' },
        '&:hover': { bgcolor: 'inputBgOutfocused.main' },
        '&.Mui-focused': { '.body::after': { background: 'linear-gradient(to top, #F6F7F8, transparent)' } }
      }}
    >
      <Box pt={0.6} sx={{ display: { xs: 'none', md: 'block' } }}>
        <OutboundOutlinedIcon sx={{ color: 'blue.main', fontSize: '1.5rem' }} />
      </Box>
      <Stack
        flex={1}
        ref={ref}
        sx={{
          position: 'relative',
          maxHeight: '120px',
          overflow: 'hidden'
        }}
      >
        <Typography color="black" fontSize="1.1rem">
          {option?.title}
        </Typography>
        <Typography
          className="body"
          variant="subtitle1"
          sx={{
            pb: 5,
            color: 'hintText.main',
            ...bottomStyle
          }}
        >
          {parseHtml(option?.body) || option?.link}
        </Typography>
        <Typography variant="body2" sx={{ color: 'blue.main', position: 'absolute', left: 0, bottom: 0, width: '100%' }}>
          r/{option?.subreddit?.name}
        </Typography>
      </Stack>
      <Box display="flex" alignSelf="center">
        {postFirsImgUrl && (
          <Box borderRadius="0.3rem" bgcolor={generateSeededHexColor(option?.title)}>
            <Image alt="post image" src={postFirsImgUrl} style={{ objectFit: 'cover' }} width={100} height={70} />
          </Box>
        )}
      </Box>
      <Divider />
    </ListItem>
  )
}

export default TopTrendingOption
