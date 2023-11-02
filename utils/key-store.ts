import {create} from "zustand"

export type PopoverStore = {
  isOpen: boolean
  openPopover: () => void
  closePopover: () => void
  togglePopover: () => void
}

export const usePopoverStore = create<PopoverStore>((set) => ({
  isOpen: false,
  openPopover: () => set({isOpen: true}),
  closePopover: () => set({isOpen: false}),
  togglePopover: () => set((state) => ({isOpen: !state.isOpen})),
}))
