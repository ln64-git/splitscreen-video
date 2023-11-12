"use client"
import {useVideoStore} from "@/utils/video-store"
import "./fireflies.scss"

export default function Fireflies() {
  const videoStore = useVideoStore()
  const fireflies = Array.from({length: 15}, (_, index) => (
    <div key={index} className='firefly'></div>
  ))
  if (videoStore.videos.length === 0) {
    return <>{fireflies}</>
  }
}
