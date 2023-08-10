import Layout from '../components/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  console.log('Layoutasd');
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
