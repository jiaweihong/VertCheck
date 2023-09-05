import React from 'react'
import Link from 'next/link'
import { faEnvelope, faRulerVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Footer() {
  return (
    <div className="flex justify-center border-t-2 border-[#CD2444] bg-[#FFFFFF] py-5 text-[#19323C]">
      <div className="grid w-[80%] max-w-[1800px] auto-cols-max gap-4 md:justify-around">
        <div className="">
          <Link
            href="/"
            className="font-bebasNeue text-2xl text-[#CD2444]"
          >
            <FontAwesomeIcon
              className="pr-2"
              icon={faRulerVertical}
            />
            VertCheck
          </Link>

          <p className="">Measure your vertical online</p>
        </div>

        <div className="">
          <p className="text-xl text-[#222660]">Browse</p>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/calculate-vertical">Calculate My Vertical</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
          </ul>
        </div>

        <div className="md:col-start-2 lg:col-start-3">
          <p className="text-xl text-[#222660]">Contact Us</p>

          <ul>
            <li>
              <a href="mailto: vertcheck@gmail.com">
                <FontAwesomeIcon
                  className="pr-2"
                  icon={faEnvelope}
                />
                vertcheck@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
