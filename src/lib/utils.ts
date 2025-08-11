import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Note: direct cookie reads moved to CookieProvider; avoid using this for auth.



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