import { Controller, FieldValues } from 'react-hook-form'

import { useAppSession } from '@/components/Layouts/MainLayout'
import { RdSkeleton } from '@/components/Skeletons'
import { SUBREDDIT_LIST_MODE } from '@/constants/enums'
import { TRdSubredditSelectProps } from '@/constants/types'
import useSubredditList from '@/hooks/useSubredditList'
import { Avatar, Box, CircularProgress, FormControl, MenuItem, Typography } from '@mui/material'
import Image from 'next/image'
import { v4 as rid } from 'uuid'
import { RdDropdown } from '../..'
import { generateSeededHexColor, generateUserImage, validateSubredditMember } from '../../../services'

function RdSubredditSelect<T extends FieldValues>({ registerOptions, name, control, width, flex, sx }: TRdSubredditSelectProps<T>) {
  const { session } = useAppSession()
  const me = session?.userDetail
  const { subredditList, loading } = useSubredditList(SUBREDDIT_LIST_MODE.Simple)

  // only show subreddit that user is member of
  const ownSubredditList = subredditList?.filter((sub) => validateSubredditMember(me?.member_of_ids, sub.name))

  function renderSelectedOption(selectedValue: string) {
    const selectedItem = subredditList && subredditList.find((item) => item.id == +selectedValue)

    return selectedItem ? (
      <Box minWidth={0} overflow="hidden" textOverflow="ellipsis">
        <Image
          style={{ marginRight: '0.5rem' }}
          alt={`${selectedItem.name} image`}
          src={generateUserImage(selectedItem.name)}
          width={20}
          height={20}
        />
        {selectedItem.name}
      </Box>
    ) : (
      <Box display="flex" alignItems="center">
        {loading && <CircularProgress size={15} sx={{ color: 'hintText.main', mx: '0.5rem' }} />}
        <Typography sx={{ pl: '0.5rem' }}>Subreddit</Typography>
      </Box>
    )
  }

  return (
    <FormControl>
      <Controller
        name={name}
        control={control}
        rules={registerOptions}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <RdDropdown
            onChange={onChange}
            error={!!error}
            value={value}
            renderSelectedOption={renderSelectedOption}
            loading={loading}
            width={width}
            sx={sx}
            flex={flex}
            placeholder="Subreddit"
            borderColor="primary"
          >
            {loading ? (
              <Box px={1} py={0.5}>
                <RdSkeleton height="20px" />
              </Box>
            ) : ownSubredditList && ownSubredditList.length > 0 ? (
              ownSubredditList.map(({ id, name }) => {
                return (
                  <MenuItem
                    value={id}
                    key={`menu_${rid()}`}
                    sx={{ px: 1, bgcolor: 'inputBgOutfocused.main', '&:hover,&.Mui.focused': { bgcolor: 'primary.main' } }}
                  >
                    <Avatar
                      variant="circular"
                      sx={{
                        width: 30,
                        height: 30,
                        backgroundColor: generateSeededHexColor(name || 'seed'),
                        border: (theme): string => `4px solid ${theme.palette.white.main}`
                      }}
                      alt={`${name} avatar`}
                      src={generateUserImage(name || 'seed')}
                    />
                    {`r/${name}` || 'unknown'}
                  </MenuItem>
                )
              })
            ) : (
              <Box px={2}>
                <Typography sx={{ color: 'hintText.main' }}>No subreddit found</Typography>
              </Box>
            )}
          </RdDropdown>
        )}
      />
    </FormControl>
  )
}

export default RdSubredditSelect
