import {create} from "zustand"

export interface Video {
  isRemote: boolean
  path?: string
  file?: File
}

export type VideoStore = {
  videos: Array<Video>
  usedVideos: Array<Video>
  addVideo: (video: Video) => void
  popLastVideo: () => void
  restoreLastVideo: () => void
  clearVideos: () => void
}

export const useVideoStore = create<VideoStore>((set) => ({
  videos: [],
  usedVideos: [],
  addVideo: (video) =>
    set((state) => ({
      videos: [...state.videos, video],
      usedVideos: [...state.usedVideos, video],
    })),
  popLastVideo: () =>
    set((state) => {
      if (state.videos.length === 0) return state
      const lastVideo = state.videos[state.videos.length - 1]
      return {
        videos: state.videos.slice(0, -1),
        usedVideos: [...state.usedVideos, lastVideo],
      }
    }),
  restoreLastVideo: () =>
    set((state) => {
      if (state.usedVideos.length === 0) return state
      const lastUsedVideo = state.usedVideos[state.usedVideos.length - 1]
      return {
        videos: [...state.videos, lastUsedVideo],
        usedVideos: state.usedVideos.slice(0, -1),
      }
    }),
  clearVideos: () =>
    set({
      videos: [],
      usedVideos: [],
    }),
}))
