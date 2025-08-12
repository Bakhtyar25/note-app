"use client"

import { useState, useEffect, ReactNode } from 'react'

interface HydrationGuardProps {
  children: ReactNode
  fallback?: ReactNode
  delay?: number
}

export default function HydrationGuard({ 
  children, 
  fallback = null, 
  delay = 0 
}: HydrationGuardProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  if (!isMounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
