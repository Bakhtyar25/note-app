"use client"

import React from "react"

export default function FadeIn({ children }: { children: React.ReactNode }) {
    const [show, setShow] = React.useState(false)
    React.useEffect(() => {
        const id = requestAnimationFrame(() => setShow(true))
        return () => cancelAnimationFrame(id)
    }, [])
    return (
        <div className={`transition-opacity duration-[700ms] ease-linear ${show ? 'opacity-100' : 'opacity-0'}`}>
            {children}
        </div>
    )
}