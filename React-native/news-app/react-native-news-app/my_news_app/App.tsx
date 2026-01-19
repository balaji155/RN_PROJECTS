import React from 'react';
import 'react-native-gesture-handler'
import Routes from './Routes/Routes';
import { QueryClient, QueryClientProvider } from 'react-query'

function App(): React.JSX.Element {
  const queryClient = new QueryClient()
  return (
     <QueryClientProvider client={queryClient}>
        <Routes />
     </QueryClientProvider>
  );
}

export default App;
