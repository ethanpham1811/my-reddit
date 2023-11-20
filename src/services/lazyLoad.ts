import { lazy } from 'react'

export function lazyLoad(path: string, name: string) {
  return lazy(() => import(`@/src/components/${path}/${name}`))
}
