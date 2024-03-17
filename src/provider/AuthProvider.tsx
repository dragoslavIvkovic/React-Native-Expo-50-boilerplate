import React, { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { supabase } from 'src/initSupabase'

type User = {
  id: string
  email: string
  // Include other relevant user properties here
}

type AuthContextType = {
  auth: boolean
  user: User | null
  login: (email: string, password: string) => Promise<{ error?: Error }>
  signOut: () => Promise<{ error?: Error }>
  passwordReset: (email: string) => Promise<{ error?: Error }>
  updatePassword: (updatedPassword: string) => Promise<{ error?: Error }>
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
      const { data: sessionData, error } = await supabase.auth.getSession()

      if (error) {
        console.error('Error getting current session:', error.message)
        setLoading(false)
        return
      }

      if (sessionData.session && sessionData.session.user) {
        // Assuming Supabase's user object matches your User type
        setUser(sessionData.session.user as User) // Cast if you're confident in the shape or map properties as needed
        setAuth(true)
      } else {
        setUser(null)
        setAuth(false)
      }
      setLoading(false)
    }

    void init()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && session.user) {
        setUser(session.user as User) // Similarly, cast or map the user object
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

  const passwordReset = async (email: string) => {
    try {
      await supabase.auth.resetPasswordForEmail(email)
      // Ovde pretpostavljamo da imate navigation objekat dostupan ili ga prosleđujete kao prop.
    } catch (error) {
      console.error('Error sending password reset email:', error.message)
    }
  }

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
