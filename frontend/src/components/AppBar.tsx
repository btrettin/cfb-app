import React from 'react';
import { Box, Typography } from '@mui/material';
import './appBar.css';

export default function AppBar() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        bgcolor: 'primary.main',
        color: 'white',
        p: 2,
        zIndex: 1100,
      }}
    >
      <Typography className={'heading'} variant="h3">
        US County Imperialism
      </Typography>
    </Box>
  );
}
