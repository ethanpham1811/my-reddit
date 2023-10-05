import { BORDER_TYPES } from '@/constants/enums'
import Chip, { ChipOwnProps } from '@mui/material/Chip'

type TRdChipProps = ChipOwnProps & {
  shape?: BORDER_TYPES
}

function RdChip({ shape = BORDER_TYPES.Circular, ...props }: TRdChipProps) {
  return <Chip sx={{ borderRadius: shape }} {...props} />
}

export default RdChip
