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

    useEffect(() => {
        // Close mobile menu on route change
        setIsOpen(false)
    }, [pathname])

    return (
        <div className='border-b-2 border-border'>
            <header className='h-20 overflow-hidden lg:px-16 px-6 flex justify-between items-center relative container mx-auto'>
                <Link href="/">
                    <Image src="/image/logoText.svg" alt="logo" width={1080} height={1080} className='w-36 h-auto block' />
                </Link>

                {/* Desktop actions */}
                <div className='hidden md:flex items-center gap-4 min-w-[260px] justify-end'>
                    <ThemeSwitcher />
                    {!user ? (
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

                {/* Mobile trigger */}
                <div className='md:hidden flex items-center gap-3'>
                    <ThemeSwitcher />
                    <button
                        aria-label="Open menu"
                        onClick={() => setIsOpen(true)}
                        className='inline-flex items-center justify-center rounded-md border border-border bg-background hover:bg-foreground/10 transition-colors size-9'
                    >
                        <Image src="/image/menu.svg" alt="menu" width={20} height={20} className='w-5 h-5' />
                    </button>
                </div>

                {/* Mobile off-canvas menu (fixed, no layout shift) */}
                <div
                    className={cn(
                        'fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm transition-opacity duration-200',
                        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    )}
                    onClick={() => setIsOpen(false)}
                />
                <nav
                    className={cn(
                        'fixed right-0 top-0 z-50 h-dvh w-72 max-w-[85vw] border-l-2 border-border bg-background shadow-xl transition-transform duration-300 ease-out',
                        isOpen ? 'translate-x-0' : 'translate-x-full'
                    )}
                    aria-hidden={!isOpen}
                >
                    <div className='p-4 flex items-center justify-between border-b-2 border-border'>
                        <span className='font-semibold'>Menu</span>
                        <button
                            aria-label="Close menu"
                            className='inline-flex items-center justify-center rounded-md border border-border bg-background hover:bg-foreground/10 transition-colors size-9'
                            onClick={() => setIsOpen(false)}
                        >
                            ✕
                        </button>
                    </div>
                    <div className='p-4 flex flex-col gap-3'>
                        <div className='flex items-center justify-between'>
                            <span className='text-sm text-muted-foreground'>Theme</span>
                            <ThemeSwitcher />
                        </div>
                        {!user ? (
                            <>
                                <Link
                                    href="/login"
                                    className='btn-auth bg-transparent text-primary hover:bg-foreground/20 transition-all duration-200 text-center'
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className='btn-auth bg-transparent text-primary hover:bg-foreground/20 transition-all duration-200 text-center'
                                    onClick={() => setIsOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <div className='flex justify-center'>
                                <div onClick={() => setIsOpen(false)}><LogOut /></div>
                            </div>
                        )}
                    </div>
                </nav>
            </header>
        </div>
    )
}