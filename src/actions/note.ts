"use server";

import { noteEndpoints } from "@/lib/endpoints";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

function normalizePriority(input: unknown): NotePriority {
  const s = String(input || "").toLowerCase();
  if (s.includes("urgent")) return "urgent";
  if (s.includes("high")) return "high";
  if (s.includes("low")) return "low";
  return "low";
}

function normalizeStatus(input: unknown): NoteStatus {
  const s = String(input || "").toLowerCase();
  if (s.includes("open")) return "open";
  if (s.includes("completed")) return "completed";
  return "open";
}

function normalizeNote(raw: unknown): Note | null {
  try {
    const r = raw as Record<string, unknown>;
    return {
      id: String(r.id ?? ""),
      title: String(r.title ?? ""),
      content: String(r.content ?? ""),
      createdAt: String(r.createdAt ?? new Date().toISOString()),
      priority: normalizePriority(r.priority),
      status: normalizeStatus(r.status),
      order: Number.isFinite(Number(r.order)) ? Number(r.order) : 0,
      date: Number.isFinite(Number(r.date))
        ? new Date(Number(r.date) * 1000)
        : new Date(),
      UserId: String(r.UserId ?? ""),
    };
  } catch {
    return null;
  }
}

export async function getNotes() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;
  if (!userCookie) return [];
  const user = JSON.parse(userCookie || "{}");
  if (!user?.id) return [];
  try {
    const apiNotes = await noteEndpoints.notes({
      UserId: user.id,
    });
    const normalized = (Array.isArray(apiNotes) ? apiNotes : [])
      .map(normalizeNote)
      .filter((n): n is Note => !!n);
    return normalized;
  } catch (error) {
    console.log(error);
  }
}

export async function createNote({
  UserId,
  title,
  content,
  priority,
  order,
  status,
  date,
}: {
  UserId: string;
  title: string;
  content: string;
  priority: "urgent" | "high" | "low";
  order: number;
  status: "open" | "completed";
  date: number; // unix seconds
}) {
  try {
    const note = await noteEndpoints.create({
      UserId,
      title,
      content,
      priority,
      order,
      status,
      date,
    });
    revalidatePath("/");

    return note;
  } catch (error) {
    console.log(error);
  }
}

export async function updateNote({
  UserId,
  id,
  title,
  content,
  priority,
  order,
  status,
  date,
}: {
  UserId: string;
  id: string;
  title: string;
  content: string;
  priority: "urgent" | "high" | "low";
  order: number;
  status?: "open" | "completed";
  date: number; // unix seconds
}) {
  try {
    const note = await noteEndpoints.update({
      UserId,
      id,
      title,
      content,
      priority,
      order,
      status,
      date,
    });
    revalidatePath("/");
    return note;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteNote({
  id,
  UserId,
}: {
  id: string;
  UserId: string;
}) {
  try {
    const note = await noteEndpoints.delete({
      UserId: UserId,
      id: id,
    });
    revalidatePath("/");
    return note;
  } catch (error) {
    console.log(error);
  }
}

export async function updateNoteStatus({
  UserId,
  id,
  status,
}: {
  UserId: string;
  id: string;
  status: "open" | "completed";
}) {
  try {
    const note = await noteEndpoints.status({
      UserId,
      id,
      status,
    });
    revalidatePath("/");
    return note;
  } catch (error: unknown) {
    console.log((error as { response?: unknown })?.response);
  }
}
