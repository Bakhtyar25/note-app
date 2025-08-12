"use client"

import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

type Props = {
    className?: string
}

export default function AuthImage({ className }: Props) {
    return (
        <div className={cn('flex flex-col items-center', className)}>
            <Image src="/image/loginImage.svg" alt="auth-image" width={360} height={360} className='lg:block hidden' />
            <h1 className='text-center text-4xl font-bold p-1 w-fit mx-auto'>
                <span className='bg-gradient-to-r from-urgent to-low bg-clip-text text-transparent'>Organize</span>
                <br />
                <span className='bg-gradient-to-r from-urgent to-low bg-clip-text text-transparent'>yourself here!</span>
            </h1>
            <p className='text-center text-auth-image-text font-bold'>Practical, fast and free!</p>
        </div>
    )
}