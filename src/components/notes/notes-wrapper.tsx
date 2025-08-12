"use client";

import dynamic from "next/dynamic";

const NotesContainer = dynamic(() => import("./notes-container"), {
  ssr: false,
});

type Props = { notes?: Note[] };

export default function NotesWrapper({ notes = [] }: Props) {
  return <NotesContainer notes={notes} />;
}
