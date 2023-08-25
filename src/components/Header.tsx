import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { faRulerVertical, faBars, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Header() {
  const [isMobileNavbarOpened, setIsMobileNavbarOpened] = useState(false)
  function toggleMobileNavbar() {
    setIsMobileNavbarOpened(!isMobileNavbarOpened)
  }

  return (
    <header className="bg-[#CD2444] px-16 text-lg text-[#FFFFFF]">
      <ul className="flex h-20 items-center justify-between ">
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

        <div>
          <button
            className="block sm:hidden"
            onClick={toggleMobileNavbar}
          >
            {isMobileNavbarOpened && (
              <FontAwesomeIcon
                className="text-xl"
                icon={faX}
              />
            )}
            {!isMobileNavbarOpened && (
              <FontAwesomeIcon
                className="text-xl"
                icon={faBars}
              />
            )}
          </button>

          <div className="hidden items-center justify-center sm:flex">
            <li>
              <Link href="/calculate-vertical">Calculate My Vertical</Link>
            </li>
            <li className="pl-8 ">
              <Link href="/faq">FAQ</Link>
            </li>
          </div>
        </div>
      </ul>

      {isMobileNavbarOpened && (
        <div className="bg-[#CD2444] sm:hidden">
          <ul className="flex flex-col items-end">
            <li className="pb-4">
              <Link
                href="/calculate-vertical"
                onClick={() => {
                  toggleMobileNavbar()
                }}
              >
                Calculate My Vertical
              </Link>
            </li>
            <li className="pb-4 ">
              <Link
                href="/faq"
                onClick={() => {
                  toggleMobileNavbar()
                }}
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
