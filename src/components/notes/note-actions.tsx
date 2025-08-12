"use client"

import React from 'react'
import NotesViewSwitcher from './notes-view-switcher'
import AddNote from './add-note'
import { useCookieUser } from '@/providers/cookie-provider'

type Props = {
    notesView: "grid" | "list"
    setNotesView: (view: "grid" | "list") => void
}


export default function NoteActions({ notesView, setNotesView }: Props) {
    const { user } = useCookieUser()

    return (
        <div className='flex items-center gap-2'>
            <AddNote UserId={user?.id ?? ""} />
            <NotesViewSwitcher notesView={notesView} setNotesView={setNotesView} />
        </div>
    )
}