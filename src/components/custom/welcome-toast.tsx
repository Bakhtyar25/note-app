"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function WelcomeToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasShownToast = useRef(false);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    if (!isMounted) return;
    
    const welcome = searchParams.get("welcome");
    if (welcome === "true" && !hasShownToast.current) {
      hasShownToast.current = true;
      toast.success("Welcome back! You've been successfully logged in.");
      
      // Use router.replace instead of window.location to prevent hydration issues
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("welcome");
      router.replace(newUrl.pathname);
    }
  }, [searchParams, router, isMounted]);
  
  // Don't render anything until mounted to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }
  
  return null;
}
