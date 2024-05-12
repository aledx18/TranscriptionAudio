import { create } from 'zustand'

export type PlayerState = {
  isPlaying: boolean
  start: number
  url: string
  fileName: string
  setIsPlaying: (isPlaying: boolean) => void
  setMinuteStart: (start: number) => void
  setUrl: (url: string) => void
  setfileName: (fileName: string) => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
  isPlaying: false,
  start: 1,
  url: '',
  fileName: '',
  setfileName: (fileName: string) => set({ fileName }),
  setUrl: (url: string) => set({ url }),
  setMinuteStart: (start: number) => set({ start }),
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying })
}))
