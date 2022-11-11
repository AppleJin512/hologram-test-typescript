import '../styles/globals.css'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import type { Web3Provider as ProviderType } from '@ethersproject/providers/lib/web3-provider'
import type { AppProps } from 'next/app'

function getLibrary(provider: any): ProviderType {
  return new Web3Provider(provider);
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  )
}
