type NoteCardProps = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    priority: NotePriority;
    status: NoteStatus;
    date: Date;
}

type NotePriority = "urgent" | "high" | "low";
type NoteStatus = "open" | "completed";

type Note = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    priority: NotePriority;
    status: NoteStatus;
    order: number;
    date: Date;
    UserId: string;
}