import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PilotRegister from './pages/pilot/Register';
import './index.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pilot/register" element={<PilotRegister />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
