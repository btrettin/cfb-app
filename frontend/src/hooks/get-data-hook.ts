import { useCustomReactQuery } from '../react-query-helpers';
import { getWeekTerritories } from '../features/map/api/get-territories';
import { saveWeeksInServer } from '../features/support-tool/api/save-territories';

export function useSaveWeeksInServer() {
  return useCustomReactQuery('save', saveWeeksInServer);
}

export function useTerritories(week: number) {
  return useCustomReactQuery('territory', getWeekTerritories, week);
}
