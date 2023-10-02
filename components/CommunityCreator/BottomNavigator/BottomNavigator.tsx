import { RdButton } from '@/components'
import { TBottomNavigatorProps } from '@/constants/types'
import { Paper } from '@mui/material'

function BottomNavigator({ setOpen }: TBottomNavigatorProps) {
  return (
    <Paper sx={{ m: -5, mt: 'auto', display: 'flex', borderTop: '1px solid', borderColor: 'orange.main' }}>
      <RdButton text="Cancel" onClick={() => setOpen(false)} sx={{ borderRadius: 0, py: 1, fontSize: '1rem' }} />
      <RdButton filled text="Create" type="submit" sx={{ borderRadius: 0, py: 1, fontSize: '1rem' }} />
    </Paper>
  )
}

export default BottomNavigator
