import { useDrawer } from '@/src/hooks'
import { Events } from '@/src/services/eventEmitter'
import { Suspense } from 'react'
import { RdDrawer } from '../../components'
import { DrawerFallback } from '../../components/Fallbacks'
import { lazyLoad } from '../../services/lazyLoad'

const CommunityCreator = lazyLoad('/CommunityCreator', 'CommunityCreator')

function DrawerCommunityWrapper() {
  const [communityDrawerOpen, setCommunityDrawerOpen] = useDrawer(Events.OPEN_CREATE_COMMUNITY_DRAWER)

  return (
    <RdDrawer anchor="right" open={communityDrawerOpen} setOpen={setCommunityDrawerOpen}>
      <Suspense fallback={<DrawerFallback />}>{communityDrawerOpen && <CommunityCreator setOpen={setCommunityDrawerOpen} />}</Suspense>
    </RdDrawer>
  )
}

export default DrawerCommunityWrapper
