// src/pages/dashboardPage/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';
import './DashboardPage.css';

const DashboardPage = ({ user, sessionToken, onNavigate }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionToken}`
  };

  useEffect(() => {
    if (!user) { onNavigate('login'); return; }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/oil/orders/my`, { headers });
      const data = await res.json();
      if (data.success) setOrders(data.orders);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  if (!user) return null;

  const tabs = [
    { id: 'overview', label: '🏠 Overview' },
    { id: 'orders', label: '📦 My Orders' },
    { id: 'profile', label: '👤 Profile' },
  ];

  const statusColor = (status) => {
    const map = { PENDING: '#B45309', CONFIRMED: '#2A6B2A', SHIPPED: '#5B46E0', DELIVERED: '#059669', CANCELLED: '#DC2626' };
    return map[status] || '#666';
  };

  return (
    <div className="dashboard-page page">
      <div className="dashboard-header">
        <div className="container">
          <div className="dashboard-header-inner">
            <div>
              <h1>Welcome, {user.username}! 👋</h1>
              <p>Manage your orders, messages and account details</p>
            </div>
            <div className="dashboard-quick-actions">
              <button className="quick-btn" onClick={() => onNavigate('inventory')}>🛒 Shop</button>
              <button className="quick-btn" onClick={() => onNavigate('messages')}>💬 Messages</button>
              <button className="quick-btn" onClick={() => onNavigate('chat')}>🤖 AI Chat</button>
            </div>
          </div>
          <div className="dashboard-tabs">
            {tabs.map(tab => (
              <button key={tab.id} className={`dashboard-tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container dashboard-content">

        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <div>
            <div className="overview-grid">
              <div className="overview-card" onClick={() => setActiveTab('orders')}>
                <span className="overview-icon">📦</span>
                <strong>{orders.length}</strong>
                <span>Total Orders</span>
              </div>
              <div className="overview-card" onClick={() => onNavigate('messages')}>
                <span className="overview-icon">💬</span>
                <strong>Messages</strong>
                <span>Chat with support</span>
              </div>
              <div className="overview-card" onClick={() => onNavigate('distributor')}>
                <span className="overview-icon">📋</span>
                <strong>Enquiry</strong>
                <span>Submit enquiry</span>
              </div>
              <div className="overview-card" onClick={() => onNavigate('chat')}>
                <span className="overview-icon">🤖</span>
                <strong>AI Assistant</strong>
                <span>Ask anything</span>
              </div>
            </div>

            {/* Recent orders */}
            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <h3>Recent Orders</h3>
                <button className="link-btn" onClick={() => setActiveTab('orders')}>View all →</button>
              </div>
              {loading ? (
                <p className="dash-loading">Loading...</p>
              ) : orders.length === 0 ? (
                <div className="dash-empty">
                  <p>No orders yet.</p>
                  <button className="btn-primary" onClick={() => onNavigate('inventory')}>Shop Now →</button>
                </div>
              ) : (
                orders.slice(0, 3).map(o => (
                  <div key={o.id} className="order-row">
                    <div>
                      <strong>Order #{o.id}</strong>
                      <span>Product ID: {o.productId} × {o.quantity}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <strong style={{ color: 'var(--accent)' }}>₹{o.totalPrice}</strong>
                      <span className="order-status" style={{ color: statusColor(o.status) }}>{o.status}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bhavishya info card */}
            <div className="dashboard-card info-card">
              <h3>🫒 About Bhavishya Oil</h3>
              <p>Pure Kachi Ghani Mustard Oil — ISO 22000:2018 & ISO 9001:2015 Certified. FSSAI Licensed. Grade — I Quality.</p>
              <div className="info-contacts">
                <span>📞 +91-9653550600</span>
                <span>✉️ contact@bhavishyaoil.com</span>
                <span>📍 Sonipat, Haryana</span>
              </div>
            </div>
          </div>
        )}

        {/* ── ORDERS ── */}
        {activeTab === 'orders' && (
          <div className="dashboard-card">
            <h3>My Orders ({orders.length})</h3>
            {loading ? (
              <p className="dash-loading">Loading...</p>
            ) : orders.length === 0 ? (
              <div className="dash-empty">
                <p>You haven't placed any orders yet.</p>
                <button className="btn-primary" onClick={() => onNavigate('inventory')}>Browse Products →</button>
              </div>
            ) : (
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>City</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id}>
                      <td>#{o.id}</td>
                      <td>Product #{o.productId}</td>
                      <td>{o.quantity}</td>
                      <td><strong style={{ color: 'var(--accent)' }}>₹{o.totalPrice}</strong></td>
                      <td>{o.city || '—'}</td>
                      <td>
                        <span className="order-status-badge" style={{ background: `${statusColor(o.status)}18`, color: statusColor(o.status) }}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ── PROFILE ── */}
        {activeTab === 'profile' && (
          <div className="dashboard-card profile-card">
            <h3>My Profile</h3>
            <div className="profile-avatar">{user.username?.[0]?.toUpperCase()}</div>
            <div className="profile-fields">
              {[
                { label: 'Username', value: user.username },
                { label: 'Email', value: user.email },
                { label: 'Account Type', value: user.role },
                { label: 'User ID', value: `#${user.id}` },
              ].map((f, i) => (
                <div key={i} className="profile-field">
                  <label>{f.label}</label>
                  <span>{f.value}</span>
                </div>
              ))}
            </div>
            <div className="profile-actions">
              <button className="btn-outline" onClick={() => onNavigate('messages')}>💬 Contact Support</button>
              <button className="btn-primary" onClick={() => onNavigate('inventory')}>🛒 Shop Now</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DashboardPage;