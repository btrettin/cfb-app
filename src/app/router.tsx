import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
  createBrowserRouter,
  LoaderFunctionArgs,
  RouterProvider,
} from 'react-router-dom';
import { Home, homeLoader } from './routes/app/home';
import { NotFound } from './routes/not-found';

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: '/',
      lazy: async () => {
        const { Home } = await import('./routes/app/home');
        return { Component: Home };
      },
      loader: async () => {
        const { homeLoader } = await import('./routes/app/home');
        return homeLoader(queryClient)();
      },
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
