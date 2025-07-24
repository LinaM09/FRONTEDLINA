import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth'; // Importa ambos
import LoginForm from './components/Auth/LoginForm';
import AlbumsTable from './components/Data/AlbumsTable';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <AlbumsTable />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}


const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); 
  return user ? children : <Navigate to="/login" replace />;
};

export default App;