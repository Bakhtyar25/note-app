"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react'
import NoteCard from './note-card'
import { createSwapy } from 'swapy'
import Cookies from 'js-cookie'
import { updateNote } from '@/actions/note'

type Props = { notes: Note[] }

export default function NoteListView({ notes }: Props) {
  const [items, setItems] = useState<Note[]>(notes)
  const itemsRef = useRef<Note[]>(notes)
  const refs = {
    openUrgent: useRef<HTMLDivElement | null>(null),
    openHigh: useRef<HTMLDivElement | null>(null),
    openLow: useRef<HTMLDivElement | null>(null),
    doneUrgent: useRef<HTMLDivElement | null>(null),
    doneHigh: useRef<HTMLDivElement | null>(null),
    doneLow: useRef<HTMLDivElement | null>(null),
  }

  useEffect(() => {
    itemsRef.current = notes
    setItems(notes)
  }, [notes])

  const groups = useMemo(() => {
    const openUrgent = items.filter(n => n.status === 'open' && n.priority === 'urgent').sort((a,b)=>a.order-b.order)
    const openHigh = items.filter(n => n.status === 'open' && n.priority === 'high').sort((a,b)=>a.order-b.order)
    const openLow = items.filter(n => n.status === 'open' && n.priority === 'low').sort((a,b)=>a.order-b.order)
    const doneUrgent = items.filter(n => n.status === 'completed' && n.priority === 'urgent').sort((a,b)=>a.order-b.order)
    const doneHigh = items.filter(n => n.status === 'completed' && n.priority === 'high').sort((a,b)=>a.order-b.order)
    const doneLow = items.filter(n => n.status === 'completed' && n.priority === 'low').sort((a,b)=>a.order-b.order)
    return { openUrgent, openHigh, openLow, doneUrgent, doneHigh, doneLow }
  }, [items])

  useEffect(() => {
    type GroupKey = keyof typeof refs
    const init = (el: HTMLDivElement | null, predicate: (n: Note)=>boolean) => {
      if (!el) return null
      if (!el.querySelector('[data-swapy-slot]')) return null
      const sw = createSwapy(el, { animation: 'dynamic' })
      sw.onSwap(async () => {
        const slots = Array.from(el.querySelectorAll<HTMLElement>('[data-swapy-slot]'))
        const newOrder: Record<string, number> = {}
        slots.forEach((slot, index) => {
          const id = slot.dataset.swapySlot || ''
          if (id) newOrder[id] = index
        })
        // optimistic update for notes in this group
        setItems(prev => prev.map(n => (predicate(n) && newOrder[n.id] !== undefined) ? { ...n, order: newOrder[n.id]! } : n))

        const user = JSON.parse(Cookies.get('user') || '{}') as { id?: string }
        if (!user?.id) return
        const changed = itemsRef.current.filter(n => predicate(n) && newOrder[n.id] !== undefined && n.order !== newOrder[n.id])
        await Promise.all(changed.map(n => updateNote({
          UserId: user.id!,
          id: n.id,
          title: n.title,
          content: n.content,
          priority: n.priority,
          order: newOrder[n.id]!,
          status: n.status,
          date: Math.floor(n.date.getTime() / 1000),
        })))
        itemsRef.current = itemsRef.current.map(n => (predicate(n) && newOrder[n.id] !== undefined) ? { ...n, order: newOrder[n.id]! } : n)
      })
      return sw
    }

    const sw1 = init(refs.openUrgent.current, n => n.status==='open' && n.priority==='urgent')
    const sw2 = init(refs.openHigh.current, n => n.status==='open' && n.priority==='high')
    const sw3 = init(refs.openLow.current, n => n.status==='open' && n.priority==='low')
    const sw4 = init(refs.doneUrgent.current, n => n.status==='completed' && n.priority==='urgent')
    const sw5 = init(refs.doneHigh.current, n => n.status==='completed' && n.priority==='high')
    const sw6 = init(refs.doneLow.current, n => n.status==='completed' && n.priority==='low')

    return () => {
      sw1?.destroy(); sw2?.destroy(); sw3?.destroy(); sw4?.destroy(); sw5?.destroy(); sw6?.destroy();
    }
  }, [])

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 p-4 lg:p-16'>
      <div className='lg:mt-0 mt-6'>
        <ul className='w-fit mx-auto flex lg:flex-col items-start gap-4 lg:gap-2'>
          <li className='flex items-center gap-2'>
            <span className='bg-urgent w-3 h-3 rounded-full flex-shrink-0'>.</span>
            <p className='text-primary'>Urgent</p>
          </li>
          <li className='flex items-center gap-2'>
            <span className='bg-high w-3 h-3 rounded-full flex-shrink-0'>.</span>
            <p className='text-primary'>High</p>
          </li>
          <li className='flex items-center gap-2'>
            <span className='bg-low w-3 h-3 rounded-full flex-shrink-0'>.</span>
            <p className='text-primary'>Low</p>
          </li>
        </ul>
      </div>
      <div className=' col-span-1 md:col-span-4 lg:mt-6'>
        <div className='flex flex-col gap-4 w-full lg:w-3/5'>
          {/* Open groups first: urgent -> high -> low */}
          {groups.openUrgent.length > 0 && (
            <div ref={refs.openUrgent} className='flex flex-col gap-4'>
              {groups.openUrgent.map(n => (
                <div key={n.id} data-swapy-slot={n.id}>
                  <div data-swapy-item={n.id}>
                    <NoteCard id={n.id} title={n.title} content={n.content} createdAt={new Date(n.createdAt).toLocaleDateString()} priority={n.priority} status={n.status} date={n.date} />
                  </div>
                </div>
              ))}
            </div>
          )}
          {groups.openHigh.length > 0 && (
            <div ref={refs.openHigh} className='flex flex-col gap-4'>
              {groups.openHigh.map(n => (
                <div key={n.id} data-swapy-slot={n.id}>
                  <div data-swapy-item={n.id}>
                    <NoteCard id={n.id} title={n.title} content={n.content} createdAt={new Date(n.createdAt).toLocaleDateString()} priority={n.priority} status={n.status} date={n.date} />
                  </div>
                </div>
              ))}
            </div>
          )}
          {groups.openLow.length > 0 && (
            <div ref={refs.openLow} className='flex flex-col gap-4'>
              {groups.openLow.map(n => (
                <div key={n.id} data-swapy-slot={n.id}>
                  <div data-swapy-item={n.id}>
                    <NoteCard id={n.id} title={n.title} content={n.content} createdAt={new Date(n.createdAt).toLocaleDateString()} priority={n.priority} status={n.status} date={n.date} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Completed groups next: urgent -> high -> low */}
          {groups.doneUrgent.length + groups.doneHigh.length + groups.doneLow.length > 0 && (
            <div className='h-2' />
          )}
          {groups.doneUrgent.length > 0 && (
            <div ref={refs.doneUrgent} className='flex flex-col gap-4'>
              {groups.doneUrgent.map(n => (
                <div key={n.id} data-swapy-slot={n.id}>
                  <div data-swapy-item={n.id}>
                    <NoteCard id={n.id} title={n.title} content={n.content} createdAt={new Date(n.createdAt).toLocaleDateString()} priority={n.priority} status={n.status} date={n.date} />
                  </div>
                </div>
              ))}
            </div>
          )}
          {groups.doneHigh.length > 0 && (
            <div ref={refs.doneHigh} className='flex flex-col gap-4'>
              {groups.doneHigh.map(n => (
                <div key={n.id} data-swapy-slot={n.id}>
                  <div data-swapy-item={n.id}>
                    <NoteCard id={n.id} title={n.title} content={n.content} createdAt={new Date(n.createdAt).toLocaleDateString()} priority={n.priority} status={n.status} date={n.date} />
                  </div>
                </div>
              ))}
            </div>
          )}
          {groups.doneLow.length > 0 && (
            <div ref={refs.doneLow} className='flex flex-col gap-4'>
              {groups.doneLow.map(n => (
                <div key={n.id} data-swapy-slot={n.id}>
                  <div data-swapy-item={n.id}>
                    <NoteCard id={n.id} title={n.title} content={n.content} createdAt={new Date(n.createdAt).toLocaleDateString()} priority={n.priority} status={n.status} date={n.date} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}