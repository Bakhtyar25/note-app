import { cn } from '@/lib/utils'
import { Square, SquareCheck, X } from 'lucide-react'
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import DeleteNote from './delete-note'



export default function NoteCard({ id, title, content, createdAt, priority, status }: NoteCardProps) {


    const priorityColor = {
        urgent: "bg-urgent",
        high: "bg-high",
        low: "bg-low"
    }

    const priorityColorComplete = {
        urgent: "bg-urgent-foreground",
        high: "bg-high-foreground",
        low: "bg-low-foreground"
    }

    const priorityTextColor = {
        urgent: "text-urgent",
        high: "text-high",
        low: "text-low",
    }

    return (
        <div className={cn('note-card', status === "open" ? priorityColor[priority] : priorityColorComplete[priority])}>
            <Dialog>
                <div className='absolute top-1 right-1'>
                    <DialogTrigger asChild>
                        <X strokeWidth={3} className='cursor-pointer size-4 text-[#E5E5E5] flex-shrink-0' />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className='text-center mt-2 text-primary font-bold text-2xl'>
                                Delete This <span className={priorityTextColor[priority]}>Note</span>?
                            </DialogTitle>
                            <DialogDescription className='text-center text-primary w-2/3 mx-auto'>To be confirmed, it will not be possible 
                            restore the deleted note.</DialogDescription>
                        </DialogHeader>
                        <DeleteNote id={id} />
                    </DialogContent>
                </div>
            </Dialog>
            <div className='col-span-1 flex justify-center items-center'>
                {status === "completed" ? <SquareCheck className='size-6 flex-shrink-0' /> : <Square className='size-6 flex-shrink-0' />}
            </div>
            <div className='col-span-9 flex flex-col gap-2'>
                <div className='flex justify-between items-center'>
                    <p className={cn(' font-bold', status === "completed" && "line-through")}>{title}</p>
                    <p className={cn('font-bold', status === "completed" && "line-through")}>{createdAt}</p>
                </div>
                <p className={cn('', status === "completed" && "line-through")}>{content}</p>
            </div>
        </div>
    )
}