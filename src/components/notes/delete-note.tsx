import React from 'react'
import { DialogClose, DialogFooter } from '../ui/dialog'
import { Button } from '../ui/button'
import { deleteNote } from '@/actions/note'

type Props = {
    id: string
}

export default function DeleteNote({ id }: Props) {
  return (
    <form action={deleteNote} className='flex justify-center items-center gap-4 mt-4'>
        <input type="hidden" name="id" value={id} />
        <DialogFooter className='flex justify-center items-center gap-4'>
            <DialogClose asChild>
                <Button variant="default" className='bg-success hover:bg-success/80 text-white hover:text-white'>No, Cancel</Button>
            </DialogClose>
            <Button type='submit' variant="destructive">Yes, Delete</Button>
        </DialogFooter>
    </form>
  )
}