"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import NoteCard from './note-card';
import { groupNotesForGrid } from '@/lib/notes';
import { useDragAndDrop } from '@/hooks/use-drag-and-drop';

type Props = { notes: Note[] };

export default function NoteGridView({ notes }: Props) {
  const [items, setItems] = useState(notes);
  
  // Refs for each priority column
  const refs = {
    urgent: useRef<HTMLDivElement>(null),
    high: useRef<HTMLDivElement>(null),
    low: useRef<HTMLDivElement>(null),
  };

  // Predicates for each priority
  const predicates = {
    urgent: (n: Note) => n.priority === 'urgent',
    high: (n: Note) => n.priority === 'high',
    low: (n: Note) => n.priority === 'low',
  };

  // Use the custom hook for drag and drop
  useDragAndDrop({ items, setItems, refs, predicates });

  // Keep items in sync with props
  useEffect(() => {
    setItems(notes);
  }, [notes]);

  // Group notes by priority
  const groups = useMemo(() => groupNotesForGrid(items), [items]);

  return (
    <section>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-16'>
        {/* Urgent Column */}
        <div className='lg:border-r-[3px] lg:border-dashed lg:border-neutral-300 lg:pr-8'>
          <h2 className='text-center font-bold text-urgent'>Urgent</h2>
          <div ref={refs.urgent} className='flex flex-col gap-6 mt-6'>
            {groups.urgent.map(n => (
              <div key={n.id} data-swapy-slot={n.id}>
                <div data-swapy-item={n.id}>
                  <NoteCard 
                    id={n.id} 
                    title={n.title} 
                    content={n.content} 
                    priority={n.priority} 
                    status={n.status} 
                    date={n.date} 
                    createdAt={new Date(n.createdAt).toLocaleDateString()} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* High Column */}
        <div className='lg:px-4'>
          <h2 className='text-center font-bold text-high'>High</h2>
          <div ref={refs.high} className='flex flex-col gap-6 mt-6'>
            {groups.high.map(n => (
              <div key={n.id} data-swapy-slot={n.id}>
                <div data-swapy-item={n.id}>
                  <NoteCard 
                    id={n.id} 
                    title={n.title} 
                    content={n.content} 
                    priority={n.priority} 
                    status={n.status} 
                    date={n.date} 
                    createdAt={new Date(n.createdAt).toLocaleDateString()} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Column */}
        <div className='lg:border-l-[3px] lg:border-dashed lg:border-neutral-300 lg:pl-8'>
          <h2 className='text-center font-bold text-low'>Low</h2>
          <div ref={refs.low} className='flex flex-col gap-6 mt-6'>
            {groups.low.map(n => (
              <div key={n.id} data-swapy-slot={n.id}>
                <div data-swapy-item={n.id}>
                  <NoteCard 
                    id={n.id} 
                    title={n.title} 
                    content={n.content} 
                    priority={n.priority} 
                    status={n.status} 
                    date={n.date} 
                    createdAt={new Date(n.createdAt).toLocaleDateString()} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}