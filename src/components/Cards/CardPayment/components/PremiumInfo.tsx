import { RdAdItem } from '@/src/components'
import { Stack } from '@/src/mui'
import { premiumInfoData } from '../data'

function PremiumInfo() {
  return (
    <Stack display="grid" gridTemplateColumns="1fr 1fr" gap={3} mx="auto" width={{ xs: '100%', sm: 520 }}>
      {premiumInfoData.map((props, i) => {
        const isEven: boolean = i % 2 === 0
        return <RdAdItem sx={{ ml: isEven ? 'auto' : 'unset', mr: !isEven ? 'auto' : 'unset' }} key={`premium_ad_${i}`} {...props} />
      })}
    </Stack>
  )
}

export default PremiumInfo
