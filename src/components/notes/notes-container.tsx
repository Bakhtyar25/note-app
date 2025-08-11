"use client"

import React from 'react'
import { useState } from 'react'
import NoteGridView from './note-grid-view'
import NoteListView from './note-list-view'
import NoteActions from './note-actions'
import FadeIn from '../custom/fadein'
import EmptyState from '../custom/empty-state'

type Props = { notes?: Note[] }

export default function NotesContainer({ notes = [] }: Props) {
    const [notesView, setNotesView] = useState<"grid" | "list">("grid")

    return (
        <section className='md:p-16 p-10'>
            <NoteActions notesView={notesView} setNotesView={setNotesView} />
            {notes.length > 0 && <FadeIn key={notesView}>
                {notesView === "grid" ? <NoteGridView notes={notes} /> : <NoteListView notes={notes} />}
            </FadeIn>}
            {notes.length === 0 && <EmptyState />}
        </section>
    )
}

