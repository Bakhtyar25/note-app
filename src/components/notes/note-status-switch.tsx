import { updateNoteStatus } from '@/actions/note'
import { useCookieUser } from '@/providers/cookie-provider'
import { Square, SquareCheck } from 'lucide-react'
import React, { useTransition } from 'react'

type Props = {
    status: "open" | "completed"
    id: string
}

export default function NoteStatusSwitch({ id, status }: Props) {
    const [isPending, startTransition] = useTransition()
    const { user } = useCookieUser()

    const handleStatusChange = (newStatus: "open" | "completed") => {
        startTransition(async () => {
            if (!user?.id) return
            await updateNoteStatus({
                UserId: user.id,
                id: id,
                status: newStatus,
            })
        })
    }

  return (
    <div className='col-span-1 flex justify-center items-center'>
        <button onClick={() => handleStatusChange(status === "open" ? "completed" : "open")} disabled={isPending}>
            {status === "completed" ? <SquareCheck className='size-6 flex-shrink-0 cursor-pointer ' /> : <Square className='size-6 flex-shrink-0 cursor-pointer' />}
        </button>
    </div>
    
  )
}