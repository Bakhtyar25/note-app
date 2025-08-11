"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import LogOut from '../auth/logout'
import { usePathname } from 'next/navigation'
import { useCookieUser } from '@/providers/cookie-provider'
import ThemeSwitcher from '../custom/theme-switcher'


type Props = object

export default function Header({ }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const { user } = useCookieUser()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setIsOpen(false)
    }, [pathname])


    return (
        <div className='border-b-2 border-border '>
            <header className='py-8 lg:px-16 px-6 flex justify-between items-center relative container mx-auto'>
                <Link href="/">
                    <Image src="/image/logoText.svg" alt="logo" width={1080} height={1080} className='w-36 h-auto ' />
                </Link>
                <div className='hidden md:flex items-center gap-4'>
                    <ThemeSwitcher />
                    { !user ? (
                        <>
                            <Link href="/login" className='btn-auth bg-transparent text-primary hover:bg-foreground/20 transition-all duration-200'>
                                Login
                            </Link>
                            <Link href="/signup" className='btn-auth bg-transparent text-primary hover:bg-foreground/20 transition-all duration-200'>
                                Sign Up
                            </Link>
                        </>
                        ) : (
                        <LogOut />
                    )}
                </div>
                <div className='md:hidden flex items-center gap-4'>
                    <ThemeSwitcher />
                    <Image src="/image/menu.svg" alt="menu" width={24} height={24} className='size-9' onClick={() => setIsOpen(!isOpen)} />
                </div>
                <div
                    className={cn(
                        "absolute top-full w-full min-h-screen lg:hidden bg-background border-t-2 border-border z-50 transition-all duration-700 ease-in-out ",
                        isOpen
                            ? "ltr:left-0 rtl:right-0"
                            : "ltr:-left-[1000px] rtl:-right-[1000px]"
                    )}
                >
                    <div className='flex justify-center p-4 items-center gap-4'>
                        {!user ? (
                            <>
                                <Link href="/login" className='w-1/2 py-2 btn-auth bg-transparent text-black hover:bg-foreground/20 transition-all duration-200'>
                                    Login
                                </Link >
                                <Link href="/signup" className='w-1/2 py-2 btn-auth bg-foreground text-white hover:bg-stone-400 transition-all duration-200'>
                                    Sign Up
                                </Link >
                            </>
                        ) : (
                            <div className='w-full flex justify-center'><LogOut /></div>
                        )}
                    </div>
                </div>
            </header>
        </div>
    )
}