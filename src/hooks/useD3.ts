import { useTeams } from './useTeams';
import { getProjectionAndPath } from '../services/d3';
import React, { useMemo } from 'react';
import * as d3 from 'd3';
import { Feature, FeatureCollection, Geometry } from 'geojson';
import * as topojson from 'topojson-client';
import { neighbors } from 'topojson-client';
import { Team } from '../types/api-types';
import { CountyFeature, SvgSelection } from '../types/types';
import mapJson from '../data/topo.json';
import { getClosest } from '../services/coordinate-helpers';

const mapData: any = mapJson;

export function useD3(
  svgElement: React.MutableRefObject<SVGSVGElement | null>
) {
  const { teams } = useTeams();

  const { path } = useMemo(() => getProjectionAndPath(), []);

  const countyFeatures = useMemo(() => {
    if (!teams) return null;
    const topoJsonData = mapData.objects.counties.geometries;
    const countyNeighbors = neighbors(topoJsonData);
    return getInitialCountyFeatures(path, teams, countyNeighbors);
  }, [teams, path]);

  const svg: SvgSelection = useMemo(() => {
    return d3.select(svgElement.current as SVGSVGElement);
  }, [svgElement.current]);

  return { countyFeatures: countyFeatures || [], svg, path };
}

function getInitialCountyFeatures(
  path: d3.GeoPath<any, d3.GeoPermissibleObjects>,
  teams: Team[],
  countyNeighbors: number[][]
): CountyFeature[] {
  const features = getFeatures();
  return features.map((county, index) => {
    const [cx, cy] = path.centroid(county);
    const [longitude, latitude] = d3.geoCentroid(county);

    return {
      ...county,
      pixelCenter: { cx, cy },
      coordinateCenter: { longitude, latitude },
      neighborIndexes: countyNeighbors[index],
      teamOwner: getClosest({ longitude, latitude }, teams),
    };
  });
}

function getFeatures(): Feature[] {
  return (
    topojson.feature(
      mapData,
      mapData.objects.counties
    ) as unknown as FeatureCollection<Geometry>
  ).features;
}
