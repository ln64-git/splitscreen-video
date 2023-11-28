import PopoutController from '@/components/popout-controller';
import VideoPlayer from '@/components/video-player';
import Fireflies from '@/components/fireflies/fireflies';
import Image from 'next/image';
import backToTheFuture from '../public/back-to-the-future.gif';

export default function Home() {
  return (
    <div className="relative flex h-screen flex-col">
      <div className="flex flex-grow items-center  justify-center overflow-hidden">
        <div>
          <div className="mx-4 w-full max-w-4xl rounded-3xl  bg-zinc-900 p-4 text-zinc-300">
            <div className="mx-6 mb-4">
              <h1 className="py-4 text-4xl font-bold">Splitscreen Video</h1>
              <p className=" text-2xl leading-9">
                Utility application for viewing m ultiple media files in a
                responsive tiled format, paste links inside window for direct
                use, paste multiple links for an instantly responsive tiled
                content
              </p>
            </div>
            <div className="m-auto max-w-3xl text-3xl">
              <ul className="pl-6 leading-10">
                {[
                  { bind: 'Ctrl + Q', description: 'Open Splitscreen Menu' },
                  { bind: 'Ctrl + V', description: 'Paste External Link' },
                  {
                    bind: 'Ctrl + Z',
                    description: 'Remove Previously Added Video',
                  },
                  {
                    bind: 'Ctrl + X',
                    description: 'Restore Previously Removed Video',
                  },
                ].map((keybind, index) => (
                  <li key={index}>
                    <strong>{keybind.bind}:</strong> {keybind.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center pb-8">
            <Image
              src={backToTheFuture}
              className="max-w-lg"
              alt="Back to the Future"
              width={600}
              height={600}
            />
            <p className="max-w-3xl text-4xl font-light italic text-zinc-300 ">
              {
                '"I want channels 18, 24, 63, 109, 87 and the weather channel." - '
              }
              <strong>Marty McFly</strong>
            </p>
          </div>
        </div>
      </div>
      <VideoPlayer />
      <PopoutController />
      <Fireflies />
    </div>
  );
}
