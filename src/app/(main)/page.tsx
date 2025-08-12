
import { getNotes } from "@/actions/note";
import WelcomeToast from "@/components/custom/welcome-toast";
import NotesContainer from "@/components/notes/notes-container";
import HydrationGuard from "@/components/custom/hydration-guard";

export default async function Home() {
  const notes = await getNotes()
  return (
    <div className="container mx-auto">
      <HydrationGuard>
        <WelcomeToast />
      </HydrationGuard>
      <HydrationGuard>
        <NotesContainer notes={notes} />
      </HydrationGuard>
    </div>
  );
}
