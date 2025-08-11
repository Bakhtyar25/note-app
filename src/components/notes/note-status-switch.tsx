import { updateNoteStatus } from '@/actions/note'
import { useCookieUser } from '@/providers/cookie-provider'
import { Square, SquareCheck } from 'lucide-react'
import React, { useTransition } from 'react'

type Props = {
    status: "open" | "completed"
    id: string
}

export default function NoteStatusSwitch({ status, id }: Props) {
    const { user } = useCookieUser()
    const [isPending, startTransition] = useTransition()
    const handleStatusChange = () => {
        startTransition(async () => {
            if (!user?.id) return
            await updateNoteStatus({
                UserId: user.id,
                id: id,
                status: status === "open" ? "completed" : "open",
            })
        })
    }

  return (
    <div className='col-span-1 flex justify-center items-center'>
        <button onClick={handleStatusChange} disabled={isPending}>
            {status === "completed" ? <SquareCheck className='size-6 flex-shrink-0 cursor-pointer' /> : <Square className='size-6 flex-shrink-0 cursor-pointer' />}
        </button>
    </div>
    
  )
}