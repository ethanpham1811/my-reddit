import { Events, eventEmitter } from '@/src/eventEmitter'
import { Box, BoxProps, Typography } from '@mui/material'

type TMessageBoardProps = BoxProps & {
  head: string
  highlight?: string
  tail?: string
  hasLogin?: boolean
}

function MessageBoard({ head, highlight, tail, pt, hasLogin }: TMessageBoardProps) {
  function onLogin() {
    hasLogin && eventEmitter.dispatch(Events.OPEN_LOGIN_MODAL, true)
  }

  return (
    <Box display="flex" justifyContent="center" pt={pt}>
      <Typography variant="body1" color="initial" fontWeight={400}>
        {head}
        <Typography fontWeight={500} onClick={onLogin} sx={{ color: 'blue.main', cursor: hasLogin ? 'pointer' : 'auto' }}>
          {highlight}
        </Typography>
        {tail}
      </Typography>
    </Box>
  )
}

export default MessageBoard
