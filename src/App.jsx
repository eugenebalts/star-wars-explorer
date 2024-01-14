import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/main-page/main-page';
import CharacterPage from './pages/character-page/character-page';
import NotFoundPage from './pages/not-found-page/not-found-page';
import Layout from './layouts/layout';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/people/:id" element={<CharacterPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
