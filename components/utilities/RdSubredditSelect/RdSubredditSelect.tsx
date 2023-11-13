import { Control, Controller, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'

import { useAppSession } from '@/components/Layouts/MainLayout'
import { RdSkeleton } from '@/components/Skeletons'
import { SUBREDDIT_LIST_MODE } from '@/constants/enums'
import useSubredditList from '@/hooks/useSubredditList'
import { Avatar, Box, FormControl, MenuItem, Stack, SxProps, Theme, Typography } from '@mui/material'
import { Jelly } from '@uiball/loaders'
import { v4 as rid } from 'uuid'
import { RdDropdown } from '../..'
import { generateSeededHexColor, generateUserImage, validateSubredditMember } from '../../../src/utils'

type TRdSubredditSelectProps<T extends FieldValues> = {
  registerOptions?: RegisterOptions
  name: FieldPath<T>
  control: Control<T>
  width?: string
  flex?: number
  sx?: SxProps<Theme>
}
function RdSubredditSelect<T extends FieldValues>({ registerOptions, name, control, width, flex, sx }: TRdSubredditSelectProps<T>) {
  const { session } = useAppSession()
  const me = session?.userDetail
  const { subredditList, loading } = useSubredditList(SUBREDDIT_LIST_MODE.Simple)

  // only show subreddit that user is member of
  const ownSubredditList = subredditList?.filter((sub) => validateSubredditMember(me?.member_of_ids, sub.name))

  function renderSelectedOption(selectedValue: string) {
    const selectedItem = subredditList && subredditList.find((item) => item.id == +selectedValue)

    return selectedItem ? (
      <Stack minWidth={0} direction="row" alignItems="center">
        <Avatar
          variant="circular"
          sx={{
            mr: 1,
            width: 20,
            height: 20,
            backgroundColor: generateSeededHexColor(selectedItem.name || 'seed')
          }}
          alt={`${selectedItem.name} avatar`}
          src={generateUserImage(selectedItem.name || 'seed')}
        />
        <Box overflow="hidden" textOverflow="ellipsis" sx={{ display: { xs: 'none', sm: 'block' } }}>
          r/{selectedItem.name}
        </Box>
      </Stack>
    ) : (
      <Box display="flex" alignItems="center">
        {loading && <Jelly size={20} speed={0.7} color="#ff4500" />}
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
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          // set value to empty string if no option is selected, the input always need to have value,
          // otherwise the uncontrolled to control issue will occurs
          const inputValue: string = value ?? ''
          return (
            <RdDropdown
              onChange={onChange}
              error={!!error}
              value={inputValue}
              renderSelectedOption={renderSelectedOption}
              width={width}
              sx={{ minWidth: { xs: 'auto', sm: '150px' }, ...sx }}
              flex={flex}
              mobileMode
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
                      sx={{ pl: 1, pr: 2, bgcolor: 'inputBgOutfocused.main', '&:hover,&.Mui.focused': { bgcolor: 'primary.main' } }}
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
          )
        }}
      />
    </FormControl>
  )
}

export default RdSubredditSelect
