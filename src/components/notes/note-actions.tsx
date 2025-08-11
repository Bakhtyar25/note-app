import React, { useEffect, useState } from 'react'
import NotesViewSwitcher from './notes-view-switcher'
import AddNote from './add-note'
import Cookies from 'js-cookie'

type Props = {
    notesView: "grid" | "list"
    setNotesView: (view: "grid" | "list") => void
}


export default function NoteActions({ notesView, setNotesView }: Props) {
    const [user, setUser] = useState<{ id?: string } | null>(null)

    useEffect(() => {
        const u = JSON.parse(Cookies.get("user") || "{}") as { id?: string }
        setUser(u)
    }, [])


    return (
        <div className='flex items-center gap-2'>
            <AddNote UserId={user?.id ?? ""} />
            <NotesViewSwitcher notesView={notesView} setNotesView={setNotesView} />
        </div>
    )
}