import AppLayout from '@/layouts/AppLayout'
import '@/styles/index.sass'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}
