import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/main-page/main-page';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}
