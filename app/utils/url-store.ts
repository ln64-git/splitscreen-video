import {create} from "zustand"

export const useUrlStore = create((set) => ({
  remote: false,
  urlPath: "",
  filePath: "",
  setUrlPath: (url: String) => set({urlPath: url}),
  setFilePath: (file: String) => set({filePath: file}),
}))
