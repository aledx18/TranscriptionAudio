import { create } from 'zustand'

export type PlayerState = {
  isPlaying: boolean
  start: number
  setIsPlaying: (isPlaying: boolean) => void
  setMinuteStart: (start: number) => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
  isPlaying: false,
  start: 1,
  setMinuteStart: (start: number) => set({ start }),
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying })
}))
