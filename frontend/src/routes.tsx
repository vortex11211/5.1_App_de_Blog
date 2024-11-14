/*import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;*/


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
//import ProfilePage from './pages/ProfilePage';
import Header from './components/Common/Header';
import EditProfilePage from './pages/EditProfilePage';
import MyPublicationsPage from './pages/MyPublicationsPage';
import EditPublicationPage from './pages/EditPublicationPage';

/*import CreatePublicationPage from './pages/CreatePublicationPage';
i
import LogoutPage from './pages/LogoutPage';*/


const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <HomePage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <EditProfilePage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-publications"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <MyPublicationsPage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-publication/:id"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <EditPublicationPage />
                </>
              </ProtectedRoute>
            }
          />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
