"use client"

import React, { useState, useEffect } from 'react'
import NoteGridView from './note-grid-view'
import NoteListView from './note-list-view'
import NoteActions from './note-actions'
import FadeIn from '../custom/fadein'
import EmptyState from '../custom/empty-state'
import HydrationGuard from '../custom/hydration-guard'

type Props = { notes?: Note[] }

export default function NotesContainer({ notes = [] }: Props) {
    const [notesView, setNotesView] = useState<"grid" | "list">("grid")
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return (
            <section className='md:p-16 p-10'>
                <div className="min-h-[200px] flex items-center justify-center">
                    <div className="animate-pulse">Loading...</div>
                </div>
            </section>
        )
    }

    return (
        <section className='md:p-16 p-10'>
            <HydrationGuard>
                <NoteActions notesView={notesView} setNotesView={setNotesView} />
            </HydrationGuard>
            {notes.length > 0 && (
                <HydrationGuard>
                    <FadeIn key={notesView}>
                        {notesView === "grid" ? <NoteGridView notes={notes} /> : <NoteListView notes={notes} />}
                    </FadeIn>
                </HydrationGuard>
            )}
            {notes.length === 0 && (
                <HydrationGuard>
                    <EmptyState />
                </HydrationGuard>
            )}
        </section>
    )
}

