import {create} from "zustand"

export interface Video {
  isRemote: boolean
  path?: string
  file?: File
}

export type VideoStore = {
  videos: Array<Video>
  addVideo: (video: Video) => void
  removeVideo: (video: Video) => void
  clearVideos: () => void
}

export const useVideoStore = create<VideoStore>((set) => ({
  videos: [],
  addVideo: (video) => set((state) => ({videos: [...state.videos, video]})),
  removeVideo: (video) =>
    set((state) => ({
      videos: state.videos.filter((v) => v !== video),
    })),
  clearVideos: () => set({videos: []}),
}))
