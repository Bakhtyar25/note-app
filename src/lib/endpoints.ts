import api from "@/lib/api";

export const noteEndpoints = {
  notes: async (params: { UserId: string }) =>
    (await api.get(`/Users/${params.UserId}/Notes`))?.data,
  status: async (params: {
    UserId: string;
    id: string;
    status: "open" | "completed";
  }) =>
    (
      await api.put(`/Users/${params.UserId}/Notes/${params.id}`, {
        status: params.status,
      })
    )?.data,
  create: async (params: {
    title: string;
    content: string;
    priority: "urgent" | "high" | "low";
    order: number;
    status: "open" | "completed";
    date: number; // unix seconds
    UserId: string;
  }) =>
    (
      await api.post(`/Users/${params.UserId}/Notes`, {
        title: params.title,
        content: params.content,
        priority: params.priority,
        order: params.order,
        status: params.status,
        date: params.date,
      })
    )?.data?.data,
  update: async (params: {
    UserId: string;
    id: string;
    title: string;
    content: string;
    priority: "urgent" | "high" | "low";
    order: number;
    status?: "open" | "completed";
    date: number; // unix seconds
  }) =>
    (
      await api.put(
        `/Users/${params.UserId}/Notes/${params.id}`,
        {
          title: params.title,
          content: params.content,
          priority: params.priority,
          order: params.order,
          // Only include status if provided to avoid flipping completed -> open unintentionally
          ...(params.status ? { status: params.status } : {}),
          date: params.date,
        }
      )
    )?.data,
  delete: async (params: { UserId: string; id: string }) =>
    (
      await api.delete(
        `/Users/${params.UserId}/Notes/${params.id}`
      )
    )?.data,
};

export const authEndpoints = {
  createUser: async (params: { email: string; password: string }) =>
    (await api.post("/Users", params))?.data,
};
