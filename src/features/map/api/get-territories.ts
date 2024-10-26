import { queryOptions } from '@tanstack/react-query';

export const getTerritoryQueryOptions = (week: number) => {
  return queryOptions({
    queryKey: ['territories', week],
    queryFn: () => getWeekTerritories(week),
  });
};

export async function getWeekTerritories(week: number) {
  try {
    const response = await fetch(`/api/territory/week/${week}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json(); // Parse JSON from the response
  } catch (error) {}
}
