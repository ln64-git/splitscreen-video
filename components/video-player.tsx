'use client';
import React, { useEffect, useState } from 'react';
import { useVideoStore, Video } from '../utils/video-store';

export default function VideoPlayer() {
  const [localVideos, setLocalVideos] = useState<Video[]>([]);
  const videoStore = useVideoStore();

  useEffect(() => {
    setLocalVideos(videoStore.videos);
  }, [videoStore.videos]);

  function generateIframeSrc(video: Video) {
    if (video && video.isRemote) {
      return getYoutubeVideo(video.path);
    } else if (video && video.file) {
      return video.file && URL.createObjectURL(video.file);
    }
    return '';
  }

  function getYoutubeVideo(url: string | undefined) {
    const regex = /[?&]v=([^&]+)/;
    const videoId = url?.match(regex);
    if (videoId) {
      return 'https://www.youtube.com/embed/' + videoId[1];
    } else {
      return '';
    }
  }

  const splitScreen = (videosArray: Video[]) => {
    const columns = Math.ceil(Math.sqrt(videosArray.length));
    return (
      <div className="absolute flex h-full w-full flex-col flex-wrap 2xl:flex-row">
        {videosArray.map((video: Video, index: number) => (
          <div
            key={index}
            className="flex-basis relative flex-1"
            style={{ flexBasis: `calc(${100 / columns}%)` }}
          >
            <iframe
              src={generateIframeSrc(video)}
              title={`Video Player ${index}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="h-full w-full"
            ></iframe>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="absolute z-10 h-full w-full">
      {splitScreen(localVideos)}
    </div>
  );
}
