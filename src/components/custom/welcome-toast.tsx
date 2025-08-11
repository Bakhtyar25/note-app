"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function WelcomeToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasShownToast = useRef(false);
  
  useEffect(() => {
    const welcome = searchParams.get("welcome");
    if (welcome === "true" && !hasShownToast.current) {
      hasShownToast.current = true;
      toast.success("Welcome back! You've been successfully logged in.");
      
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("welcome");
      router.replace(newUrl.pathname);
    }
  }, [searchParams, router]);
  
  return null;
}
