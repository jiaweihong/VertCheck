import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default function Layout(props: any) {
  const { children } = props

  return (
    <div className="flex min-h-screen flex-col bg-[#FFFFFF]">
      <Header />

      <main className="flex-1 bg-[#f1f0f0]">{children}</main>

      <Footer />
    </div>
  )
}
