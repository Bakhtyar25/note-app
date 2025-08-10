import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Cookies from "js-cookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getCookie(name: string) {
  if (typeof window === "undefined") {
    // Read a cookie server-side
    return require("next/headers").cookies().get(name)?.value;
  }

  // Read a cookie client-side
  return Cookies?.get(name);
}