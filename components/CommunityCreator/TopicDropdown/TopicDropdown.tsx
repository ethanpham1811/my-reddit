import { RdMultipleDropdown } from '@/components'
import { RdSkeleton } from '@/components/Skeletons'
import { MAX_TOPIC_CHOSEN } from '@/constants/enums'
import { TTopic } from '@/constants/types'
import { useTopicList } from '@/hooks'
import { FormControl, MenuItem } from '@/mui'
import { Control, Controller, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'
import { renderSelectedOption } from './RenderedCbs'

type TTopicDropdown<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
  registerOptions?: RegisterOptions
}

function TopicDropdown<T extends FieldValues>({ name, control, registerOptions }: TTopicDropdown<T>) {
  const { topicList } = useTopicList()

  return (
    <FormControl sx={{ flex: 1 }}>
      <Controller
        rules={registerOptions}
        control={control}
        name={name}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <RdMultipleDropdown error={error} max={MAX_TOPIC_CHOSEN} renderSelectedOption={renderSelectedOption} onChange={onChange}>
            {topicList ? (
              topicList.map(({ id, name }: TTopic) => {
                return (
                  <MenuItem value={`${id}_${name}`} key={`topic_${id}`}>
                    {name || 'unknown'}
                  </MenuItem>
                )
              })
            ) : (
              <RdSkeleton />
            )}
          </RdMultipleDropdown>
        )}
      />
    </FormControl>
  )
}

export default TopicDropdown
