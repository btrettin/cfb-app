import { useEffect, useRef, useState } from 'react';
import { fillCountyColor, fillCountyLogo } from '../services/d3';
import { useTeams } from './useTeams';
import { useD3 } from './useD3';
import { CountyFeature, TeamsById } from '../types/types';
import { useTerritories } from './get-data-hook';

export function useWeek(week: number) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { teamsById } = useTeams();
  const { countyFeatures, svg, path } = useD3(svgRef);
  const { isFetching, data: territories } = useTerritories(week);

  console.log('on week', week);
  useEffect(() => {
    if (
      !svgRef.current ||
      isFetching ||
      !countyFeatures ||
      !svg ||
      !path ||
      !teamsById ||
      !territories
    ) {
      return;
    }

    svg.selectAll('*').remove();
    const updatedCountyFeatures = updateFeatureTeamOwners(
      countyFeatures,
      territories,
      teamsById
    );

    assignEmptyCounties(updatedCountyFeatures);
    fillCountyColor(svg, updatedCountyFeatures, path);
    fillCountyLogo(svg, updatedCountyFeatures, path);
  }, [countyFeatures, svg, path, teamsById, territories, svgRef]);

  return { svgRef };
}

export function updateFeatureTeamOwners(
  countyFeatures: CountyFeature[],
  territory: Record<string, string>,
  teamsById: TeamsById
): CountyFeature[] {
  return countyFeatures.map((countyFeature) => {
    const teamId: string = territory[countyFeature.id ?? ''];

    return {
      ...countyFeature,
      teamOwner: teamsById[teamId],
    };
  });
}

function assignEmptyCounties(countyFeaturesWeek1: CountyFeature[]) {
  const ownerCounties = countyFeaturesWeek1.filter(
    (county) => county.teamOwner
  );

  countyFeaturesWeek1.forEach((unassignedCounties) => {
    if (!unassignedCounties.teamOwner) {
      const unassignedPixelCenter = unassignedCounties.pixelCenter; // Use the existing pixelCenter

      let nearestCounty = null;
      let minDistance = Infinity;

      ownerCounties.forEach((ownedCounty) => {
        const ownedPixelCenter = ownedCounty.pixelCenter;

        const distance = Math.sqrt(
          Math.pow(unassignedPixelCenter.cx - ownedPixelCenter.cx, 2) +
            Math.pow(unassignedPixelCenter.cy - ownedPixelCenter.cy, 2)
        );

        if (distance < minDistance) {
          minDistance = distance;
          nearestCounty = ownedCounty;
        }
      });

      if (nearestCounty) {
        unassignedCounties.teamOwner = nearestCounty?.teamOwner;
      } else {
        unassignedCounties.teamOwner = {
          color: 'black',
        };
      }
    }
  });

  return countyFeaturesWeek1;
}
