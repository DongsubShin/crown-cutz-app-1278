import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// Note: Using standard react-router-dom for App entry point if not using @react-router/dev full framework
// But following the provided Routing Guide's structure:

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* React Router 7 handles the routing via the config file in a standard build */}
      {/* This file acts as the provider wrapper */}
    </QueryClientProvider>
  );
}