"use server";

import { authEndpoints } from "@/lib/endpoints";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// Define the user interface based on what we expect from the API
interface ApiUser {
  id: string;
  email: string;
  password: string;
  // Add other properties as needed
}

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
    revalidatePath("/");
    return user;
  } catch (error) {
  }
}

export async function logOut() {
  (await cookies()).delete("user");
  revalidatePath("/");
  return { success: true };
}

export async function login({ email, password }: { email: string; password: string }) {
  try {
    const users = await authEndpoints.login({ email, password });
    
    if (!Array.isArray(users) || users.length === 0) {
      return { error: "Invalid email or password" } as const;
    }
    
    const user = users.find(
      (u: ApiUser) => String(u?.email).toLowerCase() === email.toLowerCase() && String(u?.password) === password
    );
    
    if (!user) {
      return { error: "Invalid email or password" } as const;
    }
    
    // Set cookie and revalidate
    (await cookies()).set("user", JSON.stringify(user));
    revalidatePath("/");
    
    // Return success instead of redirecting here
    return { success: true, user } as const;
    
  } catch (error) {
    return { error: "Invalid email or password" } as const;
  }
}