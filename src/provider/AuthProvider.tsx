import React, { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { supabase } from 'src/initSupabase';
 

type User = {
  manager_id(
    arg0: string,
    manager_id: any
  ): { data: any; error: any } | PromiseLike<{ data: any; error: any }>
  // Definicija vašeg User tipa
}

type AuthContextType = {
  auth: boolean
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  passwordReset: (email: string) => Promise<void>
  updatePassword: (updatedPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      const { data: sessionData } = await supabase.auth.getSession()

      if (sessionData.session) {
        setUser(sessionData.session.user)
        setAuth(true)
      } else {
        setUser(null)
        setAuth(false)
      }
      setLoading(false)
    }

    init()

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        setUser(session.user)
        setAuth(true)
      } else {
        setUser(null)
        setAuth(false)
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const login = (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password })

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const passwordReset = (email: string) =>
    supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/update-password'
    })

  const updatePassword = (updatedPassword: string) =>
    supabase.auth.updateUser({ password: updatedPassword })

  const authContextValue = useMemo(
    () => ({
      auth,
      user,
      login,
      signOut,
      passwordReset,
      updatePassword
    }),
    [auth, user]
  )

  return (
    <AuthContext.Provider value={authContextValue}>{!loading && children}</AuthContext.Provider>
  )
}

export default AuthProvider
