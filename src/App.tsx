import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { PropertyProvider } from './context/PropertyContext';
import { AdminAuthProvider } from './pages/admin/AdminAuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';

// Public Pages
import { Home } from './pages/Home';
import { Properties } from './pages/Properties';
import { PropertyDetails } from './pages/PropertyDetails';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

// Admin Pages
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminPropertyList } from './pages/admin/AdminPropertyList';
import { AdminPropertyForm } from './pages/admin/AdminPropertyForm';
import { AdminLeads } from './pages/admin/AdminLeads';

// Public Layout wrapper with standard website Navbar & Footer
const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-brand-ivory text-brand-dark selection:bg-brand-gold selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <PropertyProvider>
      <AdminAuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Admin Authentication & Management Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="properties" element={<AdminPropertyList />} />
              <Route path="properties/new" element={<AdminPropertyForm />} />
              <Route path="properties/edit/:id" element={<AdminPropertyForm />} />
              <Route path="leads" element={<AdminLeads />} />
            </Route>

            {/* Public Website Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:slug" element={<PropertyDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </AdminAuthProvider>
    </PropertyProvider>
  );
};

export default App;
