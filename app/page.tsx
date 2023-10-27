import CustomPopout from "./components/custom-popout"

export default function Home() {
  return (
    <div className='flex flex-col h-screen'>
      <div className='flex-grow flex items-center justify-center '>
        Splitscreen-Video
      </div>
      <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 '>
        <CustomPopout />
      </div>
    </div>
  )
}
