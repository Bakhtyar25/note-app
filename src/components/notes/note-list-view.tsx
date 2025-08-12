"use client";

import React, { useEffect, useMemo, useState } from 'react';
import NoteCard from './note-card';
import { useDragAndDrop } from '@/hooks/use-drag-and-drop';

type Props = { notes: Note[] };

export default function NoteListView({ notes }: Props) {
  const [items, setItems] = useState(notes);

  // Refs for each group
  const refs = {
    openUrgent: React.useRef<HTMLDivElement>(null),
    openHigh: React.useRef<HTMLDivElement>(null),
    openLow: React.useRef<HTMLDivElement>(null),
    doneUrgent: React.useRef<HTMLDivElement>(null),
    doneHigh: React.useRef<HTMLDivElement>(null),
    doneLow: React.useRef<HTMLDivElement>(null),
  };

  // Predicates for each group
  const predicates = {
    openUrgent: (n: Note) => n.status === 'open' && n.priority === 'urgent',
    openHigh: (n: Note) => n.status === 'open' && n.priority === 'high',
    openLow: (n: Note) => n.status === 'open' && n.priority === 'low',
    doneUrgent: (n: Note) => n.status === 'completed' && n.priority === 'urgent',
    doneHigh: (n: Note) => n.status === 'completed' && n.priority === 'high',
    doneLow: (n: Note) => n.status === 'completed' && n.priority === 'low',
  };

  // Use the custom hook for drag and drop
  useDragAndDrop({ items, setItems, refs, predicates });

  // Keep items in sync with props
  useEffect(() => {
    setItems(notes);
  }, [notes]);

  // Group notes by status and priority
  const groups = useMemo(() => {
    const openUrgent = items.filter(n => n.status === 'open' && n.priority === 'urgent').sort((a,b) => a.order - b.order);
    const doneUrgent = items.filter(n => n.status === 'completed' && n.priority === 'urgent').sort((a,b) => a.order - b.order);
    const openHigh = items.filter(n => n.status === 'open' && n.priority === 'high').sort((a,b) => a.order - b.order);
    const doneHigh = items.filter(n => n.status === 'completed' && n.priority === 'high').sort((a,b) => a.order - b.order);
    const openLow = items.filter(n => n.status === 'open' && n.priority === 'low').sort((a,b) => a.order - b.order);
    const doneLow = items.filter(n => n.status === 'completed' && n.priority === 'low').sort((a,b) => a.order - b.order);
    return { openUrgent, doneUrgent, openHigh, doneHigh, openLow, doneLow };
  }, [items]);

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 p-4 lg:p-16'>
      {/* Priority Legend */}
      <div className='lg:mt-0 mt-6'>
        <ul className='w-fit mx-auto flex lg:flex-col items-start gap-4 lg:gap-2'>
          <li className='flex items-center gap-2'>
            <span className='bg-urgent w-3 h-3 rounded-full flex-shrink-0'></span>
            <p className='text-primary'>Urgent</p>
          </li>
          <li className='flex items-center gap-2'>
            <span className='bg-high w-3 h-3 rounded-full flex-shrink-0'></span>
            <p className='text-primary'>High</p>
          </li>
          <li className='flex items-center gap-2'>
            <span className='bg-low w-3 h-3 rounded-full flex-shrink-0'></span>
            <p className='text-primary'>Low</p>
          </li>
        </ul>
      </div>

      {/* Notes Container */}
      <div className='col-span-1 md:col-span-4 lg:mt-6'>
        <div className='flex flex-col gap-4 w-full lg:w-3/5'>
          {/* Urgent Priority Groups */}
          {groups.openUrgent.length > 0 && (
            <div ref={refs.openUrgent} className='flex flex-col gap-4'>
              {groups.openUrgent.map((n, index) => (
                <div key={`urgent-open-${n.id}`} data-swapy-slot={`urgent-open-${n.id}`}>
                  <div data-swapy-item={`urgent-open-${n.id}`}>
                    <NoteCard 
                      id={n.id} 
                      title={n.title} 
                      content={n.content} 
                      createdAt={new Date(n.createdAt).toLocaleDateString()} 
                      priority={n.priority} 
                      status={n.status} 
                      date={n.date} 
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {groups.doneUrgent.length > 0 && (
            <div ref={refs.doneUrgent} className='flex flex-col gap-4'>
              {groups.doneUrgent.map((n, index) => (
                <div key={`urgent-done-${n.id}`} data-swapy-slot={`urgent-done-${n.id}`}>
                  <div data-swapy-item={`urgent-done-${n.id}`}>
                    <NoteCard 
                      id={n.id} 
                      title={n.title} 
                      content={n.content} 
                      createdAt={new Date(n.createdAt).toLocaleDateString()} 
                      priority={n.priority} 
                      status={n.status} 
                      date={n.date} 
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* High Priority Groups */}
          {groups.openHigh.length > 0 && (
            <div ref={refs.openHigh} className='flex flex-col gap-4'>
              {groups.openHigh.map((n, index) => (
                <div key={`high-open-${n.id}`} data-swapy-slot={`high-open-${n.id}`}>
                  <div data-swapy-item={`high-open-${n.id}`}>
                    <NoteCard 
                      id={n.id} 
                      title={n.title} 
                      content={n.content} 
                      createdAt={new Date(n.createdAt).toLocaleDateString()} 
                      priority={n.priority} 
                      status={n.status} 
                      date={n.date} 
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {groups.doneHigh.length > 0 && (
            <div ref={refs.doneHigh} className='flex flex-col gap-4'>
              {groups.doneHigh.map((n, index) => (
                <div key={`high-done-${n.id}`} data-swapy-slot={`high-done-${n.id}`}>
                  <div data-swapy-item={`high-done-${n.id}`}>
                    <NoteCard 
                      id={n.id} 
                      title={n.title} 
                      content={n.content} 
                      createdAt={new Date(n.createdAt).toLocaleDateString()} 
                      priority={n.priority} 
                      status={n.status} 
                      date={n.date} 
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Low Priority Groups */}
          {groups.openLow.length > 0 && (
            <div ref={refs.openLow} className='flex flex-col gap-4'>
              {groups.openLow.map((n, index) => (
                <div key={`low-open-${n.id}`} data-swapy-slot={`low-open-${n.id}`}>
                  <div data-swapy-item={`low-open-${n.id}`}>
                    <NoteCard 
                      id={n.id} 
                      title={n.title} 
                      content={n.content} 
                      createdAt={new Date(n.createdAt).toLocaleDateString()} 
                      priority={n.priority} 
                      status={n.status} 
                      date={n.date} 
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {groups.doneLow.length > 0 && (
            <div ref={refs.doneLow} className='flex flex-col gap-4'>
              {groups.doneLow.map((n, index) => (
                <div key={`low-done-${n.id}`} data-swapy-slot={`low-done-${n.id}`}>
                  <div data-swapy-item={`low-done-${n.id}`}>
                    <NoteCard 
                      id={n.id} 
                      title={n.title} 
                      content={n.content} 
                      createdAt={new Date(n.createdAt).toLocaleDateString()} 
                      priority={n.priority} 
                      status={n.status} 
                      date={n.date} 
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}