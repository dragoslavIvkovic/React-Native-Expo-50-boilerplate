import { create } from 'zustand'

type UserState = {
  isLogged: boolean
  firstName: string
  lastName: string
  token: string
  refreshToken: string
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
  refreshToken: '',
  userPermissions: [],
  login: (firstName, lastName, userPermissions, token, refreshToken) =>
    set({ isLogged: true, firstName, lastName, userPermissions, token, refreshToken }),
  logout: () =>
    set({
      isLogged: false,
      firstName: '',
      lastName: '',
      userPermissions: [],
      token: '',
      refreshToken: ''
    })
}))
