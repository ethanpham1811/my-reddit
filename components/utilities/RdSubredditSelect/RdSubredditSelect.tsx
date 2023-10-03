import { Controller, FieldValues } from 'react-hook-form'

import { SUBREDDIT_LIST_FOR } from '@/constants/enums'
import { TRdSubredditSelectProps } from '@/constants/types'
import useSubredditList from '@/hooks/useSubredditList'
import { Box, FormControl, MenuItem, Typography } from '@mui/material'
import Image from 'next/image'
import { v4 as rid } from 'uuid'
import { generateUserImage } from '..'
import { RdDropdown } from '../..'

function RdSubredditSelect<T extends FieldValues>({ name, control, width, flex, sx }: TRdSubredditSelectProps<T>) {
  const [subredditList, loading] = useSubredditList(SUBREDDIT_LIST_FOR.createPostSelect)

  function renderSelectedOption(selectedValue: string) {
    const seletedItem = subredditList && subredditList.find((item) => item.id == +selectedValue)

    return seletedItem ? (
      <Box sx={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
        <Image alt={`${seletedItem.name} image`} src={generateUserImage(seletedItem.name)} width={20} height={20} />
        {seletedItem.name}
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
        render={({ field: { onChange, value } }) => (
          <RdDropdown
            onChange={onChange}
            value={value}
            renderSelectedOption={renderSelectedOption}
            loading={loading}
            width={width}
            sx={sx}
            flex={flex}
            placeholder="Subreddit"
            borderColor="primary"
          >
            {subredditList && subredditList.length > 0 ? (
              subredditList.map((item) => {
                return (
                  <MenuItem value={item.id} key={`menu_${rid()}`}>
                    <Image alt={`${item.name} image`} src={generateUserImage(item.name)} width={20} height={20} />
                    {item.name || 'unknown'}
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
