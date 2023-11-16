import { RdMultipleDropdown } from '@/components'
import { RdSkeleton } from '@/components/Skeletons'
import { MAX_TOPIC_CHOSEN } from '@/constants/enums'
import { TTopic } from '@/constants/types'
import { useTopicList } from '@/hooks'
import { MenuItem } from '@/mui'
import { emptyArrayValidation } from '@/src/formValidations'
import { Control, FieldValues, Path, PathValue, UseFormSetValue, UseFormTrigger } from 'react-hook-form'
import { renderSelectedOption } from './RenderedCbs'

type TTopicDropdown<T extends FieldValues> = {
  control: Control<T>
  setFormValue: UseFormSetValue<T>
  selectedTopics: string[]
  triggerValidation: UseFormTrigger<T>
}

function TopicDropdown<T extends FieldValues>({ control, setFormValue, triggerValidation, selectedTopics }: TTopicDropdown<T>) {
  const { topicList } = useTopicList()

  function unselectedOptions({ id, name }: TTopic) {
    return !selectedTopics.includes(`${id}_${name}`)
  }

  return (
    <RdMultipleDropdown<T, TTopic>
      registerOptions={{ validate: (val): string | boolean => emptyArrayValidation(val, 'topic') }}
      name={'topic_ids' as Path<T>}
      control={control}
      max={MAX_TOPIC_CHOSEN}
      renderSelectedOption={(value: PathValue<T, Path<T>>) => renderSelectedOption(value, setFormValue, triggerValidation)}
    >
      {topicList ? (
        topicList.filter(unselectedOptions).map(({ id, name }: TTopic) => {
          return (
            <MenuItem disabled={selectedTopics?.length === MAX_TOPIC_CHOSEN} value={`${id}_${name}`} key={`topic_${id}`}>
              {name || 'unknown'}
            </MenuItem>
          )
        })
      ) : (
        <RdSkeleton />
      )}
    </RdMultipleDropdown>
  )
}

export default TopicDropdown
