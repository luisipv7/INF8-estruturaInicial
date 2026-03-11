import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import TodoPage from './pages/TodoPage/TodoPage';

/**
 * App — root router and layout wrapper
 */
export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/"      element={<TodoPage />} />
          <Route path="*"      element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
