const Title = () => (
  <h1 className=' text-4xl py-4 font-bold'>Splitscreen Video</h1>
)

const Summary = () => (
  <p className='text-2xl leading-9 '>
    Utility application for viewing multiple media files in a responsive tiled
    format, paste links inside window for direct use, paste multiple links for
    an instantly responcive tiled content
  </p>
)

const keybinds = [
  {bind: "Ctrl + Q", description: "Open Splitscreen Menu"},
  {bind: "Ctrl + V", description: "Paste External Link"},
  {bind: "Ctrl + Z", description: "Remove Previously Added Video"},
  {bind: "Ctrl + X", description: "Restore Previously Removed Video"},
]

const BindingsChart = () => {
  return (
    <div className='max-w-3xl m-auto text-3xl'>
      <ul className='pl-6 leading-10'>
        {keybinds.map((keybind, index) => (
          <li key={index}>
            <strong>{keybind.bind}:</strong> {keybind.description}
          </li>
        ))}
      </ul>
    </div>
  )
}

const SplashScreen = () => (
  <div className='bg-zinc-900 text-zinc-300 mx-4 max-w-4xl w-full p-4 rounded-3xl'>
    <div className='mb-4 mx-6'>
      <Title />
      <Summary />
    </div>
    <BindingsChart />
  </div>
)

export default SplashScreen
