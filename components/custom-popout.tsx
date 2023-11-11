"use client"
import React, {useState, useRef, useEffect, useLayoutEffect} from "react"
import {Button} from "@nextui-org/button"
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/popover"
import {NextUIProvider} from "@nextui-org/system"
import {useVideoStore} from "../utils/video-store"
import {usePopoverStore} from "@/utils/key-store"
import {motion, useAnimation} from "framer-motion"
import KeyboardShortcuts from "@/utils/key-shortcuts"
import CustomPopoverContent from "./custom-popout-content"

export default function CustomPopout() {
  const [urlPath, setUrlPath] = useState("")
  const [filePath, setFilePath] = useState<File | undefined>()
  const [isRemote, setIsRemote] = useState(true)
  const [popover, setPopover] = useState(false)

  const popoverStore = usePopoverStore()
  const videoStore = useVideoStore()

  const animationControl = useAnimation()

  const inputRef = useRef<HTMLInputElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (popoverStore.isOpen !== popover) {
      if (popoverStore.isOpen === true) {
        animationControl.start({y: 0})
        setTimeout(() => {
          setPopover(popoverStore.isOpen)
        }, 500)
      } else {
        animationControl.start({y: 60})
        setPopover(popoverStore.isOpen)
      }
    }
  }, [popoverStore.isOpen])

  useEffect(() => {
    if (popover) {
      inputRef.current?.focus()
    }
  }, [popover])

  const handleSubmit = () => {
    const video = {
      isRemote: isRemote,
      path: urlPath,
      file: filePath,
    }
    videoStore.addVideo(video)
    setUrlPath("")
    setFilePath(undefined)
    setPopover(false)
  }

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlPath(event.target.value)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : undefined
    if (selectedFile) {
      setFilePath(selectedFile)
    }
  }

  const handleHover = () => {
    animationControl.start({y: 0})
  }

  const handleMouseLeave = () => {
    if (!popover) {
      animationControl.start({y: 60})
    }
  }

  return (
    <NextUIProvider>
      <KeyboardShortcuts popover={popover} />
      <div
        className='w-1/2 h-1/4 fixed bottom-0 z-10 mx-auto left-0 right-0 hoverPopup'
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
      ></div>
      <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20'>
        <Popover placement='bottom' isOpen={popover} className='bg-zinc-900 '>
          <PopoverTrigger>
            <motion.div initial={{y: 60}} animate={animationControl}>
              <Button
                onClick={() => setPopover(!popover)}
                className='bg-zinc-900 text-white'
                onMouseEnter={handleHover}
              >
                +
              </Button>
            </motion.div>
          </PopoverTrigger>
          <PopoverContent>
            <CustomPopoverContent
              isRemote={isRemote}
              setIsRemote={setIsRemote}
              handleSubmit={handleSubmit}
              filePath={filePath}
              fileInputRef={fileInputRef}
              handleFileChange={handleFileChange}
              urlPath={urlPath}
              inputRef={inputRef}
              handleUrlChange={handleUrlChange}
            />
          </PopoverContent>
        </Popover>
      </div>
    </NextUIProvider>
  )
}
