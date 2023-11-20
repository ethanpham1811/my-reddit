import { RdPricing } from '@/src/components'
import { Stack, Typography } from '@/src/mui'
import { Dispatch, SetStateAction } from 'react'
import { pricinginfoData } from '../data'

type TPricingInfoProps = {
  setSelectedPricing: Dispatch<SetStateAction<number | null>>
  selectedPricing: number | null
}

function PricingInfo({ selectedPricing, setSelectedPricing }: TPricingInfoProps) {
  return (
    <Stack flex={1} alignItems="center" gap={2} width={{ xs: '100%', sm: 520 }}>
      <Typography textAlign="center">Please choose your package</Typography>
      <Stack flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'center', sm: 'flex-start' }} justifyContent="center" gap={3} flex={1}>
        {pricinginfoData.map((props, i) => (
          <RdPricing
            active={selectedPricing === i}
            onClick={() => {
              setSelectedPricing(i)
            }}
            key={`pricing_ad_${i}`}
            {...props}
          />
        ))}
      </Stack>
    </Stack>
  )
}

export default PricingInfo
