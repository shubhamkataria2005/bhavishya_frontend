// src/pages/homePage/HomePage.jsx
import React from 'react';
import './HomePage.css';

const HomePage = ({ onNavigate }) => {
  return (
    <div className="home-page page">

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-left">
            <span className="eyebrow">100% Pure & Cold Pressed</span>
            <h1>
              <em>Bhavishya</em><br />
              Kachi Ghani<br />
              Mustard Oil
            </h1>
            <p>Traditional cold-pressing. Natural purity. Trusted by families across Northern India for healthy cooking since generations.</p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => onNavigate('inventory')}>Shop Now →</button>
              <button className="btn-outline" onClick={() => onNavigate('distributor')}>Become Distributor</button>
            </div>
            <div className="hero-badges">
              <span>✓ ISO 22000:2018</span>
              <span>✓ FSSAI Licensed</span>
              <span>✓ Grade — I</span>
              <span>✓ Argemone Free</span>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-img-wrap">
              <img src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=700&q=80" alt="Bhavishya Mustard Oil" />
              <div className="hero-tag">
                <strong>Oil For Healthy Life</strong>
                <span>Surender Kala & Sons Pvt. Ltd.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker-wrap">
        <div className="ticker">
          {['ISO 22000:2018 Certified', 'ISO 9001:2015 Certified', 'FSSAI Licensed', 'Grade — I Quality', 'Free From Argemone Oil', 'Added Vitamin A & D', 'TM No. 3268585', 'Cold Pressed Process'].map((t, i) => (
            <span key={i}>◆ {t} </span>
          ))}
          {['ISO 22000:2018 Certified', 'ISO 9001:2015 Certified', 'FSSAI Licensed', 'Grade — I Quality', 'Free From Argemone Oil', 'Added Vitamin A & D', 'TM No. 3268585', 'Cold Pressed Process'].map((t, i) => (
            <span key={`b${i}`}>◆ {t} </span>
          ))}
        </div>
      </div>

      {/* ── PRODUCTS PREVIEW ── */}
      <section className="products-preview">
        <div className="container">
          <div className="section-top">
            <div>
              <span className="eyebrow">Our Range</span>
              <h2>Available Sizes & Packs</h2>
            </div>
            <button className="link-btn" onClick={() => onNavigate('inventory')}>View All Products →</button>
          </div>
          <div className="products-table">
            {[
              { size: '200ml', weight: '182g', price: '₹75', category: 'Retail', usp: '0.35 Paise/g' },
              { size: '500ml', weight: '455g', price: '₹150', category: 'Retail', usp: '0.33 Paise/g' },
              { size: '1 Litre', weight: '910g', price: '₹250', category: 'Retail', usp: 'Best Value' },
              { size: '2 Litre', weight: '1820g', price: '₹500', category: 'Retail', usp: 'Family Pack' },
              { size: '15 Litre', weight: '15kg', price: '₹3750', category: 'Wholesale', usp: 'Bulk Buyer' },
              { size: '15 Kg Tin', weight: '15kg', price: '₹3900', category: 'Wholesale', usp: 'Industrial' },
            ].map((p, i) => (
              <div key={i} className="product-row" onClick={() => onNavigate('inventory')}>
                <div className="product-row-size">
                  <strong>{p.size}</strong>
                  <span>{p.weight}</span>
                </div>
                <div className="product-row-cat">
                  <span className={`cat-badge ${p.category.toLowerCase()}`}>{p.category}</span>
                </div>
                <div className="product-row-usp">{p.usp}</div>
                <div className="product-row-price">{p.price} <small>MRP</small></div>
                <button className="product-row-btn">Order →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features-section">
        <div className="container">
          <div className="features-header">
            <span className="eyebrow">Why Choose Us</span>
            <h2>Pure. Natural. Healthy.</h2>
          </div>
          <div className="features-grid">
            {[
              { num: '01', icon: '🫒', title: 'Kachi Ghani Process', desc: 'Traditional cold-pressing at low temperatures preserves natural nutrients, rich flavor and authentic pungency of mustard seeds.' },
              { num: '02', icon: '🏆', title: 'ISO Certified Quality', desc: 'ISO 22000:2018 & ISO 9001:2015 certified. Every batch rigorously tested for purity before packaging and distribution.' },
              { num: '03', icon: '💊', title: 'Vitamin Enriched', desc: 'Fortified with Vitamin A & D. Supports healthy cooking, eye health, bone strength and immune function for your family.' },
              { num: '04', icon: '✅', title: 'Argemone Free', desc: '100% pure and free from Argemone oil adulterant. FSSAI licensed, Grade-I certified for your family\'s safety and health.' },
            ].map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-num">{f.num}</div>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HEALTH BENEFITS ── */}
      <section className="health-section">
        <div className="container">
          <div className="health-inner">
            <div className="health-content">
              <span className="eyebrow">Health Benefits</span>
              <h2>Good For Your Heart & Body</h2>
              <p>Bhavishya Mustard Oil is rich in MUFA and PUFA fatty acids — the healthy fats that support your heart, reduce bad cholesterol and promote overall wellness.</p>
              <div className="health-list">
                {[
                  '❤️ Supports heart health — rich in MUFA & PUFA',
                  '🦴 Strengthens bones with Vitamin D',
                  '👁️ Supports eye health with Vitamin A',
                  '🔥 High smoke point — ideal for all cooking styles',
                  '🥒 Natural preservative for pickles (achar)',
                  '💆 Traditionally used for massage in winters',
                ].map((b, i) => (
                  <div key={i} className="health-item">{b}</div>
                ))}
              </div>
            </div>
            <div className="health-stats">
              <div className="stat-card">
                <strong>900</strong>
                <span>kcal per 100g</span>
              </div>
              <div className="stat-card">
                <strong>67g</strong>
                <span>MUFA per 100g</span>
              </div>
              <div className="stat-card">
                <strong>21g</strong>
                <span>PUFA per 100g</span>
              </div>
              <div className="stat-card">
                <strong>0g</strong>
                <span>Trans fatty acids</span>
              </div>
              <div className="stat-card wide">
                <strong>250°C</strong>
                <span>High smoke point — perfect for frying</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="about-strip">
        <div className="container">
          <div className="about-inner">
            <div className="about-text">
              <span className="eyebrow">Our Story</span>
              <h2>A Family Legacy of Purity</h2>
              <p>Bhavishya Kachi Ghani Mustard Oil is manufactured by <strong>Surender Kala & Sons Private Limited</strong>, based in Sonipat, Haryana. We deliver pure, high-quality mustard oil to families and businesses across Northern India.</p>
              <div className="about-numbers">
                <div><strong>6+</strong><span>Pack Sizes</span></div>
                <div><strong>ISO</strong><span>Certified</span></div>
                <div><strong>8</strong><span>States</span></div>
              </div>
              <button className="btn-outline" style={{ marginTop: '24px' }} onClick={() => onNavigate('about')}>Learn More About Us</button>
            </div>
            <div className="about-details">
              {[
                ['Company', 'Surender Kala & Sons Pvt. Ltd.'],
                ['Location', 'Sonipat, Haryana — 131001'],
                ['FSSAI', '10019064002099'],
                ['Trade Mark', 'No. 3268585'],
                ['ISO', '22000:2018 & 9001:2015'],
                ['Grade', 'Grade — I (Highest)'],
                ['Phone', '+91-9653550600'],
                ['Email', 'contact@bhavishyaoil.com'],
              ].map(([label, val], i) => (
                <div key={i} className="detail-row">
                  <span>{label}</span>
                  <strong>{val}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DISTRIBUTOR CTA ── */}
      <section className="dist-cta">
        <div className="container">
          <div className="dist-cta-inner">
            <div>
              <span className="eyebrow" style={{ color: '#fff', opacity: 0.7 }}>Partner With Us</span>
              <h2 style={{ color: '#fff' }}>Become a Distributor</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '10px' }}>Join our growing network across Northern India. Competitive wholesale pricing, reliable supply and dedicated support.</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button style={{ padding: '13px 28px', background: '#fff', color: 'var(--accent)', border: 'none', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-body)', fontWeight: '700', fontSize: '0.88rem', cursor: 'pointer' }} onClick={() => onNavigate('distributor')}>
                Submit Enquiry →
              </button>
              <button style={{ padding: '13px 28px', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.5)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-body)', fontWeight: '600', fontSize: '0.88rem', cursor: 'pointer' }} onClick={() => onNavigate('chat')}>
                Ask AI Assistant
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;