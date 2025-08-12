import React, { useTransition } from 'react'
import { DialogClose, DialogFooter } from '../ui/dialog'
import { Button } from '../ui/button'
import { deleteNote } from '@/actions/note'
import { useCookieUser } from '@/providers/cookie-provider'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'


type Props = {
  id: string
}

export default function DeleteNote({ id }: Props) {
  const [isPending, startTransition] = useTransition()
  const { user } = useCookieUser()


  const handleDelete = () => {
    startTransition(async () => {
      if (!user?.id) return
      await deleteNote({
        id: id,
        UserId: user.id,
      })
      toast.success("Note deleted successfully")
    })
  }

  return (
    <div className='flex justify-center items-center gap-4 mt-4'>

      <DialogFooter className='flex justify-center items-center gap-4'>
        <DialogClose asChild>
          <Button variant="default" className='bg-success hover:bg-success/80 text-white hover:text-white'>No, Cancel</Button>
        </DialogClose>
        <Button disabled={isPending} type='submit' className='w-full md:w-1/2' variant="destructive" onClick={handleDelete}>
          {isPending ? <Loader2 className='animate-spin' /> : "Yes, Delete"}
        </Button>
      </DialogFooter>
    </div>
  )
}