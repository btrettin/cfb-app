import React from 'react';
import { Container, Box } from '@mui/material';
import { styled } from '@mui/system';

const RootContainer = styled(Container)(() => ({
  padding: '0 !important',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100% !imporant',
  maxWidth: '100% !important',
  backgroundColor: 'orange',
}));

export default function AppLayout({ children }) {
  return (
    <RootContainer maxWidth="xl">
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {children}
      </Box>
    </RootContainer>
  );
}
