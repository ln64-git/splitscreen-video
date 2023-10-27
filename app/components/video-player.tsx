"use client"
import React from "react"
import {useUrlStore} from "../utils/url-store-type"

export default function VideoPlayer() {
  const urlStore = useUrlStore() as {
    urlPath: string
    filePath: string
    setUrlPath: (url: string) => void
    setFilePath: (file: string) => void
  }

  const {urlPath, filePath, setUrlPath, setFilePath} = urlStore

  return (
    <iframe
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
      src={urlPath}
      title='YouTube Video'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
    ></iframe>
  )
}
