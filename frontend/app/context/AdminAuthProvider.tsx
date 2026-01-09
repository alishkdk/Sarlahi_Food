"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type AdminAuthContextType = {
  isAuthenticated: boolean;
  user?: { id: string; name: string; roles: string[] };
  signIn: (token: string) => void;
  signOut: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<any | undefined>(undefined);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      // For starter: decode or fetch user. We'll mock a user.
      setAuthenticated(true);
      setUser({ id: "admin-1", name: "Admin", roles: ["superadmin"] });
    }
  }, []);

  function signIn(token: string) {
    localStorage.setItem("admin_token", token);
    setAuthenticated(true);
    setUser({ id: "admin-1", name: "Admin", roles: ["superadmin"] });
  }

  function signOut() {
    localStorage.removeItem("admin_token");
    setAuthenticated(false);
    setUser(undefined);
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}