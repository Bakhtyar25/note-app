import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Cookies from "js-cookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getCookie(name: string) {
  if (typeof window === "undefined") {
    // Server usage should prefer next/headers directly. Return undefined here.
    return undefined;
  }

  // Read a cookie client-side
  return Cookies?.get(name);
}



export const DismissModal = () => {
  const dismiss = () => {
    // Radix Dialog listens for Escape to close; simulate it for a robust programmatic dismiss
    requestAnimationFrame(() => {
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true })
      );
    });
  };

  return { dismiss };
};