import * as turf from '@turf/turf';

export function getClosest(
  x: { longitude: number; latitude: number },
  teams: any[]
) {
  // Define the target point (x) as a GeoJSON point
  const targetPoint = turf.point([x.longitude, x.latitude]); // New York City [lon, lat]

  // Define a list of points (p)
  const points = teams.map((team) => {
    return turf.point([team.location.longitude, team.location.latitude], {
      team,
    });
  });

  const nearestPoint = turf.nearestPoint(
    targetPoint,
    turf.featureCollection(points)
  );
  return nearestPoint.properties.team;
}
