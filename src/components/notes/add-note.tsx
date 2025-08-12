"use client"

import {  Plus } from 'lucide-react'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddNoteForm from './add-note-form'
import Link from 'next/link'

type Props = {
  UserId: string
}

export default function AddNote({ UserId }: Props) {
  return (
    <div>
      {!UserId &&
        <Link href="/login" className='border-2 border-border rounded-full px-2 py-1 flex items-center gap-2 h-9 cursor-pointer hover:bg-foreground/20 transition-all duration-200'>
          <Plus className='size-5 text-primary dark:text-foreground' />
          <span className='text-primary dark:text-foreground'>Add Note</span>
        </Link>}
      {!!UserId && <Dialog>
        <DialogTrigger asChild>
          <button className='border-2 border-border rounded-full px-2 py-1 flex items-center gap-2 h-9 cursor-pointer hover:bg-foreground/20 transition-all duration-200'>
            <Plus className='size-5 text-primary dark:text-foreground' />
            <span className='text-primary dark:text-foreground'>Add Note</span>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-background">
          <DialogHeader>
            <DialogTitle className='text-primary text-xl text-center mt-2'>Add note</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <AddNoteForm />
          </div>
        </DialogContent>
      </Dialog>}
    </div>
  )
}