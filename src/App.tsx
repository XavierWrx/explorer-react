import type { JSX } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Footer } from './components/organisms/Footer';
import { CountryDetailPage } from './pages/CountryDetailPage';
import { HomePage } from './pages/HomePage';

export function App(): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-surface-color-background text-texto-secondary">
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/country" element={<CountryDetailPage />} />
          <Route path="/country/:code" element={<CountryDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
