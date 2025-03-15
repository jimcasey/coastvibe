'use client'

import React from 'react'

import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import type Entity from '@ant-design/cssinjs/es/Cache'
import { useServerInsertedHTML } from 'next/navigation'

const StyledComponentsRegistry = ({ children }: React.PropsWithChildren) => {
  const cache = React.useMemo<Entity>(() => createCache(), [])

  useServerInsertedHTML(() => {
    const styles = extractStyle(cache)
    return <style dangerouslySetInnerHTML={{ __html: styles }} />
  })

  return <StyleProvider cache={cache}>{children}</StyleProvider>
}

export default StyledComponentsRegistry
