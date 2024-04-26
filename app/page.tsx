"use client"
import PopoutController from "@/components/popout-controller"
import VideoPlayer from "@/components/video-player"
import Fireflies from "@/components/fireflies/fireflies"
import Image from "next/image"
import ScrapeWebsite from "@/components/scrape-website"
import {NextUIProvider} from "@nextui-org/react"

export default function Home() {
  return (
    <NextUIProvider>
      <div className='relative flex h-screen items-center justify-center overflow-hidden '>
        <div className='flex w-full max-w-[1800px] flex-col items-center justify-center 2xl:flex-row'>
          <div className='mx-4 w-full max-w-4xl rounded-3xl bg-zinc-900 p-4 text-zinc-300'>
            <div className='mx-6 mb-4'>
              <h1 className='py-4 text-4xl font-bold'>Splitscreen Video</h1>
              <p className=' text-2xl leading-9'>
                Responsive multi-screen media player, paste links inside window 
                or hover over the bottom of the page for a pop up controller, paste multiple 
                links for a recursive tiled format.
              </p>
            </div>
            <div className='m-auto max-w-3xl text-3xl'>
              <ul className='pl-6 leading-10'>
                {[
                  {bind: "Ctrl + Q", description: "Open Splitscreen Menu"},
                  {bind: "Ctrl + V", description: "Paste External Link"},
                  {
                    bind: "Ctrl + Z",
                    description: "Remove Previously Added Video",
                  },
                  {
                    bind: "Ctrl + X",
                    description: "Restore Previously Removed Video",
                  },
                ].map((keybind, index) => (
                  <li key={index}>
                    <strong>{keybind.bind}:</strong> {keybind.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <VideoPlayer />
        <PopoutController />
        <Fireflies />
      </div>
    </NextUIProvider>
  )
}
