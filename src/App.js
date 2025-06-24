import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ListInvoices from './pages/ListInvoices';
import CreateInvoice from './pages/CreateInvoice';
import EditInvoice from './pages/EditInvoice';
import ShowInvoice from './pages/ShowInvoice';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';
import UserManagement from './pages/admin/UserManagement';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Protected Routes */}
              <Route
                path="/invoices"
                element={
                  <ProtectedRoute>
                    <ListInvoices />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-invoice"
                element={
                  <ProtectedRoute>
                    <CreateInvoice />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-invoice/:id"
                element={
                  <ProtectedRoute>
                    <EditInvoice />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/show-invoice/:id"
                element={
                  <ProtectedRoute>
                    <ShowInvoice />
                  </ProtectedRoute>
                }
              />
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserManagement />
                  </AdminRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App; 