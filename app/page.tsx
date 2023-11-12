import CustomPopout from "@/components/custom-popout"
import SplashScreen from "@/components/splash-screen"
import VideoPlayer from "@/components/video-player"
import Fireflies from "@/components/fireflies/fireflies"

export default function Home() {
  return (
    <div className='flex flex-col h-screen relative'>
      <div className='flex-grow flex items-center  justify-center overflow-hidden'>
        <SplashScreen />
      </div>
      <VideoPlayer />
      <CustomPopout />
      <Fireflies />
    </div>
  )
}
