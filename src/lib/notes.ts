export function groupNotesForGrid(notes: Note[]) {
  const byPriority: Record<NotePriority, Note[]> = { urgent: [], high: [], low: [] }
  for (const note of notes) {
    if (byPriority[note.priority]) byPriority[note.priority].push(note)
  }
  const sortByStatusThenOrder = (a: Note, b: Note) => {
    if (a.status !== b.status) return a.status === "open" ? -1 : 1
    return a.order - b.order
  }
  return {
    urgent: byPriority.urgent.sort(sortByStatusThenOrder),
    high: byPriority.high.sort(sortByStatusThenOrder),
    low: byPriority.low.sort(sortByStatusThenOrder),
  }
}

export function orderNotesForList(notes: Note[]) {
  const priorityRank: Record<NotePriority, number> = { urgent: 0, high: 1, low: 2 }
  return [...notes].sort((a, b) => {
    if (a.status !== b.status) return a.status === "open" ? -1 : 1
    if (a.status === "open") {
      const pr = priorityRank[a.priority] - priorityRank[b.priority]
      if (pr !== 0) return pr
    }
    return a.order - b.order
  })
}


