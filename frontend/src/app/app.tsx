import { AppProvider } from './provider';
import { AppRouter } from './router';
import React from 'react';
import AppLayout from '@/components/AppLayout';

function App() {
  return (
    <AppProvider>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </AppProvider>
  );
}

export default App;
