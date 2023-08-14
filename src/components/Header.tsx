import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <ul className="flex h-16 items-center justify-between bg-[#F2545B] px-16 text-xl text-[#F3F7F0]">
      <li className="hover:text-[#1ECBE1]">
        <Link href="/">VertCheck</Link>
      </li>

      <div className="flex">
        <li className="pl-8 hover:text-[#1ECBE1]">
          <Link href="/calculate-vertical">Calculate My Vertical</Link>
        </li>
        <li className="pl-8 hover:text-[#1ECBE1]">
          <Link href="/faq">FAQ</Link>
        </li>
      </div>
    </ul>
  )
}
