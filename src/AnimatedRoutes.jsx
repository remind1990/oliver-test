import React from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AppLayout from './pages/AppLayout';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import EditPanel from './pages/EditPanel';
import { AnimatePresence } from 'framer-motion';

export default function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route index element={<Navigate replace to="home" />} />
        <Route element={<AppLayout />} className="fade">
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/:id" element={<EditPanel />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AnimatePresence>
  );
}
