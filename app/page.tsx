"use client"
import {NextUIProvider} from "@nextui-org/system"
import {Button} from "@nextui-org/button"
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/popover"
import {Input} from "@nextui-org/input"

export default function Home() {
  return (
    <NextUIProvider>
      <div className='flex flex-col h-screen'>
        <div className='flex-grow flex items-center justify-center '>
          Splitscreen-Video
        </div>
        <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 '>
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
                <input className='text-tiny bg-zinc-800 p-1 m-1 rounded-md'></input>
                <div className='text-small font-bold'>Open local file</div>
                <div className='text-tiny'>Upload a video from device</div>
                <div className='text-right'>
                  <button className='text-tiny bg-zinc-800 p-1 px-2 m-1 rounded-md'>
                    choose file
                  </button>
                </div>
                <Button className='bg-zinc-800 text-white'>Add Screen</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </NextUIProvider>
  )
}
