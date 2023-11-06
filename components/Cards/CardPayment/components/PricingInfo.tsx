import { RdPricing } from '@/components'
import { Stack } from '@/mui'
import { Dispatch, SetStateAction } from 'react'
import { pricinginfoData } from '../data'

type TPricingInfoProps = {
  setSelectedPricing: Dispatch<SetStateAction<number | null>>
  selectedPricing: number | null
}

function PricingInfo({ selectedPricing, setSelectedPricing }: TPricingInfoProps) {
  return (
    <Stack
      flexDirection={{ xs: 'column', sm: 'row' }}
      width={{ xs: '100%', sm: 520 }}
      alignItems={{ xs: 'center', sm: 'flex-start' }}
      justifyContent="center"
      gap={3}
      flex={1}
    >
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
  )
}

export default PricingInfo
