"use client"
import React, {useState, useRef} from "react"
import {Button} from "@nextui-org/button"
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/popover"
import {NextUIProvider} from "@nextui-org/system"
import {RadioGroup, Radio} from "@nextui-org/radio"
import {useVideoStore} from "../utils/video-store"

export default function CustomPopout() {
  const [urlPath, setUrlPath] = useState("")
  const [filePath, setFilePath] = useState<File>()
  const [isRemote, setIsRemote] = useState(true)

  const videoStore = useVideoStore()

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = event.target.value
    setUrlPath(newUrl)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null
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
  }

  const inputRef = useRef<HTMLInputElement | null>(null) // Specify that inputRef can be null or an HTMLInputElement

  return (
    <NextUIProvider>
      <Popover placement='bottom' showArrow={true} className='bg-zinc-900'>
        <PopoverTrigger>
          <Button
            onClick={() => {
              if (inputRef.current) {
                inputRef.current.focus()
              }
            }}
            className='bg-zinc-950 text-white'
          >
            +
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <RadioGroup defaultValue='remote'>
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
                />
              ) : (
                <input
                  className='text-tiny bg-zinc-800 p-1 m-1 rounded-md ml-8 opacity-40 pointer-events-none'
                  value={urlPath}
                  onChange={handleUrlChange}
                />
              )}
              <div className='flex '>
                <Radio
                  value='local'
                  onClick={() => setIsRemote(false)}
                  className='scale-75'
                ></Radio>
                <div>
                  <div className='text-small font-bold'>Open local file</div>
                  <div className='text-tiny'>
                    Upload a video from the device
                  </div>
                </div>
              </div>
              <div className='text-right p-2 '>
                {!isRemote ? (
                  <>
                    <label
                      htmlFor='fileInput'
                      className='text-tiny bg-zinc-800 p-1 px-2 m-2 rounded-md'
                    >
                      Choose File
                    </label>
                    <input
                      type='file'
                      id='fileInput'
                      style={{display: "none"}}
                      onChange={handleFileUpload}
                    />
                  </>
                ) : (
                  <>
                    <label
                      htmlFor='fileInput'
                      className='text-tiny bg-zinc-800 p-1 px-2 m-2 rounded-md opacity-40 pointer-events-none'
                    >
                      Choose File
                    </label>
                    <input
                      type='file'
                      id='fileInput'
                      style={{display: "none"}}
                      onChange={handleFileUpload}
                    />
                  </>
                )}
              </div>
              <Button onClick={handleSubmit} className='bg-zinc-800 text-white'>
                Add Screen
              </Button>
              {filePath && <p>Selected file: {filePath.name}</p>}
            </div>
          </RadioGroup>
        </PopoverContent>
      </Popover>
    </NextUIProvider>
  )
}
