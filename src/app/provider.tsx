import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { MainErrorFallback } from '@/components/errors/main';
import LoadingSpinner from '../components/ui/spinner';
import { queryConfig } from '../lib/react-query';
import { createTheme, ThemeProvider } from '@mui/material';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      })
  );

  return (
    <ThemeProvider theme={createTheme({})}>
      <React.Suspense
        fallback={
          <div className="flex h-screen w-screen items-center justify-center">
            <LoadingSpinner />
          </div>
        }
      >
        <ErrorBoundary FallbackComponent={MainErrorFallback}>
          <QueryClientProvider client={queryClient}>
            {import.meta.env.DEV && <ReactQueryDevtools />}
            {children}
          </QueryClientProvider>
        </ErrorBoundary>
      </React.Suspense>
    </ThemeProvider>
  );
};
