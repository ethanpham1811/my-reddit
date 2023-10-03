import { useEffect, useState } from 'react'

import { TRdSubredditAutoCompleteProps, TSubreddit } from '@/constants/types'
import { FieldValues } from 'react-hook-form'

import { RdAutoComplete } from '../..'

function RdSubredditAutoComplete<T extends FieldValues>({ name, control, width, flex }: TRdSubredditAutoCompleteProps<T>) {
  const [loading, setLoading] = useState(true)

  const options: TSubreddit[] = loading
    ? []
    : [
        { name: 'programming', id: 23 },
        { name: 'programming', id: 12 },
        { name: 'social', id: 14 }
      ]

  useEffect(() => {
    if (!loading) return
    const to = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(to)
  }, [loading])

  return (
    <RdAutoComplete
      control={control}
      name={name}
      options={options}
      loading={loading}
      width={width}
      flex={flex}
      placeholder="Subreddit"
      id="subreddit-auto-select"
      bgcolor="white"
      arrow
    />
  )
}

export default RdSubredditAutoComplete
