"use client"
import React, {useEffect, useState} from "react"

interface KeyboardShortcutsProps {}

const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = () => {
  const [output, setOutput] = useState<string>(
    "Hello, I am a component that listens to keydown and keyup of a"
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyName = e.key
      console.log("test:onKeyDown", keyName, e)
      setOutput(`onKeyDown ${keyName}`)
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      const keyName = e.key
      console.log("test:onKeyUp", keyName)
      setOutput(`onKeyUp ${keyName}`)
    }

    // Attach event listeners to the window object
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      // Remove the event listeners when the component unmounts
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  return <div style={{padding: "50px"}}>{output}</div>
}

export default KeyboardShortcuts
