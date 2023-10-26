import { RdMultipleDropdown } from '@/components'
import { RdSkeleton } from '@/components/Skeletons'
import { MAX_TOPIC_CHOSEN } from '@/constants/enums'
import { TTopic } from '@/constants/types'
import useTopicList from '@/hooks/useTopicList'
import { Box, Chip, FormControl, MenuItem, Typography } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { Control, Controller, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'
import { v4 as rid } from 'uuid'

type TTopicDropdown<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
  registerOptions?: RegisterOptions
}

function TopicDropdown<T extends FieldValues>({ name, control, registerOptions }: TTopicDropdown<T>) {
  const { topicList, loading, error } = useTopicList()
  /* set local list for data manipulating */
  // const [localList, setLocalList] = useState<TTopic[] | null>(null)

  // useEffect(() => {
  //   if (localList === null) {
  //     setLocalList(topicList)
  //   }
  // }, [topicList, localList])

  const renderSelectedOption = (selectedArray: string[], setSelectedArray: Dispatch<SetStateAction<string[]>>) => {
    /* remove selected items from dropdown list */
    // localList &&
    //   setLocalList(
    //     localList?.filter((option: TTopic): boolean => {
    //       return selectedArray.findIndex((item) => item.includes(option.id.toString())) === -1
    //     })
    //   )

    /* from string[] to TTopic[] mapping */
    const mappedArray =
      selectedArray && selectedArray.length > 0
        ? selectedArray.map((item): TTopic => {
            return { id: +item.split('_')[0], name: item.split('_')[1] }
          })
        : []

    return (
      <>
        {mappedArray.length !== 0 ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {mappedArray.map(({ id, name }) => (
              <Chip
                clickable={false}
                size="small"
                sx={{ bgcolor: 'blue.main', color: 'white.main', '.MuiChip-label': { position: 'relative' } }}
                key={id}
                label={
                  <Typography variant="body2" fontWeight={400} sx={{ position: 'relative', top: '-1px' }}>
                    {name}
                  </Typography>
                }
                /* stop Select open event -> trigger onDelete of Chip on clicking Chip */
                onMouseDown={(e) => e.stopPropagation()}
                onDelete={() => setSelectedArray(selectedArray?.filter((option): boolean => Number(option.split('_')[0]) !== id))}
              />
            ))}
          </Box>
        ) : (
          <Box pl={1}>
            <Typography>Topics</Typography>
          </Box>
        )}
      </>
    )
  }

  return (
    <FormControl sx={{ flex: 1 }}>
      <Controller
        rules={registerOptions}
        control={control}
        name={name}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <RdMultipleDropdown
            error={error}
            max={MAX_TOPIC_CHOSEN}
            renderSelectedOption={renderSelectedOption}
            onChange={onChange}
            // sx={{ minWidth: '200px' }}
          >
            {topicList ? (
              topicList.map(({ id, name }: TTopic) => {
                return (
                  <MenuItem value={`${id}_${name}`} key={`menu_${rid()}`}>
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
