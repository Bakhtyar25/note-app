
import NotesContainer from "@/components/notes/notes-container";
import { getNotes } from "@/actions/note";
import WelcomeToast from "@/components/custom/welcome-toast";

export default async function Home() {
  const notes = await getNotes()
  return (
    <div className="container mx-auto">
      <WelcomeToast />
      <NotesContainer notes={notes} />
    </div>
  );
}
