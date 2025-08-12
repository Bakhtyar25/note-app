
import { getNotes } from "@/actions/note";
import WelcomeToast from "@/components/custom/welcome-toast";
import ClientOnly from "@/components/custom/client-only";
import NotesWrapper from "@/components/notes/notes-wrapper";

export default async function Home() {
  const notes = await getNotes()
  return (
    <div className="container mx-auto">
      <ClientOnly>
        <WelcomeToast />
      </ClientOnly>
      <NotesWrapper notes={notes} />
    </div>
  );
}
