import React from "react"

export default function VideoPlayer() {
  function getYoutubeVideo(url: string | undefined) {
    const regex = /[?&]v=([^&]+)/
    const videoId = url?.match(regex)
    if (videoId) {
      return "https://www.youtube.com/embed/" + videoId[1]
    } else {
      return ""
    }
  }
  const videos = [
    "https://www.youtube.com/watch?v=t3Tbvah7waU",
    "https://www.youtube.com/watch?v=1sCoTSHn7WE&t=150s",
    "https://www.youtube.com/watch?v=B-3DGpzFb18&t=4461s",
    "https://www.youtube.com/watch?v=n9ieqEdBTA4",
    "https://www.youtube.com/watch?v=15tVFFGsI1E&t=4358s",
    "https://www.youtube.com/watch?v=Ksh4KpuZLJk",
    "https://www.youtube.com/watch?v=9Q3_fB1LqV0",
  ]

  const splitScreen = (videosArray: string[]) => {
    const columns = Math.ceil(Math.sqrt(videosArray.length))

    return (
      <div className='w-full h-full absolute bg-black flex flex-wrap'>
        {videosArray.map((video: string, index: number) => (
          <div
            key={index}
            className='relative flex-1 '
            style={{flexBasis: `calc(${100 / columns}% - 20px)`}}
          >
            <iframe
              src={getYoutubeVideo(video)}
              title={`Video Player ${index}`}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              className='w-full h-full'
            ></iframe>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='w-full h-full absolute bg-black'>{splitScreen(videos)}</div>
  )
}
