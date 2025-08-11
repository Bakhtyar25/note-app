
import NotesContainer from "@/components/notes/notes-container";
import { getNotes } from "@/actions/note";


export default async function Home() {
  const notes = await getNotes()
  return (
    <div className="container mx-auto">
      <NotesContainer notes={notes} />
    </div>
  );
}
