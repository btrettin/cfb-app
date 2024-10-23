import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Week from './pages/Week';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Week />
    </QueryClientProvider>
  );
}

export default App;
