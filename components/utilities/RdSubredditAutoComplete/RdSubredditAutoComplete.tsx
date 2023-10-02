import { useEffect, useState } from 'react'

import { TRdSubredditAutoCompleteProps, TSubreddit } from '@/constants/types'
import { FieldValues } from 'react-hook-form'

import { RdAutoComplete } from '../..'

function RdSubredditAutoComplete<T extends FieldValues>({ name, control, width, flex }: TRdSubredditAutoCompleteProps<T>) {
  const [loading, setLoading] = useState(true)

  const options: TSubreddit[] = loading
    ? []
    : [
        { topic: 'programming', name: 'Artificial Intelligent Arts', id: 23, subType: 'public', isChildrenContent: true },
        { topic: 'programming', name: 'Programming languages', id: 12, subType: 'private', isChildrenContent: false },
        { topic: 'social', name: 'Social and family issues', id: 14, subType: 'public', isChildrenContent: true }
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
