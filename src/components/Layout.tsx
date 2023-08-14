import React from 'react'
import Header from './Header'

export default function Layout(props: any) {
  const { children } = props

  return (
    <div className="flex min-h-screen flex-col bg-[#F3F7F0]">
      <Header />

      <main>{children}</main>
    </div>
  )
}
