import { Controller, FieldValues } from 'react-hook-form'

import { useAppSession } from '@/components/Layouts/MainLayout'
import { SUBREDDIT_LIST_MODE } from '@/constants/enums'
import { TRdSubredditSelectProps } from '@/constants/types'
import useSubredditList from '@/hooks/useSubredditList'
import { Box, FormControl, MenuItem, Typography } from '@mui/material'
import Image from 'next/image'
import { v4 as rid } from 'uuid'
import { RdDropdown } from '../..'
import { generateUserImage, validateSubredditMember } from '../../../services'

function RdSubredditSelect<T extends FieldValues>({ registerOptions, name, control, width, flex, sx }: TRdSubredditSelectProps<T>) {
  const { session } = useAppSession()
  const me = session?.userDetail
  const { subredditList, loading, error } = useSubredditList(SUBREDDIT_LIST_MODE.Simple)

  // only show subreddit that user is member of
  const ownSubredditList = subredditList?.filter((sub) => validateSubredditMember(me?.member_of_ids, sub.name))

  function renderSelectedOption(selectedValue: string) {
    const selectedItem = subredditList && subredditList.find((item) => item.id == +selectedValue)

    return selectedItem ? (
      <Box sx={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
        <Image alt={`${selectedItem.name} image`} src={generateUserImage(selectedItem.name)} width={20} height={20} />
        {selectedItem.name}
      </Box>
    ) : (
      <Typography>Subreddit</Typography>
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
            {ownSubredditList && ownSubredditList.length > 0 ? (
              ownSubredditList.map(({ id, name }) => {
                return (
                  <MenuItem value={id} key={`menu_${rid()}`}>
                    <Image alt={`${name} image`} src={generateUserImage(name)} width={20} height={20} />
                    {name || 'unknown'}
                  </MenuItem>
                )
              })
            ) : (
              <div>No subreddit found</div>
            )}
          </RdDropdown>
        )}
      />
    </FormControl>
  )
}

export default RdSubredditSelect
