"use client"
import React from "react"
import {useVideoStore, Video} from "../utils/video-store"

export default function VideoPlayer() {
  const videoStore = useVideoStore()

  function generateIframeSrc(video: Video) {
    if (video && video.isRemote) {
      return getYoutubeVideo(video.path)
    } else if (video && video.file) {
      return URL.createObjectURL(video.file)
    }
    return ""
  }

  return (
    <div className='w-full h-full absolute flex'>
      {videoStore.videos.map((video, index) => (
        <div key={index} className='w-full' style={{position: "relative"}}>
          <iframe
            src={generateIframeSrc(video)}
            title={`Video Player ${index}`}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            style={{position: "absolute", width: "100%", height: "100%"}}
          ></iframe>
        </div>
      ))}
    </div>
  )
}

function getYoutubeVideo(url: string | undefined) {
  const regex = /[?&]v=([^&]+)/
  const videoId = url?.match(regex)
  if (videoId) {
    return "https://www.youtube.com/embed/" + videoId[1]
  } else {
    return ""
  }
}
