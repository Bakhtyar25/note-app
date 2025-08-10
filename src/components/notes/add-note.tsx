import { Plus } from 'lucide-react'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddNoteForm from './add-note-form'

type Props = {}

export default function AddNote({ }: Props) {
  return (
    <div>

      <Dialog>
        <DialogTrigger asChild>
          <button className='border-2 border-border rounded-full px-2 py-1 flex items-center gap-2 h-9 cursor-pointer hover:bg-foreground/20 transition-all duration-200'>
            <Plus className='size-5 text-primary' />
            <span className='text-primary'>Add Note</span>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-[#F8F8F8]">
          <DialogHeader>
            <DialogTitle className='text-primary text-xl text-center mt-2'>Add note</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <AddNoteForm />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}