import { BORDER_TYPES } from '@/constants/enums'
import Chip, { ChipOwnProps } from '@mui/material/Chip'

type TRdChipProps = ChipOwnProps & {
  shape?: BORDER_TYPES
}

function RdChip({ shape = BORDER_TYPES.Circular, sx, ...rest }: TRdChipProps) {
  return <Chip sx={{ borderRadius: shape, ...sx }} {...rest} />
}

export default RdChip
