import React from 'react';
import { Box } from '@mui/material';
import WeekDropdown from './week-dropdown';
import TerritoryMap from './territory-map';
import AppBar from '../../../../components/AppBar';

export function Home() {
  return (
    <Box sx={{ width: '100%', backgroundColor: 'red' }}>
      <AppBar />
      <Box sx={{ mt: '150px', backgroundColor: 'green' }}>
        <TerritoryMap />
      </Box>
      <Box sx={{ mt: '48px', backgroundColor: 'purple' }}>
        <WeekDropdown />
      </Box>
      {/*<Button onClick={}>Generate Map</Button>*/}
    </Box>
  );
}
