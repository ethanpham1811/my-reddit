import { useDrawer } from '@/src/hooks'
import { Events } from '@/src/services/eventEmitter'
import { Suspense } from 'react'
import { RdDrawer } from '../../components'
import { DrawerFallback } from '../../components/Fallbacks'
import { lazyLoad } from '../../services/lazyLoad'

const CardPayment = lazyLoad('/Cards/CardPayment', 'CardPayment')

function DrawerPremiumWrapper() {
  const [premiumDrawerOpen, setPremiumDrawerOpen] = useDrawer(Events.OPEN_PREMIUM_DRAWER)

  return (
    <RdDrawer anchor="left" open={premiumDrawerOpen} setOpen={setPremiumDrawerOpen}>
      <Suspense fallback={<DrawerFallback />}>{premiumDrawerOpen && <CardPayment setOpen={setPremiumDrawerOpen} />}</Suspense>
    </RdDrawer>
  )
}

export default DrawerPremiumWrapper
