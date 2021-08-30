import 'styles/globals.scss'
import type { AppProps } from 'next/app'
import { usePageView } from 'hooks/usePageView'

function MyApp({ Component, pageProps }: AppProps) {
  usePageView()

  return (<Component {...pageProps} />)
}
export default MyApp
