import React from 'react'
import NotesViewSwitcher from './notes-view-switcher'
import AddNote from './add-note'

type Props = {
    notesView: "grid" | "list"
    setNotesView: (view: "grid" | "list") => void
}

export default function NoteActions({ notesView, setNotesView }: Props) {
    return (
        <div className='flex items-center gap-2'>
            <AddNote />
            <NotesViewSwitcher notesView={notesView} setNotesView={setNotesView} />
        </div>
    )
}