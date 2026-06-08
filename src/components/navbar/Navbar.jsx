// src/components/navbar/Navbar.jsx
import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ currentPage, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home',         page: 'home'        },
    { label: 'Products',     page: 'inventory'   },
    { label: 'About Us',     page: 'about'       },
    { label: 'Distributor',  page: 'distributor' },
    { label: 'AI Assistant', page: 'chat'        },
  ];

  const handleNavigate = (page) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner">

        <button className="navbar-logo" onClick={() => handleNavigate('home')}>
          <span className="logo-text">
            <span>Bhavishya</span> Oil
          </span>
        </button>

        <ul className="navbar-links">
          {navLinks.map(link => (
            <li key={link.page}>
              <button
                className={`nav-link ${currentPage === link.page ? 'active' : ''}`}
                onClick={() => handleNavigate(link.page)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="navbar-auth">
          <button className="btn-nav-login" onClick={() => handleNavigate('chat')}>
            Ask AI
          </button>
          <button className="btn-nav-register" onClick={() => handleNavigate('distributor')}>
            Order Now
          </button>
        </div>

        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      {menuOpen && (
        <div className="navbar-mobile-menu">
          {navLinks.map(link => (
            <button
              key={link.page}
              className={`mobile-link ${currentPage === link.page ? 'active' : ''}`}
              onClick={() => handleNavigate(link.page)}
            >
              {link.label}
            </button>
          ))}
          <button className="mobile-link" onClick={() => handleNavigate('distributor')}>
            Order Now
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;