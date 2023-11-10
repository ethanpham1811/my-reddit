import { TTopic } from '@/constants/types'
import { Box, Chip, Typography } from '@/mui'
import { Dispatch, SetStateAction } from 'react'

export const renderSelectedOption = (selectedArray: string[], setSelectedArray: Dispatch<SetStateAction<string[]>>) => {
  /* from string[] to TTopic[] mapping */
  const mappedArray =
    selectedArray && selectedArray.length > 0
      ? selectedArray.map((item): TTopic => {
          return { id: +item.split('_')[0], name: item.split('_')[1] }
        })
      : []

  function removeChip(id: number) {
    setSelectedArray(selectedArray?.filter((option): boolean => Number(option.split('_')[0]) !== id))
  }

  return (
    <>
      {mappedArray.length !== 0 ? (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {mappedArray.map(({ id, name }) => (
            <Chip
              clickable={false}
              size="small"
              sx={{ display: 'flex', alignItems: 'center', bgcolor: 'blue.main', color: 'white.main', '.MuiChip-label': { position: 'relative' } }}
              key={id}
              label={
                <Typography variant="body2" fontWeight={400} sx={{ position: 'relative' }}>
                  {name}
                </Typography>
              }
              /* stop Select open event -> trigger onDelete of Chip on clicking Chip */
              onMouseDown={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.key === 'Enter' && removeChip(id)}
              onDelete={() => removeChip(id)}
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
