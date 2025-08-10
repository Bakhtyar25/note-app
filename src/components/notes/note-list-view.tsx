import React from 'react'
import NoteCard from './note-card'

type Props = {}

export default function NoteListView({ }: Props) {
    return (
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 p-16'>
            <div className=''>
                <ul className='w-fit mx-auto flex flex-col items-start gap-2'>
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
            <div className=' col-span-1 md:col-span-4 mt-6'>
                <div className='flex flex-col gap-4 w-3/5'>
                    <NoteCard id='1' title='Note 1' content='This is a note' createdAt={"01/12/2020"} priority='urgent' status='open' />
                    <NoteCard id='2' title='Note 2' content='This is a note' createdAt={"01/12/2020"} priority='urgent' status='open' />
                    <NoteCard id='3' title='Note 3' content='This is a note' createdAt={"01/12/2020"} priority='urgent' status='open' />
                    <NoteCard id='4' title='Note 4' content='This is a note' createdAt={"01/12/2020"} priority='urgent' status='completed' />
                    <NoteCard id='5' title='Note 5' content='This is a note' createdAt={"01/12/2020"} priority='high' status='open' />
                    <NoteCard id='6' title='Note 6' content='This is a note' createdAt={"01/12/2020"} priority='high' status='open' />
                    <NoteCard id='7' title='Note 7' content='This is a note' createdAt={"01/12/2020"} priority='high' status='completed' />
                    <NoteCard id='8' title='Note 8' content='This is a note' createdAt={"01/12/2020"} priority='low' status='open' />
                    <NoteCard id='9' title='Note 9' content='This is a note' createdAt={"01/12/2020"} priority='low' status='open' />
                    <NoteCard id='10' title='Note 10' content='This is a note' createdAt={"01/12/2020"} priority='low' status='completed' />
                </div>
            </div>
        </section>
    )
}