import { useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
import * as gtag from 'lib/gtag'

export const usePageView = () => {
  const router = useRouter()

  useEffect(() => {
    if (!gtag.existsGaId) return

    const handleRouteChange = (path: string) => {
      gtag.pageview(path)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.on('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}
