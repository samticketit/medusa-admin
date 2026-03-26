import { QueryClient } from "@tanstack/react-query"

let medusaUrl = "https://fuji-medusa.herokuapp.com"

if (__MEDUSA_BACKEND_URL__) {
  medusaUrl = __MEDUSA_BACKEND_URL__
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 90000,
      retry: 1,
    },
  },
})

export { medusaUrl, queryClient }
