import {Button} from "@nextui-org/button"
import {Radio, RadioGroup} from "@nextui-org/radio"
import React from "react"

interface PopoverContentProps {
  isRemote: boolean
  setIsRemote: React.Dispatch<React.SetStateAction<boolean>>
  handleSubmit: () => void
  filePath: File | undefined
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  urlPath: string
  inputRef: React.MutableRefObject<HTMLInputElement | null>
  handleUrlChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomPopoverContent: React.FC<PopoverContentProps> = ({
  isRemote,
  setIsRemote,
  handleSubmit,
  filePath,
  fileInputRef,
  handleFileChange,
  urlPath,
  inputRef,
  handleUrlChange,
}) => {
  const FileInput = () => (
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
  )
  const UrlInput = () => (
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
  )

  return (
    <RadioGroup defaultValue={isRemote ? "remote" : "local"}>
      <div className='px-1 py-2 flex flex-col justify-center '>
        <div className='flex'>
          <Radio
            value='remote'
            onClick={() => setIsRemote(true)}
            className=''
          ></Radio>
          <div className='mx-2'>
            <div className='text-xl font-bold'>Open from URL</div>
            <div className='text-md'>
              Connect to an existing video on the internet
            </div>
          </div>
        </div>
        <UrlInput />
        <div className='flex'>
          <Radio
            value='local'
            onClick={() => setIsRemote(false)}
            className=''
          ></Radio>
          <div className='mx-2'>
            <div className='text-xl font-bold'>Open local file</div>
            <div className='text-md' key='local-label-tiny'>
              Upload a video from your device
            </div>
          </div>
        </div>
        <div className='text-right p-2'>
          <FileInput />
        </div>
        <Button
          onClick={handleSubmit}
          className='bg-zinc-800 text-white text-md'
        >
          Add Screen
        </Button>
        {filePath && <p>Selected file: {filePath.name}</p>}
      </div>
    </RadioGroup>
  )
}
export default CustomPopoverContent
