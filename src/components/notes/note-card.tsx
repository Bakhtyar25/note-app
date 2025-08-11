import { cn } from '@/lib/utils'
import { SquarePen, X } from 'lucide-react'
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import DeleteNote from './delete-note'
import NoteStatusSwitch from './note-status-switch'
import AddNoteForm from './add-note-form'
import ReadMore from '../custom/read-more'



export default function NoteCard({ id, title, content, priority, status, date }: NoteCardProps) {

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
        <div className={cn('note-card group cursor-pointer', status === "open" ? priorityColor[priority] : priorityColorComplete[priority])}>
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
            <Dialog>
                <div className='absolute top-1 left-1 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100'>
                    <DialogTrigger asChild>
                        <SquarePen strokeWidth={3} className='cursor-pointer size-4 text-[#E5E5E5] flex-shrink-0' />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className='text-center mt-2 text-primary font-bold text-2xl'>
                                Update <span className={priorityTextColor[priority]}>Note</span>?
                            </DialogTitle>
                            <DialogDescription className='text-center text-primary w-2/3 mx-auto'>Update the note details</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <AddNoteForm id={id} update title={title} content={content} date={date} priority={priority} />
                        </div>
                    </DialogContent>
                </div>
            </Dialog>
            <NoteStatusSwitch status={status} id={id} />
            <div className='col-span-9 flex flex-col gap-2'>
                <div className='flex justify-between items-center'>
                    <p className={cn(' font-bold whitespace-pre-wrap break-words', status === "completed" && "line-through")}>{title}</p>
                    <p className={cn('font-bold', status === "completed" && "line-through")}>{date.toLocaleDateString()}</p>
                </div>
                <ReadMore
                    text={content}
                    className={cn('whitespace-pre-wrap break-words', status === "completed" && "line-through")}
                    maxLines={3}
                />
            </div>
        </div>
    )
}