"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

import { useCookieUser } from '@/providers/cookie-provider'
import { logOut } from '@/actions/auth'
import ThemeSwitcher from '../custom/theme-switcher'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isMounted } = useCookieUser()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLogoutOpen, setIsLogoutOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Handle logout
  const handleLogout = async () => {
    startTransition(async () => {
      try {
        const result = await logOut()
        if (result?.success) {
          toast.success("Logged out successfully")
          setIsLogoutOpen(false)
          setIsMenuOpen(false)
          router.push("/login")
        } else {
          toast.error("Logout failed")
        }
      } catch (error) {
        console.error('Logout error:', error)
        toast.error("Logout failed")
      }
    })
  }

  // Desktop authentication buttons
  const DesktopAuthButtons = () => {
    if (!isMounted) {
      return <div className="min-w-[260px]" />
    }

    if (!user) {
      return (
        <>
          <Link 
            href="/login" 
            className="btn-auth bg-transparent text-primary hover:bg-foreground/20 transition-all duration-200"
          >
            Login
          </Link>
          <Link 
            href="/signup" 
            className="btn-auth bg-transparent text-primary hover:bg-foreground/20 transition-all duration-200"
          >
            Sign Up
          </Link>
        </>
      )
    }

    return (
      <button 
        className="btn-auth bg-transparent text-primary hover:bg-foreground/20 transition-all duration-200"
        onClick={() => setIsLogoutOpen(true)}
      >
        Logout
      </button>
    )
  }

  // Mobile authentication buttons
  const MobileAuthButtons = () => {
    if (!isMounted) {
      return <div className="min-h-[40px]" />
    }

    if (!user) {
      return (
        <>
          <Link
            href="/login"
            className="btn-auth bg-transparent text-primary hover:bg-foreground/20 transition-all duration-200 text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="btn-auth bg-transparent text-primary hover:bg-foreground/20 transition-all duration-200 text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign Up
          </Link>
        </>
      )
    }

    return (
      <button 
        className="btn-auth bg-transparent text-primary hover:bg-foreground/20 transition-all duration-200 text-center"
        onClick={() => setIsLogoutOpen(true)}
      >
        Logout
      </button>
    )
  }

  return (
    <header className="border-b-2 border-border">
      <div className="h-20 overflow-hidden lg:px-16 px-6 flex justify-between items-center relative container mx-auto">
        {/* Logo */}
        <Link href="/">
          <Image 
            src="/image/logoText.svg" 
            alt="Note App Logo" 
            width={1080} 
            height={1080} 
            className="w-36 h-auto block" 
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 min-w-[260px] justify-end">
          <ThemeSwitcher />
          <DesktopAuthButtons />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeSwitcher />
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open mobile menu"
                className="inline-flex items-center justify-center rounded-md border border-border bg-background hover:bg-foreground/10 transition-colors size-9"
              >
                <Image 
                  src="/image/menu.svg" 
                  alt="Menu" 
                  width={20} 
                  height={20} 
                  className="w-5 h-5" 
                />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 max-w-[85vw] p-0">
              <SheetHeader className="p-4 border-b-2 border-border">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="p-4 flex flex-col gap-3">
                <MobileAuthButtons />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Logout Dialog - rendered outside of conditional components */}
      <Dialog open={isLogoutOpen} onOpenChange={setIsLogoutOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center mt-2 text-primary font-bold text-2xl">
              Do You Want to <span className="text-red-500">Logout</span>?
            </DialogTitle>
            <DialogDescription className="text-center text-primary w-2/3 mx-auto">
              Please confirm if you want to logout
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center items-center gap-4">
            <Button 
              type="button" 
              variant="default" 
              className="bg-success hover:bg-success/80 text-white"
              onClick={() => setIsLogoutOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              disabled={isPending} 
              type="submit" 
              className="w-full md:w-1/2" 
              variant="destructive" 
              onClick={handleLogout}
            >
              {isPending ? <Loader2 className="animate-spin" /> : "Logout"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  )
}