import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ListingList from './components/listings/ListingList';
import ListingForm from './components/listings/ListingForm';
import MyListings from './components/listings/MyListings';
import AddListing from './components/listings/AddListing';
import ListingDetail from './components/listings/ListingDetail';
import "./App.css";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<ListingList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            

              {/* Protected Routes - Owner Only */}
              <Route
                path="/listings/:id"
                element={
                  <ProtectedRoute allowedRoles={['renter', 'owner']}>
                    <ListingDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-listing"
                element={
                  <ProtectedRoute allowedRoles={['owner']}>
                     <AddListing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-listings"
                element={
                  <ProtectedRoute allowedRoles={['owner']}>
                    <MyListings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-listing/:id"
                element={
                  <ProtectedRoute allowedRoles={['owner']}>
                    <ListingForm />
                  </ProtectedRoute>
                }
              />

              {/* 404 Route */}
              <Route
                path="*"
                element={
                  <div className="flex items-center justify-center h-screen">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold mb-4">404</h1>
                      <p className="text-xl">Page not found</p>
                    </div>
                  </div>
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