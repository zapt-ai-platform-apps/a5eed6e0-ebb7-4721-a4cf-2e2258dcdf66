import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';
import AuthComponent from './components/Auth';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import Members from './pages/Members';
import Transactions from './pages/Transactions';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import './index.css';

function App(): JSX.Element {
  const { signOut, user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation signOut={signOut} user={user} />
      <div className="flex-grow">
        <Routes>
          <Route path="/auth" element={<AuthComponent />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <Books />
              </ProtectedRoute>
            }
          />
          <Route
            path="/members"
            element={
              <ProtectedRoute>
                <Members />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;