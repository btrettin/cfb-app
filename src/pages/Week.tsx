import './Map.css';
import { useWeek } from '../hooks/useWeek';
import Dropdown from '../components/Dropdown';
import React, { useState } from 'react';
import { range } from 'lodash';
import { useSaveWeeksInServer } from '../hooks/get-data-hook';
import { Container, Grid } from '@mui/material';

export default function Week() {
  useSaveWeeksInServer();
  const [selectedOption, setSelectedOption] = useState<string>('1');
  const { svgRef } = useWeek(parseInt(selectedOption, 10));
  const weeks = range(0, 15).map(String);

  return (
    <Container sx={{ padding: '16px', width: '100%' }}>
      <h3>Week {selectedOption}</h3>
      <Dropdown
        options={weeks}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
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
          ref={svgRef}
          width="960"
          height="600"
          style={{ backgroundColor: '#f9f9f9' }}
        />
      </Container>
    </Container>
  );
}
