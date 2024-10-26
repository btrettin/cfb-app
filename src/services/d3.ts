// Set up a projection and path generator
import * as d3 from 'd3';
import { CountyFeature, SvgSelection } from '../types/types';

const width = 960;
const height = 600;

export function getProjectionAndPath() {
  const projection = d3
    .geoAlbersUsa()
    .scale(1280)
    .translate([width / 2, height / 2]);
  const path = d3.geoPath().projection(projection);

  return { projection, path };
}

export function fillCountyColor(
  mapSvg: SvgSelection,
  countyFeatures: CountyFeature[],
  path: d3.GeoPath<any, d3.GeoPermissibleObjects>
) {
  const tooltip = d3.select('#tooltip');
  mapSvg
    .selectAll('path')
    .data(countyFeatures, (d: any) => d.properties.name)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('fill', (county) => county.teamOwner.color)
    .attr('stroke', 'black')
    .attr('stroke-width', 0.5)
    .on('mouseover', (event, d) => {
      // Show tooltip on hover
      tooltip
        .style('display', 'block')
        .html(
          `<strong>County:</strong> ${d.properties?.name}<br>` +
            `<strong>County Id:</strong> ${d.id}` +
            `<strong>Team Ownership:</strong> ${d.teamOwner?.school}`
        );
    })
    .on('mousemove', (event) => {
      // Move the tooltip with the mouse
      tooltip
        .style('left', event.pageX + 10 + 'px') // Position 10px to the right of the mouse
        .style('top', event.pageY + 10 + 'px'); // Position 10px below the mouse
    })
    .on('mouseout', () => {
      // Hide the tooltip when the mouse leaves the county
      tooltip.style('display', 'none');
    });
}

export function fillCountyLogo(
  mapSvg: SvgSelection,
  counties: CountyFeature[],
  path: d3.GeoPath<any, d3.GeoPermissibleObjects>
) {
  const countiesByTeamId = groupCountiesByTeamId(counties);

  Object.keys(countiesByTeamId).forEach((teamId) => {
    const groups = findTouchingGroups(countiesByTeamId[teamId], counties);

    groups.forEach((group) => {
      const totalCentroid = group.reduce(
        (acc, county) => {
          const [cx, cy] = path.centroid(county);
          acc[0] += cx;
          acc[1] += cy;
          return acc;
        },
        [0, 0]
      );

      const groupCentroidX = totalCentroid[0] / group.length;
      const groupCentroidY = totalCentroid[1] / group.length;

      mapSvg
        .append('image')
        .attr('xlink:href', group[0]?.teamOwner.logos[1])
        .attr('width', 20)
        .attr('height', 20)
        .attr('x', groupCentroidX - 10)
        .attr('y', groupCentroidY - 10);
    });
  });
}

function findTouchingGroups(
  group: CountyFeature[],
  counties: CountyFeature[]
): CountyFeature[][] {
  const visited: boolean[] = new Array(group.length).fill(false);
  const touchingGroups: any[] = [];

  group.forEach((countyFeature, index) => {
    if (!visited[index]) {
      const stack = [countyFeature];
      const currentGroup: any[] = [];

      while (stack.length) {
        const currentCountyData = stack.pop();
        if (!currentCountyData) continue;
        const currentIndex = group.indexOf(currentCountyData);

        if (!visited[currentIndex]) {
          visited[currentIndex] = true;
          currentGroup.push(currentCountyData);

          currentCountyData.neighborIndexes.forEach((neighborIndex: number) => {
            const neighborCounty = counties[neighborIndex];
            if (
              neighborCounty &&
              neighborCounty.teamOwner.id === currentCountyData.teamOwner.id &&
              !visited[group.indexOf(neighborCounty)]
            ) {
              stack.push(neighborCounty);
            }
          });
        }
      }

      if (currentGroup.length >= 2) {
        touchingGroups.push(currentGroup);
      }
    }
  });

  return touchingGroups;
}

function groupCountiesByTeamId(
  counties: CountyFeature[]
): Record<string, CountyFeature[]> {
  const groupedCounties: Record<string, any[]> = {};
  counties.forEach((county) => {
    const countyTeam = county.teamOwner.id;
    if (!groupedCounties[countyTeam]) {
      groupedCounties[countyTeam] = [];
    }
    groupedCounties[countyTeam].push(county);
  });

  return groupedCounties;
}
