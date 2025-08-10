type NoteCardProps = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    priority: NotePriority;
    status: NoteStatus;
}

type NotePriority = "urgent" | "high" | "low";
type NoteStatus = "open" | "completed";