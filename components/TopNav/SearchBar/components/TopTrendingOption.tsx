import { MAX_TOP_TRENDING_HEIGHT } from '@/constants/enums'
import { OutboundOutlinedIcon } from '@/constants/icons'
import { TQueriedTrending } from '@/constants/types'
import { blurBottomStyle } from '@/mui/styles'
import { parseHtml } from '@/src/utils'
import { Box, Divider, ListItem, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { HTMLAttributes, useEffect, useRef, useState } from 'react'

function TopTrendingOption({ option, props }: { option: TQueriedTrending; props: HTMLAttributes<HTMLLIElement> }) {
  const [bottomStyle, setBottomStyle] = useState({})
  const ref = useRef<HTMLDivElement>(null)
  const postFirsImgUrl: string | null = option?.images?.[0] ? `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET_URL}/${option?.images?.[0]}` : null

  /* if an item > 120px => blur out the overflow bottom part */
  useEffect(() => {
    if (!ref) return
    const exceededHeight: boolean = ref?.current?.offsetHeight ? ref?.current?.offsetHeight >= MAX_TOP_TRENDING_HEIGHT : false
    setBottomStyle(exceededHeight ? blurBottomStyle('50px') : {})
  }, [])

  return (
    <>
      <ListItem
        key={`search_result_item_${option.title}`}
        {...props}
        sx={{
          '&.MuiListItem-root': { py: 1.5, gap: 2, alignItems: 'flex-start' },
          '&.Mui-focused.MuiAutocomplete-option, &.Mui-focusVisible.MuiAutocomplete-option': {
            bgcolor: 'inputBgOutfocused.main',
            '.blurred-bottom::after': {
              background: 'linear-gradient(0deg, #F6F7F8 0%, #F6F7F8 30%, rgba(255,255,255,0) 100%)'
            }
          }
        }}
      >
        {/* left column: icon */}
        <Box pt={0.6} sx={{ display: { xs: 'none', md: 'block' }, mt: -0.5 }}>
          <OutboundOutlinedIcon sx={{ color: 'blue.main', fontSize: '1.5rem' }} />
        </Box>

        {/* main column */}
        <Stack
          flex={1}
          ref={ref}
          sx={{
            position: 'relative',
            maxHeight: '120px',
            overflow: 'hidden'
          }}
        >
          {/* post subreddit */}
          <Typography variant="body2" sx={{ color: 'blue.main' }}>
            r/{option?.subreddit?.name}
          </Typography>

          {/* post title */}
          <Typography color="black" fontSize="1.1rem">
            {option?.title}
          </Typography>

          {/* post body */}
          <Typography
            className="blurred-bottom"
            variant="subtitle1"
            sx={{
              pb: 5,
              color: 'hintText.main',
              ...bottomStyle
            }}
          >
            {parseHtml(option?.body) || option?.link}
          </Typography>

          {/* vote-comment counter */}
          <Stack direction="row" alignItems="center" sx={{ position: 'absolute', left: 0, bottom: 0, width: '100%' }}>
            <Typography fontWeight={400} fontSize="0.8rem" sx={{ color: 'blue.main' }}>
              {option?.totalUpvotes} upvotes
            </Typography>

            <Typography fontWeight={400} fontSize="0.8rem" sx={{ color: 'blue.main', ml: 1 }}>
              {option?.totalComments} comments
            </Typography>
          </Stack>
        </Stack>

        {/* image column */}
        <Box display="flex" alignSelf="center" flexDirection="column">
          {postFirsImgUrl && (
            <Box borderRadius="0.3rem">
              <Image alt="post image" src={postFirsImgUrl} style={{ objectFit: 'cover' }} width={100} height={70} />
            </Box>
          )}
        </Box>
      </ListItem>
      <Divider />
    </>
  )
}

export default TopTrendingOption
