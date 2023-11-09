import {create} from "zustand"

export type PopoverStore = {
  isOpen: boolean
  togglePopover: () => void
}

export const usePopoverStore = create<PopoverStore>((set) => ({
  isOpen: false,
  togglePopover: () => set((state) => ({isOpen: !state.isOpen})),
}))
