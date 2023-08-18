import Link from 'next/link'
import React from 'react'
import { faRulerVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Header() {
  return (
    <ul className="flex h-20 items-center justify-between bg-[#CD2444] px-16 text-lg text-[#FFFFFF]">
      <li className="text-2xl">
        <FontAwesomeIcon
          className="pr-2"
          icon={faRulerVertical}
        />
        <Link
          href="/"
          className="font-bebasNeue"
        >
          VertCheck
        </Link>
      </li>

      <div className="flex items-center justify-center">
        <li className="">
          <Link href="/calculate-vertical">Calculate My Vertical</Link>
        </li>
        <li className="pl-8 ">
          <Link href="/faq">FAQ</Link>
        </li>
      </div>
    </ul>
  )
}
