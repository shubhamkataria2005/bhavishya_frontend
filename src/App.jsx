// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx';
import HomePage from './pages/homePage/HomePage.jsx';
import InventoryPage from './pages/inventory/InventoryPages.jsx';
import AboutPage from './pages/aboutPage/AboutPage.jsx';
import DistributorPage from './pages/distributorPage/DistributorPage.jsx';
import LoginPage from './pages/loginPage/LoginPage.jsx';
import RegisterPage from './pages/registerPage/RegisterPage.jsx';
import AdminPage from './pages/admin/AdminPage.jsx';
import MessagesPage from './pages/messagesPage/MessagesPage.jsx';
import DashboardPage from './pages/dashboardPage/DashboardPage.jsx';
import ChatAssistant from './components/tools/ChatAssistant.jsx';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [sessionToken, setSessionToken] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const storedToken = localStorage.getItem('bhavishya_token');
    const storedUser = localStorage.getItem('bhavishya_user');
    if (storedToken && storedUser) {
      setSessionToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleNavigate = (page) => setCurrentPage(page);

  const handleLoginSuccess = (userData, token) => {
    setUser(userData);
    setSessionToken(token);
    localStorage.setItem('bhavishya_token', token);
    localStorage.setItem('bhavishya_user', JSON.stringify(userData));
    if (userData.role === 'ADMIN' || userData.role === 'SUPER_ADMIN') {
      setCurrentPage('admin');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setSessionToken(null);
    localStorage.removeItem('bhavishya_token');
    localStorage.removeItem('bhavishya_user');
    setCurrentPage('home');
  };

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
    if (path === '/') onNavigate('home');
    else if (path === '/products') onNavigate('inventory');
    else if (path === '/about') onNavigate('about');
    else if (path === '/distributor') onNavigate('distributor');
    else if (path === '/chat') onNavigate('chat');
    else if (path === '/login') onNavigate('login');
    else if (path === '/register') onNavigate('register');
    else if (path === '/admin') onNavigate('admin');
    else if (path === '/messages') onNavigate('messages');
    else if (path === '/dashboard') onNavigate('dashboard');
  }, [location.pathname]);

  useEffect(() => {
    const map = {
      home: '/',
      inventory: '/products',
      about: '/about',
      distributor: '/distributor',
      chat: '/chat',
      login: '/login',
      register: '/register',
      admin: '/admin',
      messages: '/messages',
      dashboard: '/dashboard',
    };
    const target = map[currentPage] || '/';
    if (location.pathname !== target) navigate(target);
  }, [currentPage]);

  const ChatPage = () => (
    <div style={{ padding: '40px 32px', maxWidth: '800px', margin: '0 auto', height: '80vh', display: 'flex', flexDirection: 'column' }}>
      <ChatAssistant user={user} />
    </div>
  );

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
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage onLoginSuccess={onLoginSuccess} onNavigate={onNavigate} />} />
          <Route path="/register" element={<RegisterPage onLoginSuccess={onLoginSuccess} onNavigate={onNavigate} />} />
          <Route path="/admin" element={<AdminPage user={user} sessionToken={sessionToken} onNavigate={onNavigate} />} />
          <Route path="/messages" element={<MessagesPage user={user} sessionToken={sessionToken} onNavigate={onNavigate} />} />
          <Route path="/dashboard" element={<DashboardPage user={user} sessionToken={sessionToken} onNavigate={onNavigate} />} />
          <Route path="*" element={<HomePage onNavigate={onNavigate} />} />
        </Routes>
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

export default App;