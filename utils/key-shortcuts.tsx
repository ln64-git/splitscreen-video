"use client"
import React, {useEffect, useState} from "react"
import {usePopoverStore} from "./key-store"
import {useVideoStore} from "./video-store"

interface KeyboardShortcutsProps {}

const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = () => {
  const [output, setOutput] = useState<string>("")

  const popoverStore = usePopoverStore()
  const videoStore = useVideoStore()

  useEffect(() => {
    const handleKeyboardShortcut = (e: KeyboardEvent) => {
      const shortcuts: {[key: string]: () => void} = {
        "Ctrl+q": () => {
          popoverStore.togglePopover()
        },
        "Ctrl+v": () => {
          e.preventDefault()
          navigator.clipboard.readText().then((clipboardData) => {
            popoverStore.setUrlCache(clipboardData)
          })
        },
        "Ctrl+z": () => {
          videoStore.popLastVideo()
        },
        "Ctrl+y": () => setOutput("Redo"),
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
  }, [])

  return <div style={{padding: "50px"}}>{output}</div>
}

export default KeyboardShortcuts
