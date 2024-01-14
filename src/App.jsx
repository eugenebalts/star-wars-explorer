import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/main-page/main-page';
import CharacterPage from './pages/character-page/character-page';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/people/:id" element={<CharacterPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
