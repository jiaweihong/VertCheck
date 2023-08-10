import React from 'react'
import Header from './Header'

export default function Layout(props: any) {
  const { children } = props

  return (
    <div className="flex min-h-screen flex-col bg-sky-100 px-32">
      <Header />

      <main>{children}</main>
    </div>
  )
}
