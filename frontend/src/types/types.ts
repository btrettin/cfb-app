import * as d3 from 'd3';
import { Team } from '../../../shared/types/api-types';
import { Feature } from 'geojson';

export type TeamsById = Record<string, Team>;
export type SvgSelection = d3.Selection<
  SVGSVGElement,
  unknown,
  null,
  undefined
>;

export type TeamTerritories = Record<string, string[]>;
export interface CountyFeature extends Feature {
  pixelCenter: {
    cx: number;
    cy: number;
  };
  coordinateCenter: {
    longitude: number;
    latitude: number;
  };
  neighborIndexes: number[];
  teamOwner: Team;
}

export type CountyTeamData = {
  teamId: number;
  color: string;
  logo: string;
};
