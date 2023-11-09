"use client"
import React, {useEffect, useState} from "react"
import {usePopoverStore} from "./key-store"
import {useVideoStore} from "./video-store"

interface KeyboardShortcutsProps {
  popover: boolean
}

const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({popover}) => {
  const [output, setOutput] = useState<string>("")

  const popoverStore = usePopoverStore()
  const videoStore = useVideoStore()

  useEffect(() => {
    const handleKeyboardShortcut = (e: KeyboardEvent) => {
      const shortcuts: {[key: string]: () => void} = {}
      if (popover) {
        if (e.key === "v" && e.ctrlKey) {
          return
        }
      }
      shortcuts["Ctrl+q"] = () => {
        popoverStore.togglePopover()
      }
      shortcuts["Ctrl+v"] = () => {
        navigator.clipboard.readText().then((clipboardData) => {
          popoverStore.setUrlCache(clipboardData)
        })
      }
      shortcuts["Ctrl+z"] = () => {
        videoStore.popLastVideo()
      }
      shortcuts["Ctrl+x"] = () => {
        videoStore.restoreLastVideo()
      }
      shortcuts["Ctrl+m"] = () => {
        videoStore.setReadLocalFile(true)
      }
      const keyCombination = (e.ctrlKey ? "Ctrl+" : "") + e.key
      const action = shortcuts[keyCombination]
      if (action) {
        action()
      }
    }
    window.addEventListener("keydown", handleKeyboardShortcut)
    return () => {
      window.removeEventListener("keydown", handleKeyboardShortcut)
    }
  }, [popover, popoverStore, videoStore])
  return <div style={{padding: "50px"}}>{output}</div>
}

export default KeyboardShortcuts
