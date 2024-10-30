import React, { useEffect, useRef } from 'react';
import { fillCountyColor, fillCountyLogo } from '@/services/d3';
import { useTeams } from './useTeams';
import { useD3 } from './useD3';
import { CountyFeature, TeamsById } from '@/types/types';
import { useTerritories } from './get-data-hook';
import { useUrlParams } from './useUrlParams';

type useMapResponse = {
  mapRef: React.MutableRefObject<SVGSVGElement | null>;
};

export function useMap(): useMapResponse {
  const { week } = useUrlParams();
  const mapRef = useRef<SVGSVGElement | null>(null);
  const { teamsById } = useTeams();
  const { countyFeatures, emptySvg, path } = useD3(mapRef);
  const { isFetching, data: territories } = useTerritories(week);

  useEffect(() => {
    function shouldUpdateMap(): boolean {
      return !(
        isFetching ||
        !mapRef.current ||
        !countyFeatures ||
        !emptySvg ||
        !path ||
        !teamsById ||
        !territories
      );
    }

    function updateMap() {
      emptySvg.selectAll('*').remove();
      const updatedCountyFeatures = updateFeatureTeamOwners(
        countyFeatures,
        territories,
        teamsById
      );

      const countiesWithAssignedEmpties = assignEmptyCounties(
        updatedCountyFeatures
      );
      fillCountyColor(emptySvg, countiesWithAssignedEmpties, path);
      fillCountyLogo(emptySvg, countiesWithAssignedEmpties, path);
    }

    if (shouldUpdateMap()) {
      updateMap();
    }
  }, [
    countyFeatures,
    emptySvg,
    path,
    teamsById,
    territories,
    mapRef,
    isFetching,
  ]);

  return { mapRef };
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

export function assignEmptyCounties(
  countyFeaturesWeek1: CountyFeature[]
): CountyFeature[] {
  const countiesWithAssignedEmpties: CountyFeature[] = [...countyFeaturesWeek1];
  const assignedCounties = countiesWithAssignedEmpties.filter(
    (county) => county.teamOwner
  );

  return countiesWithAssignedEmpties.map((county) => {
    if (county.teamOwner) return county;

    const unassignedPixelCenter = county.pixelCenter;

    let nearestCounty: CountyFeature | undefined = undefined;
    let minDistance = Infinity;

    assignedCounties.forEach((assignedCounty) => {
      const ownedPixelCenter = assignedCounty.pixelCenter;

      const distance = Math.sqrt(
        Math.pow(unassignedPixelCenter.cx - ownedPixelCenter.cx, 2) +
          Math.pow(unassignedPixelCenter.cy - ownedPixelCenter.cy, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestCounty = assignedCounty;
      }
    });

    if (nearestCounty) {
      return {
        ...county,
        teamOwner: (nearestCounty as CountyFeature).teamOwner,
      };
    }

    return county;
  });
}
