import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

type Props = {
    className?: string
}

export default function AuthImage({ className }: Props) {
    return (
        <div className={cn('', className)}>
            <Image src="/image/loginImage.svg" alt="auth-image" width={360} height={360} className='' />
            <h1 className='bg-gradient-to-r from-urgent to-low text-transparent bg-clip-text text-center text-4xl font-bold p-1 w-fit mx-auto'>Organize<br /> yourself here!</h1>
            <p className='text-center text-auth-image-text font-bold'>Practical, fast and free!</p>
        </div>
    )
}