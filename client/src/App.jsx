import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider }   from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import ProtectedRoute     from './components/shared/ProtectedRoute';
import Navbar             from './components/shared/Navbar';
import Login              from './components/auth/Login';
import Register           from './components/auth/Register';
import EditorPage         from './pages/EditorPage';
import DashboardPage      from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ResumeProvider>
          <Navbar />
          <Routes>
            <Route path="/"          element={<Navigate to="/dashboard" replace />} />
            <Route path="/login"     element={<Login />} />
            <Route path="/register"  element={<Register />} />
            <Route path="/dashboard" element={
              <ProtectedRoute><DashboardPage /></ProtectedRoute>
            } />
            <Route path="/editor/:id?" element={
              <ProtectedRoute><EditorPage /></ProtectedRoute>
            } />
          </Routes>
        </ResumeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;