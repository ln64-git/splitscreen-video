"use client"
import React from "react"
import {useVideoStore} from "../utils/video-store"

export default function VideoPlayer() {
  const videoStore = useVideoStore()
  console.log(videoStore.videos)

  // const videoId = getYoutubeVideo(urlPath)

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
        // src={videoPath}
        title='YouTube Video'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      ></iframe>
    </div>
  )

  function getYoutubeVideo(url: String) {
    const regex = /[?&]v=([^&]+)/
    const videoId = url.match(regex)
    if (videoId) {
      return "https://www.youtube.com/embed/" + videoId[1]
    } else {
      return ""
    }
  }
}
