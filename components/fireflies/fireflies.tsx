import "./fireflies.scss"
export default function Fireflies() {
  const fireflies = Array.from({length: 15}, (_, index) => (
    <div key={index} className='firefly'></div>
  ))
  return <>{fireflies}</> // Return JSX directly
}
