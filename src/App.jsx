import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Squares from './components/Squares';
import { NavbarProvider } from './contexts/NavbarContext';
import { AdminProvider } from './contexts/AdminContext';
import { useTheme } from './contexts/ThemeContext';
import FloatingThemeToggle from './components/FloatingThemeToggle';

// Pages
import Home from './pages/Home';

function App() {
  const { theme } = useTheme();
  const location = useLocation();

  return (
    <AdminProvider>
      <NavbarProvider>
        <div className="relative min-h-screen dark:bg-[#060010] bg-slate-50 transition-colors duration-500 overflow-hidden">
          {/* Global Background Animation */}
          <div className="fixed inset-0 z-0">
            <Squares
              speed={0.25}
              squareSize={38}
              borderColor={theme === 'dark' ? "rgba(167, 139, 250, 0.04)" : "rgba(15, 23, 42, 0.05)"}
              hoverFillColor={theme === 'dark' ? "rgba(0, 255, 208, 0.12)" : "rgba(139, 92, 246, 0.08)"}
              gradientColorStart={theme === 'dark' ? "#060312" : "#f8fafc"}
              gradientColorEnd={theme === 'dark' ? "#14072b" : "#f1f5f9"}
            />
          </div>

          <Header />

          {/* Page Routing with Transitions */}
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
            </Routes>
          </AnimatePresence>

          <FloatingThemeToggle />
        </div>
      </NavbarProvider>
    </AdminProvider>
  );
}

export default App;
