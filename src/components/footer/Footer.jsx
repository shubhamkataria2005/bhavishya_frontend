// src/components/footer/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = ({ onNavigate }) => {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-brand">
          <button className="footer-logo" onClick={() => onNavigate('home')}>
            <span>Bhavishya</span> Oil
          </button>
          <p>Pure Kachi Ghani Mustard Oil enriched with Vitamin A & D. Free from Argemone Oil. Trusted by families across Northern India.</p>
          <span className="footer-tagline">Oil For Healthy Life — Est. Sonipat, Haryana</span>
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <a href="https://facebook.com/bhavishyaoil" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: '600' }}>
              f bhavishyaoil
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Products</h4>
          <button onClick={() => onNavigate('inventory')}>200ml Pack</button>
          <button onClick={() => onNavigate('inventory')}>500ml Pack</button>
          <button onClick={() => onNavigate('inventory')}>1 Litre Pack</button>
          <button onClick={() => onNavigate('inventory')}>2 Litre Pack</button>
          <button onClick={() => onNavigate('inventory')}>15 Litre Bulk</button>
          <button onClick={() => onNavigate('inventory')}>15 Kg Tin</button>
        </div>

        <div className="footer-links">
          <h4>Company</h4>
          <button onClick={() => onNavigate('home')}>Home</button>
          <button onClick={() => onNavigate('about')}>About Us</button>
          <button onClick={() => onNavigate('distributor')}>Become a Distributor</button>
          <button onClick={() => onNavigate('login')}>Sign In</button>
          <button onClick={() => onNavigate('register')}>Create Account</button>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Surender Kala & Sons Pvt. Ltd.</p>
          <p>Khasra No-11/20/2, Shahpur Turk</p>
          <p>Sector-18, Sonipat, Haryana-131001</p>
          <p style={{ marginTop: '8px' }}>+91-9653550600</p>
          <p>contact@bhavishyaoil.com</p>
          <p>www.bhavishyaoil.com</p>
          <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>FSSAI: 10019064002099</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>ISO 22000:2018 & 9001:2015</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>Trade Mark No. 3268585</span>
          </div>
        </div>

      </div>
      <div className="footer-bottom">
        <p>© 2025 Surender Kala & Sons Private Limited. All rights reserved. Bhavishya® is a registered trademark.</p>
        <div className="footer-bottom-right">
          <span>Privacy Policy</span>
          <span>Terms of Use</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;