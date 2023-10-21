import { RdButton, RdCard } from '@/components'
import { Divider, Stack, Typography } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

type TCardConfirmProps = {
  text: string
  btnText: string
  setOpen: Dispatch<SetStateAction<boolean>>
  onConfirm: () => void
  solo?: boolean
  filled?: boolean
  invertColor?: boolean
}

function CardConfirm({ text, btnText, filled = false, invertColor = true, setOpen, onConfirm, solo }: TCardConfirmProps) {
  return (
    <RdCard sx={{ px: 4, py: 5, width: { xs: '400px', sm: '250px' } }}>
      <Stack spacing={2}>
        <Stack spacing={2} alignItems="center">
          <Typography>{text}</Typography>
        </Stack>
        <Divider sx={{ my: 1 }} />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {!solo && <RdButton text="Cancel" filled color="blue" onClick={() => setOpen(false)} />}
          <RdButton
            text={btnText}
            filled={filled}
            invertColor={invertColor}
            onClick={() => {
              setOpen(false)
              onConfirm()
            }}
          />
        </Stack>
      </Stack>
    </RdCard>
  )
}

export default CardConfirm
