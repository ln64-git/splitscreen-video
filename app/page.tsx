import React from "react"
import CustomPopout from "./components/custom-popout"

export default function Home() {
  return (
    <div className='flex flex-col h-screen relative'>
      {" "}
      {/* Make the container relative */}
      <div className='flex-grow flex items-center justify-center'>
        Splitscreen-Video
      </div>
      <iframe
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        src='https://www.youtube.com/embed/hegvprK4TrM'
        title='YouTube Video'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      ></iframe>
      <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2'>
        <CustomPopout />
      </div>
    </div>
  )
}
