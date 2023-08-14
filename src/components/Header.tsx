import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <ul className="flex h-20 items-center justify-between bg-[#CD2444] px-16 text-lg text-[#FFFFFF]">
      <li className="text-2xl">
        <Link href="/">VertCheck</Link>
      </li>

      <div className="flex">
        <li className="pl-8 ">
          <Link href="/calculate-vertical">Calculate My Vertical</Link>
        </li>
        <li className="pl-8 ">
          <Link href="/faq">FAQ</Link>
        </li>
      </div>
    </ul>
  )
}
