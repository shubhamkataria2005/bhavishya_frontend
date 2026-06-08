// src/pages/homePage/HomePage.jsx
import React, { useState } from 'react';
import './HomePage.css';

const products = [
  {
    id: 1,
    name: 'Bhavishya Kachi Ghani Mustard Oil',
    size: '200ml',
    weight: '182g',
    price: 75,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
    badge: 'Popular'
  },
  {
    id: 2,
    name: 'Bhavishya Kachi Ghani Mustard Oil',
    size: '500ml',
    weight: '455g',
    price: 150,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
    badge: 'Best Value'
  },
  {
    id: 3,
    name: 'Bhavishya Kachi Ghani Mustard Oil',
    size: '1 Litre',
    weight: '910g',
    price: 250,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
    badge: 'Most Popular'
  },
  {
    id: 4,
    name: 'Bhavishya Kachi Ghani Mustard Oil',
    size: '2 Litre',
    weight: '1820g',
    price: 500,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
    badge: 'Family Pack'
  },
  {
    id: 5,
    name: 'Bhavishya Kachi Ghani Mustard Oil',
    size: '15 Litre',
    weight: '15kg',
    price: 3750,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
    badge: 'Bulk Pack'
  },
  {
    id: 6,
    name: 'Bhavishya Kachi Ghani Mustard Oil',
    size: '15 Kg Tin',
    weight: '15kg',
    price: 3900,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
    badge: 'Wholesale'
  },
];

