import {create} from "zustand"

export type PopoverStore = {
  isOpen: boolean
  togglePopover: () => void
  urlCache: string
  setUrlCache: (url: string) => void
}

export const usePopoverStore = create<PopoverStore>((set) => ({
  isOpen: false,
  togglePopover: () => set((state) => ({isOpen: !state.isOpen})),
  urlCache: "",
  setUrlCache: (url) => set({urlCache: url}),
}))
