"use client"
import React, {useState, useRef, useEffect, useLayoutEffect} from "react"
import {Button} from "@nextui-org/button"
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/popover"
import {NextUIProvider} from "@nextui-org/system"
import {RadioGroup, Radio} from "@nextui-org/radio"
import {useVideoStore} from "../utils/video-store"
import {usePopoverStore} from "@/utils/key-store"
import {motion, useAnimation} from "framer-motion"
import KeyboardShortcuts from "@/utils/key-shortcuts"

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
        <Popover placement='bottom' isOpen={popover} className='bg-zinc-900'>
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
            <RadioGroup defaultValue={isRemote ? "remote" : "local"}>
              <div className='px-1 py-2 flex flex-col justify-center'>
                <div className='flex'>
                  <Radio
                    value='remote'
                    onClick={() => setIsRemote(true)}
                    className='scale-75'
                  ></Radio>
                  <div>
                    <div className='text-small font-bold'>Open from URL</div>
                    <div className='text-tiny'>
                      Connect to an existing video on the internet
                    </div>
                  </div>
                </div>
                <input
                  ref={inputRef}
                  className={
                    isRemote
                      ? "text-tiny bg-zinc-800 p-1 m-1 rounded-md ml-8"
                      : "text-tiny bg-zinc-800 p-1 m-1 rounded-md ml-8 opacity-40 pointer-events-none"
                  }
                  value={urlPath}
                  onChange={handleUrlChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit()
                    }
                  }}
                />
                <div className='flex'>
                  <Radio
                    value='local'
                    onClick={() => setIsRemote(false)}
                    className='scale-75'
                  ></Radio>
                  <div>
                    <div className='text-small font-bold'>Open local file</div>
                    <div className='text-tiny' key='local-label-tiny'>
                      Upload a video from your device
                    </div>
                  </div>
                </div>
                <div className='text-right p-2'>
                  <>
                    <label
                      htmlFor='fileInput'
                      className={
                        isRemote
                          ? "text-tiny bg-zinc-800 p-1 px-2 m-2 rounded-md opacity-40 pointer-events-none"
                          : "text-tiny bg-zinc-800 p-1 px-2 m-2 rounded-md"
                      }
                    >
                      Choose File
                    </label>
                    <input
                      type='file'
                      id='fileInput'
                      ref={fileInputRef}
                      className='hidden'
                      onChange={handleFileChange}
                    />
                  </>
                </div>
                <Button
                  onClick={handleSubmit}
                  className='bg-zinc-800 text-white'
                >
                  Add Screen
                </Button>
                {filePath && <p>Selected file: {filePath.name}</p>}
              </div>
            </RadioGroup>
          </PopoverContent>
        </Popover>
      </div>
    </NextUIProvider>
  )
}
