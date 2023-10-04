import { RdMultipleDropdown } from '@/components'
import { MAX_TOPIC_CHOSEN } from '@/constants/enums'
import { TTopic } from '@/constants/types'
import useTopicList from '@/hooks/useTopicList'
import { Box, Chip, FormControl, MenuItem, Skeleton, Stack, Typography } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'
import { v4 as rid } from 'uuid'

type TTopicDropdown<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
}

function TopicDropdown<T extends FieldValues>({ name, control }: TTopicDropdown<T>) {
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
            {mappedArray.map((item) => (
              <Chip
                clickable={false}
                size="small"
                sx={{ bgcolor: 'blue.main', color: 'white.main', '.MuiChip-label': { position: 'relative' } }}
                key={item.id}
                label={
                  <Typography variant="body2" fontWeight={400} sx={{ position: 'relative', top: '-1px' }}>
                    {item.name}
                  </Typography>
                }
                /* stop Select open event -> trigger onDelete of Chip on clicking Chip */
                onMouseDown={(e) => e.stopPropagation()}
                onDelete={() => setSelectedArray(selectedArray?.filter((option): boolean => Number(option.split('_')[0]) !== item.id))}
              />
            ))}
          </Box>
        ) : (
          <Typography>Topics</Typography>
        )}
      </>
    )
  }

  return (
    <FormControl>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <RdMultipleDropdown
            max={MAX_TOPIC_CHOSEN}
            renderSelectedOption={renderSelectedOption}
            onChange={onChange}
            flex={1}
            sx={{ minWidth: '200px' }}
          >
            {topicList ? (
              topicList.map((item: TTopic) => {
                return (
                  <MenuItem value={`${item.id}_${item.name}`} key={`menu_${rid()}`}>
                    {item.name || 'unknown'}
                  </MenuItem>
                )
              })
            ) : (
              <Stack px={1} gap={1}>
                <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="100%" height="25px" />
                <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="100%" height="25px" />
                <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="100%" height="25px" />
              </Stack>
            )}
          </RdMultipleDropdown>
        )}
      />
    </FormControl>
  )
}

export default TopicDropdown
