import { RdButton } from '@/components'
import { CircularProgress, Paper } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

type TBottomNavigatorProps = {
  setOpen: Dispatch<SetStateAction<boolean>>
  loading: boolean
}
function BottomNavigator({ loading, setOpen }: TBottomNavigatorProps) {
  return (
    <Paper sx={{ mx: { xs: -2, sm: -5 }, mb: { xs: -1, sm: -5 }, mt: 'auto', display: 'flex', borderTop: '1px solid', borderColor: 'orange.main' }}>
      <RdButton disabled={loading} text="Cancel" onClick={() => setOpen(false)} sx={{ borderRadius: 0, py: 1, fontSize: '1rem' }} />
      <RdButton
        endIcon={loading && <CircularProgress sx={{ color: 'orange.main' }} size={20} />}
        disabled={loading}
        filled={!loading}
        text="Create"
        type="submit"
        sx={{ borderRadius: 0, py: 1, fontSize: '1rem' }}
      />
    </Paper>
  )
}

export default BottomNavigator
