import { create } from 'zustand'

type UserState = {
  isLogged: boolean
  firstName: string
  lastName: string
  token: string
  refreshToken: string // Add refreshToken
  login: (
    firstName: string,
    lastName: string,
    userPermissions: string[],
    token: string,
    refreshToken: string
  ) => void
  logout: () => void
  userPermissions: string[]
}

export const useUserStore = create<UserState>(set => ({
  isLogged: false,
  firstName: '',
  lastName: '',
  token: '',
  refreshToken: '', // Add refreshToken
  userPermissions: [],
  login: (firstName, lastName, userPermissions, token, refreshToken) =>
    set({ isLogged: true, firstName, lastName, userPermissions, token, refreshToken }), // Include refreshToken in the set
  logout: () =>
    set({
      isLogged: false,
      firstName: '',
      lastName: '',
      userPermissions: [],
      token: '',
      refreshToken: '' // Reset refreshToken on logout
    })
}))
