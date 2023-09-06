import Layout from '../components/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { app } from '../../firebase'

export default function App({ Component, pageProps }: AppProps) {
  const a = app
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
