import { RdMultipleDropdown } from '@/src/components'
import { RdSkeleton } from '@/src/components/Skeletons'
import { MAX_TOPIC_CHOSEN } from '@/src/constants/enums'
import { TTopic } from '@/src/constants/types'
import { useTopicList } from '@/src/hooks'
import { MenuItem } from '@/src/mui'
import { emptyArrayValidation } from '@/src/services/formValidations'
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
