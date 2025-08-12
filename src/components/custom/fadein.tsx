"use client"

import React, { useState, useEffect } from "react"

export default function FadeIn({ children }: { children: React.ReactNode }) {
    const [show, setShow] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    
    useEffect(() => {
        setIsMounted(true)
        const id = requestAnimationFrame(() => setShow(true))
        return () => cancelAnimationFrame(id)
    }, [])
    
    // Don't render anything until mounted to prevent hydration mismatch
    if (!isMounted) {
        return <div className="opacity-0">{children}</div>
    }
    
    return (
        <div className={`transition-opacity duration-[700ms] ease-linear ${show ? 'opacity-100' : 'opacity-0'}`}>
            {children}
        </div>
    )
}