import React, { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { supabase } from 'src/initSupabase' // Osiguraj da je putanja ispravna

type User = {
  id: string
  email: string
  // Dodaj ostale relevantne osobine korisnika ovde
}

type AuthContextType = {
  auth: boolean
  user: User | null
  login: (email: string, password: string) => Promise<{ error?: Error }>
  signOut: () => Promise<{ error?: Error }>
  passwordReset: (email: string) => Promise<{ error?: Error }>
  updatePassword: (updatedPassword: string) => Promise<{ error?: Error }>
  accessToken: string | null // Dodato
  updateAccessToken: (newToken: string) => void // Dodato
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [accessToken, setAccessToken] = useState<string | null>(null) // Dodato

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
        setUser(sessionData.session.user as User)
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
        setUser(session.user as User)
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
      const response = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'com.pet.garrd://update-password'
      })
      // Obrada odgovora
    } catch (error) {
      console.error('Error sending password reset email:', error.message)
      // Obrada greške
    }
  }

  const updatePassword = (updatedPassword: string) =>
    supabase.auth.updateUser({ password: updatedPassword })

  // Dodata funkcija za ažuriranje access tokena
  const updateAccessToken = (newToken: string) => {
    setAccessToken(newToken)
  }

  const authContextValue = useMemo(
    () => ({
      auth,
      user,
      login,
      signOut,
      passwordReset,
      updatePassword,
      accessToken, // Dodato
      updateAccessToken // Dodato
    }),
    [auth, user, accessToken]
  )

  return (
    <AuthContext.Provider value={authContextValue}>{!loading && children}</AuthContext.Provider>
  )
}

export default AuthProvider
