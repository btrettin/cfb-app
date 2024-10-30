import { QueryClient } from '@tanstack/react-query';
import { getTerritoryQueryOptions } from '@/features/map/api/get-territories';

export function homeLoader(queryClient: QueryClient) {
  return async function () {
    return await queryClient.fetchQuery(getTerritoryQueryOptions(1));
  };
}
