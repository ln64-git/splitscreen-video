"use client"
import React, {useState, useRef, useEffect, useLayoutEffect} from "react"
import {Button} from "@nextui-org/react"
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react"
import {NextUIProvider} from "@nextui-org/react"
import {useVideoStore} from "../utils/video-store"
import {usePopoverStore} from "@/utils/key-store"
import {motion, useAnimation} from "framer-motion"
import KeyboardShortcuts from "@/utils/key-shortcuts"
import PopoverControllerContent from "./popout-controller-content"

export default function PopoutController() {
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
  }, [popoverStore.isOpen, animationControl, popover])

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
        className='fixed bottom-0 left-0 right-0 z-10 mx-auto h-1/4 w-1/2 '
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
      ></div>
      <div className='fixed bottom-4 left-1/2 z-20 -translate-x-1/2 transform'>
        <Popover placement='bottom' isOpen={popover} className='bg-zinc-900 '>
          <PopoverTrigger>
            <motion.div initial={{y: 60}} animate={animationControl}>
              <Button
                onClick={() => popoverStore.togglePopover()}
                className='bg-zinc-900 text-white'
                onMouseEnter={handleHover}
              >
                +
              </Button>
            </motion.div>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverControllerContent
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
