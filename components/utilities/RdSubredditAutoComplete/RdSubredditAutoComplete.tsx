import { useEffect, useState } from 'react'

import { TSubreddit } from '@/constants/types'
import { Control, FieldPath, FieldValues } from 'react-hook-form'

import { RdAutoComplete } from '../..'

type TRdSubredditAutoComplete<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
  width?: string
  flex?: number
}

function RdSubredditAutoComplete<T extends FieldValues>({ name, control, width, flex }: TRdSubredditAutoComplete<T>) {
  const [loading, setLoading] = useState(true)

  const options: TSubreddit[] = loading
    ? []
    : [{ topic: 'Artificial Intelligent Arts' }, { topic: 'Programming languages' }, { topic: 'Social and family issues' }]

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
