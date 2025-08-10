import Image from 'next/image'
import React from 'react'

type Props = {}

export default function EmptyState({ }: Props) {
    return (
        <div className='flex flex-col items-center justify-center p-16 gap-2'>
            <Image src="/image/Empty-icon.svg" alt="empty-state" width={100} height={100} className='w-52' />
            <h1 className='text-2xl font-bold text-primary text-center'>No note here...</h1>
            <p className='text-center text-sm text-muted-foreground md:w-1/5'>Add notes and get <br />
                It is organized in the best way!</p>
        </div>
    )
}