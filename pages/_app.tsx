import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import NAVBAR from '../components/NAVBAR/navbar'
import FOOTER from '../components/FOOTER/footer'

export default function App({ Component, pageProps }: AppProps) {
  return <>
      <NAVBAR/>
      <Component {...pageProps} />
      <FOOTER/>

      </>
}
