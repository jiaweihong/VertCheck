import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <ul className="flex justify-between">
      <li>
        <Link href="/">VertCheck</Link>
      </li>

      <div className="flex">
        <li className="flex flex-col pl-8 text-black">
          <Link href="/calculate-vertical">Calculate My Vertical</Link>
        </li>
        <li className="pl-8">
          <Link href="/faq">FAQ</Link>
        </li>
      </div>
    </ul>
  )
}
