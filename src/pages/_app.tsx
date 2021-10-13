import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app'
import { makeServer } from '../services/mirage'

import { QueryClient, QueryClientProvider } from 'react-query'

if(process.env.NODE_ENV === "development") {
  makeServer();
}

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}
export default MyApp
