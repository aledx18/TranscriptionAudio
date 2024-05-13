import { create } from 'zustand'
import { Message } from '../actions/responseInterface'

export type PlayerState = {
  isPlaying: boolean
  start: number
  url: string
  fileName: string
  conversation: Message[]
  setIsPlaying: (isPlaying: boolean) => void
  setMinuteStart: (start: number) => void
  setUrl: (url: string) => void
  setfileName: (fileName: string) => void
  setConversation: (conversation: Message[]) => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
  isPlaying: false,
  start: 1,
  url: '',
  conversation: [],
  fileName: '',
  setConversation: (conversation: Message[]) => set({ conversation }),
  setfileName: (fileName: string) => set({ fileName }),
  setUrl: (url: string) => set({ url }),
  setMinuteStart: (start: number) => set({ start }),
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying })
}))
