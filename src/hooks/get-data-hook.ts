import { reactQuery } from '../react-query-helpers';
import { getWeekTerritories } from '../features/map/api/get-territories';
import { saveWeeksInServer } from '../features/support-tool/api/save-territories';

export function useSaveWeeksInServer() {
  return reactQuery('save', saveWeeksInServer);
}

export function useTerritories(week: number) {
  return reactQuery('territory', getWeekTerritories, week);
}
