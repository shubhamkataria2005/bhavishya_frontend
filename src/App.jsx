// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx';
import HomePage from './pages/homePage/HomePage.jsx';
import InventoryPage from './pages/inventory/InventoryPages.jsx';
import AboutPage from './pages/aboutPage/AboutPage.jsx';
import DistributorPage from './pages/distributorPage/DistributorPage.jsx';
import ChatAssistant from './components/tools/ChatAssistant.jsx';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <Router>
      <AppContent
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
    </Router>
  );
}

function AppContent({ currentPage, onNavigate }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/' && currentPage !== 'home') onNavigate('home');
    else if (path === '/products' && currentPage !== 'inventory') onNavigate('inventory');
    else if (path === '/about' && currentPage !== 'about') onNavigate('about');
    else if (path === '/distributor' && currentPage !== 'distributor') onNavigate('distributor');
    else if (path === '/chat' && currentPage !== 'chat') onNavigate('chat');
  }, [location.pathname]);

  useEffect(() => {
    switch (currentPage) {
      case 'home':        if (location.pathname !== '/') navigate('/'); break;
      case 'inventory':   if (location.pathname !== '/products') navigate('/products'); break;
      case 'about':       if (location.pathname !== '/about') navigate('/about'); break;
      case 'distributor': if (location.pathname !== '/distributor') navigate('/distributor'); break;
      case 'chat':        if (location.pathname !== '/chat') navigate('/chat'); break;
      default:            if (location.pathname !== '/') navigate('/');
    }
  }, [currentPage, navigate, location.pathname]);

  const ChatPage = () => (
    <div style={{ padding: '40px 32px', maxWidth: '800px', margin: '0 auto', height: '80vh', display: 'flex', flexDirection: 'column' }}>
      <ChatAssistant />
    </div>
  );

  return (
    <div className="App">
      <Navbar
        currentPage={currentPage}
        onNavigate={onNavigate}
      />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage onNavigate={onNavigate} />} />
          <Route path="/products" element={<InventoryPage onNavigate={onNavigate} />} />
          <Route path="/about" element={<AboutPage onNavigate={onNavigate} />} />
          <Route path="/distributor" element={<DistributorPage onNavigate={onNavigate} />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="*" element={<HomePage onNavigate={onNavigate} />} />
        </Routes>
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

export default App;