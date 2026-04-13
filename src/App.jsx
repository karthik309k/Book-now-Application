import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FavouritesProvider } from './context/FavouritesContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import FavouritesPage from './components/FavouritesPage';
import NotFound from './components/NotFound';

const AuthRedirect = ({ children }) => {
  const token = Cookies.get('jwt_token');
  if (token) return <Navigate to="/" replace />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <FavouritesProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <AuthRedirect>
                <LoginForm />
              </AuthRedirect>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favourites"
            element={
              <ProtectedRoute>
                <FavouritesPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </FavouritesProvider>
    </BrowserRouter>
  );
}

export default App;
