"use client"
import React, {useEffect, useState} from "react"
import {useVideoStore, Video} from "../utils/video-store"

export default function VideoPlayer() {
  const [localVideos, setLocalVideos] = useState<Video[]>([])
  const videoStore = useVideoStore()

  useEffect(() => {
    setLocalVideos(videoStore.videos)
  }, [videoStore.videos])

  function generateIframeSrc(video: Video) {
    if (video && video.isRemote) {
      return getYoutubeVideo(video.path)
    } else if (video && video.file) {
      // Use the video element for local files
      return video.file && URL.createObjectURL(video.file)
    }
    return ""
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

  const splitScreen = (videosArray: Video[]) => {
    const columns = Math.ceil(Math.sqrt(videosArray.length))
    return (
      <div className='w-full h-full absolute flex flex-wrap'>
        {videosArray.map((video: Video, index: number) => (
          <div
            key={index}
            className='relative flex-1'
            style={{flexBasis: `calc(${100 / columns}%)`}}
          >
            {video.isRemote ? (
              <iframe
                src={generateIframeSrc(video)}
                title={`Video Player ${index}`}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                className='w-full h-full'
              ></iframe>
            ) : (
              <video
                src={generateIframeSrc(video)}
                title={`Video Player ${index}`}
                controls // Add controls for playback
                className='w-full h-full'
              ></video>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='w-full h-full absolute'>{splitScreen(localVideos)}</div>
  )
}
