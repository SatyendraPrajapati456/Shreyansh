// hooks/useAuth.ts
"use client"

import { useEffect, useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/firebase/config";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signup = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const googleLogin = () =>
    signInWithPopup(auth, provider);

  const logout = () => signOut(auth);

  return { user, loading, signup, login, googleLogin, logout };
}
