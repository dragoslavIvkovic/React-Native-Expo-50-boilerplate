import NetInfo from '@react-native-community/netinfo'
import { create } from 'zustand'

interface NetworkState {
  isOnline: boolean
  setOnlineStatus: (isOnline: boolean) => void
}

const useNetworkStore = create<NetworkState>(set => ({
  isOnline: false,
  setOnlineStatus: isOnline => set({ isOnline })
}))

NetInfo.addEventListener(state => {
  useNetworkStore.getState().setOnlineStatus(state.isConnected ?? false)
})

export { useNetworkStore }
