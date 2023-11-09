"use client"
import React, {useState, useRef, useEffect} from "react"
import {Button} from "@nextui-org/button"
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/popover"
import {NextUIProvider} from "@nextui-org/system"
import {RadioGroup, Radio} from "@nextui-org/radio"
import {useVideoStore} from "../utils/video-store"
import {usePopoverStore} from "@/utils/key-store"
import {motion, useAnimation} from "framer-motion"
import KeyboardShortcuts from "@/utils/key-shortcuts"
import {read} from "fs"

export default function CustomPopout() {
  const [urlPath, setUrlPath] = useState("")
  const [filePath, setFilePath] = useState<File | undefined>()
  const [isRemote, setIsRemote] = useState(true)
  const [popover, setPopover] = useState(false)

  const popoverStore = usePopoverStore()
  const videoStore = useVideoStore()

  const controls = useAnimation()

  const [pasteUrlInit, setPasteUrlInit] = useState(false)

  useEffect(() => {
    if (popoverStore.isOpen !== popover) {
      if (popoverStore.isOpen === true) {
        controls.start({y: 0})
        const timeoutId = setTimeout(() => {
          setPopover(popoverStore.isOpen)
        }, 500)
        return () => {
          clearTimeout(timeoutId)
        }
      } else {
        controls.start({y: 60})
        setPopover(popoverStore.isOpen)
      }
    }
  }, [popoverStore.isOpen, controls])

  const inputRef = useRef<HTMLInputElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (videoStore.readLocalFile === true && fileInputRef.current) {
      setIsRemote(false)
      fileInputRef.current.click()
      videoStore.setReadLocalFile(false)
      console.log("File selection window opened")
    }
  }, [videoStore.readLocalFile, fileInputRef])

  useEffect(() => {
    if (popover) {
      inputRef.current?.focus()
    }
  }, [popover])

  useEffect(() => {
    if (popoverStore.urlCache !== "") {
      setUrlPath(popoverStore.urlCache)
      setPasteUrlInit(true)
    }
  }, [popoverStore.urlCache])

  useEffect(() => {
    if (pasteUrlInit === true && urlPath !== "") {
      handleSubmit()
    }
    setPasteUrlInit(false)
  }, [pasteUrlInit, urlPath])

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlPath(event.target.value)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : undefined
    if (selectedFile) {
      setFilePath(selectedFile)
    }
  }

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

  const handleHover = () => {
    controls.start({y: 0})
  }

  const handleMouseLeave = () => {
    if (!popover) {
      controls.start({y: 60})
    }
  }

  return (
    <NextUIProvider>
      <KeyboardShortcuts popover={popover} />
      <div
        className='w-1/2 h-1/4 fixed bottom-0 z-10 mx-auto left-0 right-0'
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
      ></div>
      <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20'>
        <Popover placement='bottom' isOpen={popover} className='bg-zinc-900'>
          <PopoverTrigger>
            <motion.div initial={{y: 60}} animate={controls}>
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
            <RadioGroup defaultValue='remote'>
              <div className='px-1 py-2 flex flex-col justify-center'>
                <div className='flex'>
                  <Radio
                    value='remote'
                    onClick={() => setIsRemote(true)}
                    className='scale-75'
                    key='remote-radio'
                  ></Radio>
                  <div>
                    <div
                      className='text-small font-bold'
                      key='remote-label-bold'
                    >
                      Open from URL
                    </div>
                    <div className='text-tiny' key='remote-label-tiny'>
                      Connect to an existing video on the internet
                    </div>
                  </div>
                </div>
                {isRemote ? (
                  <input
                    ref={inputRef}
                    className='text-tiny bg-zinc-800 p-1 m-1 rounded-md ml-8'
                    value={urlPath}
                    onChange={handleUrlChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit()
                      }
                    }}
                    key='url-input'
                  />
                ) : (
                  <input
                    className='text-tiny bg-zinc-800 p-1 m-1 rounded-md ml-8 opacity-40 pointer-events-none'
                    value={urlPath}
                    onChange={handleUrlChange}
                    key='file-input'
                  />
                )}
                <div className='flex'>
                  <Radio
                    value='local'
                    onClick={() => setIsRemote(false)}
                    className='scale-75'
                    key='local-radio'
                  ></Radio>
                  <div>
                    <div
                      className='text-small font-bold'
                      key='local-label-bold'
                    >
                      Open local file
                    </div>
                    <div className='text-tiny' key='local-label-tiny'>
                      Upload a video from your device
                    </div>
                  </div>
                </div>
                <div className='text-right p-2'>
                  {!isRemote ? (
                    <>
                      <label
                        htmlFor='fileInput'
                        className='text-tiny bg-zinc-800 p-1 px-2 m-2 rounded-md'
                        key='file-label'
                      >
                        Choose File
                      </label>
                      <input
                        type='file'
                        id='fileInput'
                        ref={fileInputRef}
                        style={{display: "none"}}
                        onChange={handleFileUpload}
                        key='file-input-hidden'
                      />
                    </>
                  ) : (
                    <>
                      <label
                        htmlFor='fileInput'
                        className='text-tiny bg-zinc-800 p-1 px-2 m-2 rounded-md opacity-40 pointer-events-none'
                        key='file-label-disabled'
                      >
                        Choose File
                      </label>
                      <input
                        type='file'
                        id='fileInput'
                        ref={fileInputRef}
                        style={{display: "none"}}
                        onChange={handleFileUpload}
                        key='file-input-disabled'
                      />
                    </>
                  )}
                </div>
                <Button
                  onClick={handleSubmit}
                  className='bg-zinc-800 text-white'
                  key='submit-button'
                >
                  Add Screen
                </Button>
                {filePath && (
                  <p key='selected-file-text'>Selected file: {filePath.name}</p>
                )}
              </div>
            </RadioGroup>
          </PopoverContent>
        </Popover>
      </div>
    </NextUIProvider>
  )
}
