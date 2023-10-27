"use client"
import React, {useState} from "react"
import {Button} from "@nextui-org/button"
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/popover"
import {NextUIProvider} from "@nextui-org/system"
import {useUrlStore} from "../utils/url-store-type"

export default function CustomPopout() {
  const [urlPath, setUrlPath] = useState("")
  const [filePath, setFilePath] = useState("")
  const urlStore = useUrlStore() as {
    urlPath: string
    filePath: string
    setUrlPath: (url: string) => void
    setFilePath: (file: string) => void
  }

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = event.target.value
    setUrlPath(newUrl)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null
    if (selectedFile) {
      console.log("Selected file:", selectedFile)
      setFilePath(selectedFile.name)
    }
  }

  const handleSubmit = () => {
    urlStore.setUrlPath(urlPath)
    urlStore.setFilePath(filePath)
  }

  return (
    <NextUIProvider>
      <Popover placement='bottom' showArrow={true} className='bg-zinc-900'>
        <PopoverTrigger>
          <Button className='bg-zinc-950 text-white'>+</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className='px-1 py-2 flex flex-col justify-center'>
            <div className='text-small font-bold'>Open from URL</div>
            <div className='text-tiny'>
              Connect to an existing video on the internet
            </div>
            <input
              className='text-tiny bg-zinc-800 p-1 m-1 rounded-md'
              value={urlPath}
              onChange={handleUrlChange}
            />
            <div className='text-small font-bold'>Open local file</div>
            <div className='text-tiny'>Upload a video from the device</div>
            <div className='text-right p-2 '>
              <label
                htmlFor='fileInput'
                className='text-tiny bg-zinc-800 p-1 px-2 m-1 rounded-md'
              >
                Choose File
              </label>
              <input
                type='file'
                id='fileInput'
                style={{display: "none"}}
                onChange={handleFileUpload}
              />
            </div>
            <Button onClick={handleSubmit} className='bg-zinc-800 text-white'>
              Add Screen
            </Button>
            {filePath && <p>Selected file: {filePath}</p>}
          </div>
        </PopoverContent>
      </Popover>
    </NextUIProvider>
  )
}
