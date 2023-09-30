import { useEffect, useState } from 'react'

import { TSubreddit } from '@/constants/types'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'

import { Box, FormControl, MenuItem, SxProps, Theme } from '@mui/material'
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
  const [loading, setLoading] = useState(true)

  const options: TSubreddit[] = loading
    ? []
    : [{ topic: 'Artificial Intelligent Arts' }, { topic: 'Programming' }, { topic: 'Social and family issues' }]

  useEffect(() => {
    if (!loading) return
    const to = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(to)
  }, [loading])

  function renderSelectedOption(selectedValue: string) {
    const seletedItem = options.find((item) => item.topic == selectedValue)

    return seletedItem ? (
      <Box sx={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
        <Image alt={`${seletedItem.topic} image`} src={generateUserImage(seletedItem.topic || 'seed')} width={20} height={20} />
        {seletedItem.topic}
      </Box>
    ) : (
      <div></div>
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
            {options.length > 0 ? (
              options.map((item) => {
                return (
                  <MenuItem value={item.topic} key={`menu_${rid()}`}>
                    <Image alt={`${item.topic} image`} src={generateUserImage(item.topic || 'seed')} width={20} height={20} />
                    {item.topic || 'unknown'}
                  </MenuItem>
                )
              })
            ) : (
              <div></div>
            )}
          </RdDropdown>
        )}
      />
    </FormControl>
  )
}

export default RdSubredditSelect
