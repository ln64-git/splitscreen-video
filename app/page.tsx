import CustomPopout from "@/components/custom-popout"
import VideoPlayer from "@/components/video-player"
import KeyboardShortcuts from "@/utils/key-shortcuts"
import React from "react"

export default function Home() {
  return (
    <div className='flex flex-col h-screen relative'>
      <div className='flex-grow flex items-center justify-center'>
        Splitscreen-Video
      </div>
      <VideoPlayer />
      <div className=''>
        <CustomPopout />
      </div>
    </div>
  )
}
