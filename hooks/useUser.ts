import { useEffect, useState } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "@/firebase/config" // Make sure this path matches your setup

export default function useUser() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  return user
}
