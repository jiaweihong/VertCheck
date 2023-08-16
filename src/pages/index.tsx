import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <div className="relative flex items-center justify-center">
        <img
          src="/images/hero-bg.jpg"
          alt="Image"
          className="brightness-[35%]"
        />

        <div className="absolute text-center">
          <h1 className="text-8xl text-[#CD2444]">
            Calculate Your Vertical Jump
          </h1>

          <p className="pb-4 text-2xl text-white">
            Use our free video software to instantly calculate the height of
            your vertical jump online
          </p>

          <button className="rounded bg-[#CD2444] px-4 py-2 text-xl text-white hover:cursor-pointer">
            <Link href="/calculate-vertical">Calculate Your Vertical</Link>
          </button>
        </div>
      </div>
    </div>
  )
}
