import { QueryClient } from '@tanstack/react-query';
import { getTerritoryQueryOptions } from '../../../features/map/api/get-territories';
import React from 'react';
import { Button, Container } from '@mui/material';
import WeekDropdown from './week-dropdown';
import TerritoryMap from './territory-map';

export function homeLoader(queryClient: QueryClient) {
  return async function () {
    return await queryClient.fetchQuery(getTerritoryQueryOptions(1));
  };
}

export function Home() {
  return (
    <Container sx={{ padding: '16px', width: '100%' }}>
      <TerritoryMap />
      <Container sx={{ mt: '48px' }}>
        <WeekDropdown />
      </Container>
      {/*<Button onClick={}>Generate Map</Button>*/}
    </Container>
  );
}
