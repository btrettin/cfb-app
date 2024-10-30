import { useQuery } from '@tanstack/react-query';

const STALE_TIME_MILLISECONDS = 1000 * 60 * 5 * 60;
export function useCustomReactQuery(key: string, fn: any, params?: any) {
  const { isError, isFetching, data } = useQuery({
    queryKey: [key, params],
    queryFn: () => fn(params),
    refetchOnWindowFocus: false,
    staleTime: STALE_TIME_MILLISECONDS,
  });

  return {
    isError,
    isFetching,
    data,
  };
}
