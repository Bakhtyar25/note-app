"use client"

import React from 'react'
import { useState } from 'react'
import NotesViewSwitcher from './notes-view-switcher'
import NoteGridView from './note-grid-view'
import NoteListView from './note-list-view'
import NoteActions from './note-actions'
import FadeIn from '../custom/fadein'
import EmptyState from '../custom/empty-state'

type Props = {}

export default function NotesContainer({ }: Props) {
    const [notesView, setNotesView] = useState<"grid" | "list">("grid")

    return (
        <section className='md:p-16 p-10'>
            <NoteActions notesView={notesView} setNotesView={setNotesView} />
            <FadeIn key={notesView}>
                {notesView === "grid" ? <NoteGridView /> : <NoteListView />}
            </FadeIn>
            {/* <EmptyState /> */}
        </section>
    )
}

