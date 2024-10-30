import React from 'react';
import './territory-map.css';
import { useMap } from '@/hooks/useMap';
import useScreen from '@/hooks/useScreen';
import { ASPECT_RATIO } from '@/constants';
import { Box } from '@mui/material';

export default function TerritoryMap() {
  const { mapRef } = useMap();
  const { width } = useScreen();

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div id="tooltip" className="tooltip"></div>
      <svg
        ref={mapRef}
        width={width}
        height={width / ASPECT_RATIO}
        style={{ backgroundColor: 'white' }}
      />
    </Box>
  );
}
