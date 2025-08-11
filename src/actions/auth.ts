"use server";

import { authEndpoints } from "@/lib/endpoints";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const user = await authEndpoints.createUser({ email, password });
    (await cookies()).set("user", JSON.stringify(user));
    // notify client to update header state
    // no-op on server; client reads cookie on route change
    revalidatePath("/");
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function logOut() {
  (await cookies()).delete("user");
  redirect("/login");
}