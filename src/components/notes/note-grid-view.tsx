"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react'
import NoteCard from './note-card'
import { groupNotesForGrid } from '@/lib/notes'
import { createSwapy } from 'swapy'
import Cookies from 'js-cookie'
import { updateNote } from '@/actions/note'

type Props = { notes: Note[] }

export default function NoteGridView({ notes }: Props) {
  const [items, setItems] = useState<Note[]>(notes)
  const itemsRef = useRef<Note[]>(notes)
  const urgentRef = useRef<HTMLDivElement | null>(null)
  const highRef = useRef<HTMLDivElement | null>(null)
  const lowRef = useRef<HTMLDivElement | null>(null)

  // Keep itemsRef in sync
  useEffect(() => {
    itemsRef.current = notes
    setItems(notes)
  }, [notes])

  // Group by priority for rendering
  const groups = useMemo(() => groupNotesForGrid(items), [items])

  // Initialize a Swapy instance for each column (within-column DnD only)
  useEffect(() => {
    const initColumn = (el: HTMLDivElement | null, pr: NotePriority) => {
      if (!el) return null
      const hasSlots = el.querySelector('[data-swapy-slot]')
      if (!hasSlots) return null
      const sw = createSwapy(el, { animation: 'dynamic' })
      sw.onSwap(async () => {
        // Compute new order from this column only
        const slots = Array.from(el.querySelectorAll<HTMLElement>('[data-swapy-slot]'))
        const newPositions: Record<string, number> = {}
        slots.forEach((slot, index) => {
          const id = slot.dataset.swapySlot || ''
          if (id) newPositions[id] = index
        })

        // Optimistic local update for notes in this priority only
        setItems(prev =>
          prev.map(n =>
            n.priority === pr && newPositions[n.id] !== undefined
              ? { ...n, order: newPositions[n.id]! }
              : n
          )
        )

        // Persist changes
        const user = JSON.parse(Cookies.get('user') || '{}') as { id?: string }
        if (!user?.id) return
        const changed = itemsRef.current.filter(
          n => n.priority === pr && newPositions[n.id] !== undefined && n.order !== newPositions[n.id]
        )
        await Promise.all(
          changed.map(n =>
            updateNote({
              UserId: user.id!,
              id: n.id,
              title: n.title,
              content: n.content,
              priority: pr,
              order: newPositions[n.id]!,
              status: n.status,
              date: Math.floor(n.date.getTime() / 1000),
            })
          )
        )
        // sync ref
        itemsRef.current = itemsRef.current.map(n =>
          n.priority === pr && newPositions[n.id] !== undefined
            ? { ...n, order: newPositions[n.id]! }
            : n
        )
      })
      return sw
    }

    const swUrgent = initColumn(urgentRef.current, 'urgent')
    const swHigh = initColumn(highRef.current, 'high')
    const swLow = initColumn(lowRef.current, 'low')

    return () => {
      swUrgent?.destroy()
      swHigh?.destroy()
      swLow?.destroy()
    }
  }, [])

  return (
    <section>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-16'>
        <div className='md:border-r-[3px] md:border-dashed md:border-neutral-300 md:pr-8'>
          <h2 className='text-center font-bold text-urgent'>Urgent</h2>
          <div ref={urgentRef} className='flex flex-col gap-6 mt-6'>
            {groups.urgent.map(n => (
              <div key={n.id} data-swapy-slot={n.id}>
                <div data-swapy-item={n.id}>
                  <NoteCard id={n.id} title={n.title} content={n.content} priority={n.priority} status={n.status} date={n.date} createdAt={new Date(n.createdAt).toLocaleDateString()} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='lg:px-4'>
          <h2 className='text-center font-bold text-high'>High</h2>
          <div ref={highRef} className='flex flex-col gap-6 mt-6'>
            {groups.high.map(n => (
              <div key={n.id} data-swapy-slot={n.id}>
                <div data-swapy-item={n.id}>
                  <NoteCard id={n.id} title={n.title} content={n.content} priority={n.priority} status={n.status} date={n.date} createdAt={new Date(n.createdAt).toLocaleDateString()} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='md:border-l-[3px] md:border-dashed md:border-neutral-300 md:pl-8'>
          <h2 className='text-center font-bold text-low'>Low</h2>
          <div ref={lowRef} className='flex flex-col gap-6 mt-6'>
            {groups.low.map(n => (
              <div key={n.id} data-swapy-slot={n.id}>
                <div data-swapy-item={n.id}>
                  <NoteCard id={n.id} title={n.title} content={n.content} priority={n.priority} status={n.status} date={n.date} createdAt={new Date(n.createdAt).toLocaleDateString()} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}