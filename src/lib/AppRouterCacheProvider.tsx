'use client'

import * as React from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheets } from '@mui/styles'

export function AppRouterCacheProvider({ children }: { children: React.ReactNode }) {
  const [cache] = React.useState(() => new ServerStyleSheets())

  useServerInsertedHTML(() => {
    const styles = cache.toString()
    return <style id="jss-server-side" dangerouslySetInnerHTML={{ __html: styles }} />
  })

  return <>{children}</>
}
