import React from 'react'
import NoteCard from './note-card'

type Props = {}

export default function NoteGridView({}: Props) {
    return (
        <section>
            <div className='grid grid-cols-3 gap-4 mt-16'>
                <div className='md:border-r-[3px] md:border-dashed md:border-neutral-300 md:pr-8'>
                    <h2 className='text-center font-bold text-urgent'>Urgent</h2>
                    <div className='flex flex-col gap-6 mt-6'>
                        <NoteCard id='1' title='Note 1' content='This is a note' createdAt={"01/12/2020"} priority='urgent' status='open' />
                        <NoteCard id='2' title='Note 2' content='This is a note' createdAt={"01/12/2020"} priority='urgent' status='open' />
                        <NoteCard id='3' title='Note 3' content='This is a note' createdAt={"01/12/2020"} priority='urgent' status='open' />
                        <NoteCard id='4' title='Note 4' content='This is a note' createdAt={"01/12/2020"} priority='urgent' status='completed' />
                    </div>
                </div>
                <div className='px-4'>
                    <h2 className='text-center font-bold text-high'>High</h2>
                    <div className='flex flex-col gap-6 mt-6'>
                        <NoteCard id='5' title='Note 5' content='This is a note' createdAt={"01/12/2020"} priority='high' status='open' />
                        <NoteCard id='6' title='Note 6' content='This is a note' createdAt={"01/12/2020"} priority='high' status='open' />
                        <NoteCard id='7' title='Note 7' content='This is a note' createdAt={"01/12/2020"} priority='high' status='completed' />
                    </div>
                </div>
                <div className='md:border-l-[3px] md:border-dashed md:border-neutral-300 md:pl-8'>
                    <h2 className='text-center font-bold text-low'>Low</h2>
                    <div className='flex flex-col gap-6 mt-6'>
                        <NoteCard id='8' title='Note 8' content='This is a note' createdAt={"01/12/2020"} priority='low' status='open' />
                        <NoteCard id='9' title='Note 9' content='This is a note' createdAt={"01/12/2020"} priority='low' status='open' />
                        <NoteCard id='10' title='Note 10' content='This is a note' createdAt={"01/12/2020"} priority='low' status='completed' />
                    </div>
                </div>
            </div>
        </section>
    )
}