const HomePage = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'retail'
    ? products.filter(p => p.price <= 500)
    : activeCategory === 'wholesale'
      ? products.filter(p => p.price > 500)
      : products;

  return (
    <div className="home-page page">

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <span className="hero-eyebrow">100% Pure & Natural</span>
            <h1>Bhavishya<br /><em>Kachi Ghani</em><br />Mustard Oil</h1>
            <p>Pure, cold-pressed mustard oil enriched with Vitamin A & D. Free from Argemone Oil. Trusted by families across Northern India.</p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => onNavigate('inventory')}>
                Shop Now
              </button>
              <button className="btn-outline" onClick={() => onNavigate('distributor')}>
                Become a Distributor
              </button>
            </div>
            <div className="hero-divider" />
            <div className="hero-stats">
              <div className="hero-stat">
                <strong>ISO<span>✓</span></strong>
                <span>22000:2018 Certified</span>
              </div>
              <div className="hero-stat">
                <strong>Grade<span>-1</span></strong>
                <span>Premium Quality</span>
              </div>
              <div className="hero-stat">
                <strong>100<span>%</span></strong>
                <span>Pure & Natural</span>
              </div>
            </div>
          </div>

          <div className="hero-image-wrap">
            <div className="hero-image">
              <img src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80" alt="Bhavishya Kachi Ghani Mustard Oil" />
            </div>
            <div className="hero-image-badge">
              <strong>FSSAI</strong>
              <span>Lic. No. 10019064002099</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS BAR ── */}
      <section style={{ background: 'var(--accent)', padding: '14px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap', alignItems: 'center' }}>
            {[
              '✓ ISO 22000:2018 Certified',
              '✓ ISO 9001:2015 Certified',
              '✓ FSSAI Licensed',
              '✓ Grade — I Quality',
              '✓ Free From Argemone Oil',
              '✓ Added Vitamin A & D',
            ].map((cert, i) => (
              <span key={i} style={{ fontSize: '0.78rem', fontWeight: '700', color: '#1A0A00', letterSpacing: '0.04em' }}>
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORY TABS ── */}
      <section className="platform-selector-section">
        <div className="container">
          <div className="platform-tabs">
            <button className={`platform-tab ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}>
              All Products ({products.length})
            </button>
            <button className={`platform-tab ${activeCategory === 'retail' ? 'active' : ''}`} onClick={() => setActiveCategory('retail')}>
              Retail Packs
            </button>
            <button className={`platform-tab ${activeCategory === 'wholesale' ? 'active' : ''}`} onClick={() => setActiveCategory('wholesale')}>
              Wholesale / Bulk
            </button>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-label">Our Products</div>
              <h2>Available Sizes & Packs</h2>
            </div>
            <button className="view-all-btn" onClick={() => onNavigate('inventory')}>
              View all products
            </button>
          </div>

          <div className="cars-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="car-card" onClick={() => onNavigate('inventory')}>
                <div className="car-card-image">
                  <img src={product.image} alt={product.name} />
                  <span className="car-badge">{product.badge}</span>
                </div>
                <div className="car-card-body">
                  <div className="car-card-title">
                    <h3>Kachi Ghani Mustard Oil</h3>
                    <span className="car-price">₹{product.price}</span>
                  </div>
                  <div className="car-card-specs">
                    <span>{product.size}</span>
                    <span>{product.weight}</span>
                    <span>Grade — I</span>
                  </div>
                  <div className="car-card-footer">
                    <button className="car-card-btn">Order Now</button>
                    <span className="car-card-year">MRP Incl. taxes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="why-us">
        <div className="container">
          <div className="why-us-header">
            <div className="section-label" style={{ color: 'var(--accent2)' }}>Why Bhavishya</div>
            <h2>Pure. Natural. Healthy.</h2>
          </div>
          <div className="why-grid">
            <div className="why-card">
              <span className="why-number">01</span>
              <h3>Kachi Ghani Process</h3>
              <p>Cold-pressed using traditional Kachi Ghani method to retain natural nutrients, flavor and aroma of pure mustard seeds.</p>
            </div>
            <div className="why-card">
              <span className="why-number">02</span>
              <h3>ISO Certified Quality</h3>
              <p>ISO 22000:2018 and ISO 9001:2015 certified. Every batch tested for purity and quality before packaging.</p>
            </div>
            <div className="why-card">
              <span className="why-number">03</span>
              <h3>Vitamin Enriched</h3>
              <p>Fortified with Vitamin A & D for added nutritional benefits. Supports healthy cooking for the whole family.</p>
            </div>
            <div className="why-card">
              <span className="why-number">04</span>
              <h3>Argemone Free</h3>
              <p>100% free from Argemone oil and adulterants. FSSAI licensed and Grade-1 certified for your safety.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section style={{ padding: '80px 0', background: 'var(--surface2)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <div className="section-label">Our Story</div>
              <h2>A Family Legacy of Purity</h2>
              <p style={{ fontSize: '1rem', color: 'var(--muted2)', lineHeight: '1.8', marginTop: '16px' }}>
                Bhavishya Kachi Ghani Mustard Oil is manufactured by <strong>Surender Kala & Sons Private Limited</strong>, based in Sonipat, Haryana. We have been delivering pure, high-quality mustard oil to families across Northern India.
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--muted2)', lineHeight: '1.8', marginTop: '12px' }}>
                Our oil is cold-pressed using traditional methods, ensuring that every drop retains the natural goodness of mustard seeds. We distribute across Punjab, Haryana, Uttar Pradesh, Rajasthan, Delhi and other Northern states.
              </p>
              <div style={{ display: 'flex', gap: '32px', marginTop: '28px' }}>
                <div>
                  <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--accent)' }}>6+</strong>
                  <p style={{ fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Product Sizes</p>
                </div>
                <div>
                  <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--accent)' }}>ISO</strong>
                  <p style={{ fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Certified</p>
                </div>
                <div>
                  <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--accent)' }}>North</strong>
                  <p style={{ fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>India Wide</p>
                </div>
              </div>
            </div>
            <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-xl)', padding: '36px', border: '1px solid var(--border)' }}>
              <h3 style={{ marginBottom: '20px', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)' }}>Company Details</h3>
              {[
                { label: 'Company', value: 'Surender Kala & Sons Pvt. Ltd.' },
                { label: 'Address', value: 'Khasra No-11/20/2, Shahpur Turk, Sector-18, Sonipat, Haryana-131001' },
                { label: 'FSSAI License', value: '10019064002099' },
                { label: 'Trade Mark', value: 'No. 3268585' },
                { label: 'ISO', value: '22000:2018 & 9001:2015' },
                { label: 'Grade', value: 'Grade — I' },
                { label: 'Phone', value: '+91-9653550600' },
                { label: 'Email', value: 'contact@bhavishyaoil.com' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--muted)' }}>{item.label}</span>
                  <span style={{ fontWeight: '600', color: 'var(--text)', textAlign: 'right', maxWidth: '60%' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <div className="cta-content">
              <div className="section-label">Get Started</div>
              <h2>Order Bhavishya Oil Today</h2>
              <p>Available for retail purchase and wholesale distribution. Contact us for bulk orders and distributor enquiries across Northern India.</p>
            </div>
            <div className="cta-actions">
              <button className="btn-primary" onClick={() => onNavigate('inventory')}>
                Shop Now
              </button>
              <button className="btn-outline" onClick={() => onNavigate('distributor')}>
                Distributor Enquiry
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;