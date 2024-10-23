import { Team } from '../types/api-types';
import { getTeamsData } from '../data/teams';
import { TeamsById } from '../types/types';
import { keyBy } from 'lodash';
import { useMemo } from 'react';

export function useTeams() {
  const teams: Team[] = useMemo(() => getTeamsData(), []);
  const teamsById: TeamsById = useMemo(() => keyBy(teams, 'id'), [teams]);

  return { teams, teamsById };
}
