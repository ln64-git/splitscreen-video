"use client"
import React, {useEffect} from "react"
import {usePopoverStore} from "./key-store"
import {useVideoStore} from "./video-store"
import ScrapeWebsite from "@/components/scrape-website"

interface KeyboardShortcutsProps {
  popover: boolean
}

const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({popover}) => {
  const popoverStore = usePopoverStore()
  const videoStore = useVideoStore()

  useEffect(() => {
    const handleKeyboardShortcut = (e: KeyboardEvent) => {
      const shortcuts: {[key: string]: () => void} = {}
      if (popover) {
        if (e.ctrlKey && e.key === "v") {
          return
        }
      }
      shortcuts["Ctrl+q"] = () => {
        popoverStore.togglePopover()
      }
      shortcuts["Ctrl+e"] = () => {
        e.preventDefault()
        popoverStore.togglePopover()
      }

      shortcuts["Ctrl+v"] = async () => {
        try {
          const result = ScrapeWebsite()
          console.log(result)
        } catch (e) {
          console.log(e)
        }
      }

      shortcuts["Ctrl+b"] = async () => {
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
  return null
}

export default KeyboardShortcuts
