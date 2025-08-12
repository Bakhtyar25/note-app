
import dynamic from "next/dynamic";
import { getNotes } from "@/actions/note";
import WelcomeToast from "@/components/custom/welcome-toast";
import ClientOnly from "@/components/custom/client-only";

const NotesContainer = dynamic(() => import("@/components/notes/notes-container"), {
  ssr: false,
});

export default async function Home() {
  const notes = await getNotes()
  return (
    <div className="container mx-auto">
      <ClientOnly>
        <WelcomeToast />
      </ClientOnly>
      <NotesContainer notes={notes} />
    </div>
  );
}
