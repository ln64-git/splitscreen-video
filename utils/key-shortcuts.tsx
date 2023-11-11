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
      shortcuts["Ctrl+v"] = async () => {
        try {
          const clipboardData = await navigator.clipboard.readText()
          const urlRegex = /(?:https?:\/\/[^\s]+)|(?:youtube\.com[^\s]+)/g
          const matches = clipboardData.match(urlRegex)
          const uniqueUrls = Array.from(new Set(matches || []))
          uniqueUrls.forEach((url) => {
            const video = {
              isRemote: true,
              path: url,
              file: undefined,
            }
            videoStore.addVideo(video)
          })
        } catch (error) {
          console.error("Error reading clipboard data:", error)
        }
      }
      shortcuts["Ctrl+z"] = () => {
        videoStore.popLastVideo()
      }
      shortcuts["Ctrl+x"] = () => {
        if (videoStore.usedVideos.length > 1) {
          videoStore.restoreLastVideo()
        }
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
