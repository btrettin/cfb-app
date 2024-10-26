import React from 'react';
import { useMap } from '../../../hooks/useMap';
import { Container } from '@mui/material';

export default function TerritoryMap() {
  const { mapRef } = useMap();

  return (
    <Container
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
        width="960"
        height="600"
        style={{ backgroundColor: '#f9f9f9' }}
      />
    </Container>
  );
}
