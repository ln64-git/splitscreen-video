import {create} from "zustand"

export type PopoverStore = {
  isOpen: boolean
  togglePopover: () => void
  urlCache: string // URL cache property
  setUrlCache: (url: string) => void // Corrected setUrlCache function
}

export const usePopoverStore = create<PopoverStore>((set) => ({
  isOpen: false,
  togglePopover: () => set((state) => ({isOpen: !state.isOpen})),
  urlCache: "",
  setUrlCache: (url) => set({urlCache: url}),
}))
