import { getWeekTerritories, saveWeeksInServer } from '../services/api';
import { reactQuery } from '../react-query-helpers';

export function useSaveWeeksInServer() {
  return reactQuery('save', saveWeeksInServer);
}

export function useTerritories(week: number) {
  return reactQuery('territory', getWeekTerritories, week);
}
