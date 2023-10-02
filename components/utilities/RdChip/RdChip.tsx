import Chip, { ChipOwnProps } from '@mui/material/Chip'

function RdChip({ ...props }: ChipOwnProps) {
  return <Chip sx={{ borderRadius: 0.5 }} {...props} />
}

export default RdChip
