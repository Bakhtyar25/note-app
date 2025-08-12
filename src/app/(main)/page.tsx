
import { getNotes } from "@/actions/note";
import WelcomeToast from "@/components/custom/welcome-toast";
import NotesContainer from "@/components/notes/notes-container";

export default async function Home() {
  const notes = await getNotes()
  return (
    <div className="container mx-auto">
      <WelcomeToast />
      <NotesContainer notes={notes} />
    </div>
  );
}
