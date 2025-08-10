import { cn } from '@/lib/utils'
import { LayoutList } from 'lucide-react'
import React from 'react'

type Props = {
    notesView: "grid" | "list"
    setNotesView: (view: "grid" | "list") => void
}

export default function NotesViewSwitcher({ notesView, setNotesView }: Props) {
    const btnClass = (view: "grid" | "list") => {
        return cn("h-full px-2 flex items-center gap-1 cursor-pointer transition-all duration-300 bg-transparent text-border", notesView === view && "bg-border/25 text-primary")
    }

    return (
        <div className='flex rounded-full border-2 border-border w-fit divide-x-2 divide-border overflow-hidden h-9'>
            <button className={btnClass("list")} onClick={() => setNotesView("list")}><LayoutList className='size-5' /></button>
            <button className={btnClass("grid")} onClick={() => setNotesView("grid")}><LayoutList className='size-5' /><LayoutList className='size-5' /></button>
        </div>
    )
}