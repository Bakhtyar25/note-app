"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";

type AuthUser = { id?: string; email?: string; [key: string]: unknown } | null;

type CookieContextValue = {
  user: AuthUser;
  setUser: (u: AuthUser) => void;
  refreshFromCookie: () => void;
};

const CookieContext = createContext<CookieContextValue | undefined>(undefined);

export default function CookieProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);
  const pathname = usePathname();

  const refreshFromCookie = () => {
    try {
      const raw = Cookies.get("user");
      setUser(raw ? (JSON.parse(raw) as AuthUser) : null);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    refreshFromCookie();
  }, []);

  useEffect(() => {
    refreshFromCookie();
  }, [pathname]);

  const value = useMemo<CookieContextValue>(() => ({ 
    user, 
    setUser, 
    refreshFromCookie
  }), [user, refreshFromCookie]);

  return <CookieContext.Provider value={value}>{children}</CookieContext.Provider>;
}

export function useCookieUser(): CookieContextValue {
  const ctx = useContext(CookieContext);
  if (!ctx) throw new Error("useCookieUser must be used within CookieProvider");
  return ctx;
}