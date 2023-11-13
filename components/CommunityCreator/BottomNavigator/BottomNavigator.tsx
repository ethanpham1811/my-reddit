import { RdButton } from '@/components'
import { CircularProgress, Paper } from '@/mui'
import { Dispatch, SetStateAction } from 'react'

type TBottomNavigatorProps = {
  setOpen: Dispatch<SetStateAction<boolean>>
  loading: boolean
}
function BottomNavigator({ loading, setOpen }: TBottomNavigatorProps) {
  return (
    <Paper sx={{ display: 'flex', borderTop: '1px solid', borderColor: 'orange.main', height: '40px' }}>
      <RdButton disabled={loading} text="Cancel" onClick={() => setOpen(false)} sx={{ borderRadius: 0, py: 1, fontSize: '1rem' }} />
      <RdButton
        endIcon={loading && <CircularProgress sx={{ color: 'orange.main' }} size={20} />}
        disabled={loading}
        filled={!loading}
        text={loading ? 'Creating..' : 'Create'}
        type="submit"
        sx={{ borderRadius: 0, py: 1, fontSize: '1rem' }}
      />
    </Paper>
  )
}

export default BottomNavigator
