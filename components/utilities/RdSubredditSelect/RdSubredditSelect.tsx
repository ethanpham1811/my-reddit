import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'

import useSubredditList from '@/hooks/useSubredditList'
import { Box, FormControl, MenuItem, SxProps, Theme, Typography } from '@mui/material'
import Image from 'next/image'
import { v4 as rid } from 'uuid'
import { generateUserImage } from '..'
import { RdDropdown } from '../..'

type TRdSubredditSelect<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
  width?: string
  flex?: number
  sx?: SxProps<Theme>
}

function RdSubredditSelect<T extends FieldValues>({ name, control, width, flex, sx }: TRdSubredditSelect<T>) {
  const [subredditList, loading] = useSubredditList()

  function renderSelectedOption(selectedValue: string) {
    const seletedItem = subredditList && subredditList.find((item) => item.topic == selectedValue)

    return seletedItem ? (
      <Box sx={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
        <Image alt={`${seletedItem.topic} image`} src={generateUserImage(seletedItem.topic)} width={20} height={20} />
        {seletedItem.topic}
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
                  <MenuItem value={item.topic} key={`menu_${rid()}`}>
                    <Image alt={`${item.topic} image`} src={generateUserImage(item.topic)} width={20} height={20} />
                    {item.topic || 'unknown'}
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
