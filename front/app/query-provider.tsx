"use client"

import { QueryClient, QueryClientProvider } from "react-query"

interface ReactQueryProviderProps {
  children: React.ReactNode
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  )
}
