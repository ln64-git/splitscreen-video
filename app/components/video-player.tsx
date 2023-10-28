"use client"
import React from "react"
import {useVideoStore, Video} from "../utils/video-store" // Import the Video interface

export default function VideoPlayer() {
  const videoStore = useVideoStore()
  const firstVideo = videoStore.videos[0]
  function generateIframeSrc(video: Video) {
    if (video && video.isRemote) {
      return getYoutubeVideo(video.path)
    } else if (video && video.file) {
      return URL.createObjectURL(video.file)
    }
    return ""
  }

  console.log(videoStore)
  console.log(firstVideo)

  return (
    <div>
      <iframe
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        src={generateIframeSrc(firstVideo)}
        title='Video Player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      ></iframe>
    </div>
  )
}

function getYoutubeVideo(url: String | undefined) {
  const regex = /[?&]v=([^&]+)/
  const videoId = url?.match(regex)
  if (videoId) {
    return "https://www.youtube.com/embed/" + videoId[1]
  } else {
    return ""
  }
}
