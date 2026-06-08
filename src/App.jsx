// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx';
import HomePage from './pages/homePage/HomePage.jsx';
import InventoryPage from './pages/inventory/InventoryPages.jsx';
import DashboardPage from './pages/dashboardPage/DashboardPage.jsx';
import LoginPage from './pages/loginPage/LoginPage.jsx';
import RegisterPage from './pages/registerPage/RegisterPage.jsx';
import AboutPage from './pages/aboutPage/AboutPage.jsx';
import DistributorPage from './pages/distributorPage/DistributorPage.jsx';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [sessionToken, setSessionToken] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleLoginSuccess = (userData, token) => {
    setUser(userData);
    setSessionToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setSessionToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentPage('home');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setSessionToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <AppContent
        user={user}
        sessionToken={sessionToken}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      />
    </Router>
  );
}

function AppContent({ user, sessionToken, currentPage, onNavigate, onLoginSuccess, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/' && currentPage !== 'home') onNavigate('home');
    else if (path === '/products' && currentPage !== 'inventory') onNavigate('inventory');
    else if (path === '/about' && currentPage !== 'about') onNavigate('about');
    else if (path === '/distributor' && currentPage !== 'distributor') onNavigate('distributor');
    else if (path === '/dashboard' && currentPage !== 'dashboard') onNavigate('dashboard');
    else if (path === '/login' && currentPage !== 'login') onNavigate('login');
    else if (path === '/register' && currentPage !== 'register') onNavigate('register');
  }, [location.pathname]);

  useEffect(() => {
    switch (currentPage) {
      case 'home':       if (location.pathname !== '/') navigate('/'); break;
      case 'inventory':  if (location.pathname !== '/products') navigate('/products'); break;
      case 'about':      if (location.pathname !== '/about') navigate('/about'); break;
      case 'distributor': if (location.pathname !== '/distributor') navigate('/distributor'); break;
      case 'dashboard':  if (location.pathname !== '/dashboard') navigate('/dashboard'); break;
      case 'login':      if (location.pathname !== '/login') navigate('/login'); break;
      case 'register':   if (location.pathname !== '/register') navigate('/register'); break;
      default:           if (location.pathname !== '/') navigate('/');
    }
  }, [currentPage, navigate, location.pathname]);

  return (
    <div className="App">
      <Navbar
        user={user}
        currentPage={currentPage}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage onNavigate={onNavigate} />} />
          <Route path="/products" element={<InventoryPage onNavigate={onNavigate} />} />
          <Route path="/about" element={<AboutPage onNavigate={onNavigate} />} />
          <Route path="/distributor" element={<DistributorPage user={user} sessionToken={sessionToken} onNavigate={onNavigate} />} />
          <Route path="/dashboard" element={
            user
              ? <DashboardPage user={user} sessionToken={sessionToken} onLogout={onLogout} onNavigate={onNavigate} />
              : <LoginPage onLoginSuccess={onLoginSuccess} onNavigate={onNavigate} />
          } />
          <Route path="/login" element={<LoginPage onLoginSuccess={onLoginSuccess} onNavigate={onNavigate} />} />
          <Route path="/register" element={<RegisterPage onLoginSuccess={onLoginSuccess} onNavigate={onNavigate} />} />
          <Route path="*" element={<HomePage onNavigate={onNavigate} />} />
        </Routes>
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

export default App;