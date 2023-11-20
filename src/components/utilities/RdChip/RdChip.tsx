import { BORDER_TYPES } from '@/src/constants/enums'
import Chip, { ChipOwnProps } from '@mui/material/Chip'

type TRdChipProps = ChipOwnProps & {
  shape?: BORDER_TYPES
}

function RdChip({ shape = BORDER_TYPES.Circular, sx, ...rest }: TRdChipProps) {
  return <Chip sx={{ lineHeight: 1.8, borderRadius: shape, ...sx }} {...rest} />
}

export default RdChip
