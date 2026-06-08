// src/pages/inventory/InventoryPages.jsx
import React, { useState, useEffect } from 'react';
import './InventoryPage.css';
import { API_BASE_URL } from '../../config';

const InventoryPage = ({ onNavigate }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/oil/products`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setProducts(data.products);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  const retailCount = products.filter(p => p.category === 'retail').length;
  const wholesaleCount = products.filter(p => p.category === 'wholesale').length;

  return (
    <div className="inventory-page page">

      <div className="inventory-header">
        <div className="container">
          <div className="inventory-header-inner">
            <div>
              <div className="inventory-eyebrow">Pure & Natural</div>
              <h1>Our Products</h1>
            </div>
            <div className="inventory-stats">
              <span className="inventory-count">{filtered.length} products available</span>
              <div className="inventory-source-badges">
                <span className="source-badge-small marketplace">Retail: {retailCount}</span>
                <span className="source-badge-small dealership">Wholesale: {wholesaleCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '16px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '8px' }}>
            {['all', 'retail', 'wholesale'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 20px',
                  background: activeCategory === cat ? 'var(--accent)' : 'var(--surface2)',
                  color: activeCategory === cat ? '#1A0A00' : 'var(--muted2)',
                  border: '1px solid var(--border)',
                  borderRadius: '100px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.2s',
                }}
              >
                {cat === 'all' ? `All Products (${products.length})` : cat === 'retail' ? `Retail Packs (${retailCount})` : `Wholesale / Bulk (${wholesaleCount})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '40px', marginBottom: '80px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--muted)' }}>
            Loading products...
          </div>
        ) : (
          <div className="inventory-grid">
            {filtered.map(product => (
              <div key={product.id} className="car-card" onClick={() => setSelectedProduct(product)}>
                <div className="car-card-image">
                  <img
                    src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80"
                    alt={product.name}
                  />
                  <span className="car-badge">
                    {product.category === 'retail' ? 'Retail' : 'Wholesale'}
                  </span>
                  <span className={`source-badge ${product.category === 'retail' ? 'marketplace' : 'dealership'}`}>
                    {product.available ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <div className="car-card-body">
                  <div className="car-card-title">
                    <h3>Kachi Ghani — {product.size}</h3>
                    <span className="car-price">₹{product.price}</span>
                  </div>
                  <div className="car-card-specs">
                    <span>{product.size}</span>
                    <span>{product.weight}</span>
                    <span>Grade — I</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--muted2)', lineHeight: '1.5', marginTop: '4px' }}>
                    {product.description}
                  </p>
                  <div className="car-card-footer">
                    <button className="car-card-btn">View Details</button>
                    <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>MRP incl. taxes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, padding: '20px', backdropFilter: 'blur(4px)'
        }} onClick={() => setSelectedProduct(null)}>
          <div style={{
            background: 'var(--surface)', borderRadius: 'var(--radius-xl)',
            padding: '32px', maxWidth: '520px', width: '100%',
            position: 'relative', border: '1px solid var(--border2)'
          }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedProduct(null)} style={{
              position: 'absolute', top: '16px', right: '16px',
              background: 'var(--surface2)', border: '1px solid var(--border)',
              borderRadius: '50%', width: '32px', height: '32px',
              cursor: 'pointer', fontSize: '1.1rem', color: 'var(--muted)'
            }}>×</button>

            <div style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px' }}>
              Bhavishya® Kachi Ghani Mustard Oil
            </div>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>{selectedProduct.size} Pack</h2>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent)', fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
              ₹{selectedProduct.price}
              <span style={{ fontSize: '0.9rem', color: 'var(--muted)', fontWeight: '400', marginLeft: '8px' }}>MRP incl. taxes</span>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--muted2)', lineHeight: '1.7', marginBottom: '20px' }}>
              {selectedProduct.description}
            </p>

            <div style={{ background: 'var(--surface2)', borderRadius: 'var(--radius)', padding: '16px', marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '12px' }}>Product Details</h4>
              {[
                `Size: ${selectedProduct.size}`,
                `Net Weight: ${selectedProduct.weight}`,
                `USP: ${selectedProduct.usp}`,
                'Added Vitamin A & D',
                'Free from Argemone Oil',
                'Grade — I Quality',
              ].map((f, i, arr) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', fontSize: '0.88rem', color: 'var(--text)', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ color: 'var(--accent2)', fontWeight: '700' }}>✓</span> {f}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => { setSelectedProduct(null); onNavigate('distributor'); }}
              >
                Order Now
              </button>
              <button
                className="btn-outline"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => { setSelectedProduct(null); onNavigate('distributor'); }}
              >
                Bulk Enquiry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;