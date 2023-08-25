import Link from 'next/link'
import {
  faUpload,
  faMarker,
  faCalculator,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Home() {
  return (
    <div>
      <div className="relative flex items-center justify-center">
        <img
          src="/images/hero-bg.jpg"
          alt="Image"
          className="min-h-[600px] brightness-[35%]"
        />

        <div className="absolute px-4 text-center">
          <h1 className="font-bebasNeue text-8xl text-[#CD2444]">
            Find out how high you jump
          </h1>

          <p className="pb-4 text-2xl text-white">
            Use our free online video software to instantly calculate the height
            of your vertical jump
          </p>

          <button className="rounded bg-[#3e45a8] px-8 py-4 text-xl text-white hover:cursor-pointer">
            <Link href="/calculate-vertical">Calculate My Vertical</Link>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center py-14">
        <h2 className="mb-16 border-b-2 border-[#CD2444] pb-2 text-4xl">
          3 Simple Steps
        </h2>

        <div className="flex min-h-[800px] w-[80%] flex-col flex-wrap items-center justify-between text-center sm:min-h-[auto] sm:max-w-[1200px] sm:flex-row">
          <div className="w-[250px] rounded-2xl border border-gray-300 px-10 py-10 shadow">
            <FontAwesomeIcon
              icon={faUpload}
              className="pb-4 text-3xl text-[#CD2444]"
            />

            <h4 className="text-2xl">Step 1</h4>

            <p className="text-gray-700">Upload your video onto the website</p>
          </div>

          <div className="w-[250px] rounded-2xl border border-gray-300 px-10 py-10 shadow">
            <FontAwesomeIcon
              icon={faMarker}
              className="pb-4 text-3xl text-[#CD2444]"
            />
            <h4 className="text-2xl">Step 2</h4>

            <p className="text-gray-700">Mark the start and end of the jump</p>
          </div>

          <div className="w-[250px] rounded-2xl border border-gray-300 px-10 py-10 shadow">
            <FontAwesomeIcon
              icon={faCalculator}
              className="pb-4 text-3xl text-[#CD2444]"
            />

            <h4 className="text-2xl">Step 3</h4>

            <p className="text-gray-700">
              Press calculate and get your results
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
