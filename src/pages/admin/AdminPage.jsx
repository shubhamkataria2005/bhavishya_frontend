// src/pages/admin/AdminPage.jsx
import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';
import './AdminPage.css';

const AdminPage = ({ user, sessionToken, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPrice, setEditingPrice] = useState(null);
  const [newPrice, setNewPrice] = useState('');
  const [priceMsg, setPriceMsg] = useState('');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionToken}`
  };

  useEffect(() => {
    if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
      onNavigate('home');
      return;
    }
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [statsRes, ordersRes, enquiriesRes, productsRes, usersRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/oil/admin/stats`, { headers }),
        fetch(`${API_BASE_URL}/api/oil/admin/orders`, { headers }),
        fetch(`${API_BASE_URL}/api/oil/admin/enquiries`, { headers }),
        fetch(`${API_BASE_URL}/api/oil/products`),
        fetch(`${API_BASE_URL}/api/admin/users`, { headers }),
      ]);
      const [s, o, e, p, u] = await Promise.all([statsRes.json(), ordersRes.json(), enquiriesRes.json(), productsRes.json(), usersRes.json()]);
      if (s.success) setStats(s);
      if (o.success) setOrders(o.orders);
      if (e.success) setEnquiries(e.enquiries);
      if (p.success) setProducts(p.products);
      if (u.success) setUsers(u.users);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    }
    setLoading(false);
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/oil/admin/orders/${orderId}/status`, {
        method: 'PUT', headers,
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
    } catch (err) { console.error(err); }
  };

  const updatePrice = async (productId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/oil/products/${productId}/price`, {
        method: 'PUT', headers,
        body: JSON.stringify({ price: parseFloat(newPrice) })
      });
      const data = await res.json();
      if (data.success) {
        setProducts(products.map(p => p.id === productId ? { ...p, price: parseFloat(newPrice) } : p));
        setEditingPrice(null);
        setNewPrice('');
        setPriceMsg('✅ Price updated successfully!');
        setTimeout(() => setPriceMsg(''), 3000);
      }
    } catch (err) { console.error(err); }
  };

  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
    return <div className="page" style={{ padding: '80px', textAlign: 'center' }}><h2>Access Denied</h2></div>;
  }

  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'orders', label: '📦 Orders' },
    { id: 'enquiries', label: '📋 Enquiries' },
    { id: 'prices', label: '💰 Prices' },
    { id: 'users', label: '👥 Users' },
  ];

  return (
    <div className="admin-page page">
      <div className="admin-header">
        <div className="container">
          <div className="admin-header-inner">
            <div>
              <h1>Admin Panel</h1>
              <p>Welcome, {user.username} — {user.role}</p>
            </div>
            <button className="btn-outline" onClick={fetchAll}>↻ Refresh</button>
          </div>
          <div className="admin-tabs">
            {tabs.map(tab => (
              <button key={tab.id} className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container admin-content">
        {loading ? (
          <div className="admin-loading">Loading...</div>
        ) : (
          <>
            {/* ── DASHBOARD ── */}
            {activeTab === 'dashboard' && stats && (
              <div>
                <div className="stats-grid">
                  {[
                    { label: 'Total Orders', value: stats.totalOrders, sub: `${stats.pendingOrders} pending`, color: 'var(--accent)' },
                    { label: 'Total Enquiries', value: stats.totalEnquiries, sub: `${stats.pendingEnquiries} pending`, color: 'var(--accent2)' },
                    { label: 'Total Users', value: stats.totalUsers, sub: 'registered accounts', color: '#7C6AF7' },
                    { label: 'Products', value: stats.totalProducts, sub: 'active products', color: '#F59E0B' },
                  ].map((s, i) => (
                    <div key={i} className="stat-box">
                      <strong style={{ color: s.color }}>{s.value}</strong>
                      <span>{s.label}</span>
                      <small>{s.sub}</small>
                    </div>
                  ))}
                </div>

                <div className="admin-two-col">
                  <div className="admin-card">
                    <h3>Recent Orders</h3>
                    {orders.slice(0, 5).map(o => (
                      <div key={o.id} className="admin-list-item">
                        <div>
                          <strong>{o.customerName || 'Guest'}</strong>
                          <span>{o.customerPhone}</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <strong>₹{o.totalPrice}</strong>
                          <span className={`status-badge ${o.status.toLowerCase()}`}>{o.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="admin-card">
                    <h3>Recent Enquiries</h3>
                    {enquiries.slice(0, 5).map(e => (
                      <div key={e.id} className="admin-list-item">
                        <div>
                          <strong>{e.name}</strong>
                          <span>{e.city}, {e.state}</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span className={`status-badge ${e.orderType}`}>{e.orderType}</span>
                          <span className={`status-badge ${e.status}`}>{e.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── ORDERS ── */}
            {activeTab === 'orders' && (
              <div className="admin-card">
                <h3>All Orders ({orders.length})</h3>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Customer</th>
                      <th>Phone</th>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o.id}>
                        <td>#{o.id}</td>
                        <td>{o.customerName || 'Guest'}</td>
                        <td>{o.customerPhone}</td>
                        <td>{o.productId}</td>
                        <td>{o.quantity}</td>
                        <td>₹{o.totalPrice}</td>
                        <td><span className={`status-badge ${o.status?.toLowerCase()}`}>{o.status}</span></td>
                        <td>
                          <select value={o.status} onChange={e => updateOrderStatus(o.id, e.target.value)}
                            className="status-select">
                            <option value="PENDING">PENDING</option>
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="SHIPPED">SHIPPED</option>
                            <option value="DELIVERED">DELIVERED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ── ENQUIRIES ── */}
            {activeTab === 'enquiries' && (
              <div className="admin-card">
                <h3>All Enquiries ({enquiries.length})</h3>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Company</th>
                      <th>Phone</th>
                      <th>City</th>
                      <th>State</th>
                      <th>Type</th>
                      <th>Message</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map(e => (
                      <tr key={e.id}>
                        <td>#{e.id}</td>
                        <td>{e.name}</td>
                        <td>{e.company || '—'}</td>
                        <td>{e.phone}</td>
                        <td>{e.city}</td>
                        <td>{e.state}</td>
                        <td><span className={`status-badge ${e.orderType}`}>{e.orderType}</span></td>
                        <td style={{ maxWidth: '200px', fontSize: '0.8rem' }}>{e.message || '—'}</td>
                        <td><span className={`status-badge ${e.status?.toLowerCase()}`}>{e.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ── PRICES ── */}
            {activeTab === 'prices' && (
              <div className="admin-card">
                <h3>Manage Product Prices</h3>
                {priceMsg && <div className="price-msg">{priceMsg}</div>}
                <p style={{ fontSize: '0.88rem', color: 'var(--muted)', marginBottom: '20px' }}>
                  Update prices here — the AI chatbot will automatically use the new prices for customer queries.
                </p>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Size</th>
                      <th>Weight</th>
                      <th>Category</th>
                      <th>Current Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id}>
                        <td>{p.name}</td>
                        <td><strong>{p.size}</strong></td>
                        <td>{p.weight}</td>
                        <td><span className={`status-badge ${p.category}`}>{p.category}</span></td>
                        <td>
                          {editingPrice === p.id ? (
                            <input
                              type="number"
                              value={newPrice}
                              onChange={e => setNewPrice(e.target.value)}
                              className="price-input"
                              placeholder="New price"
                              autoFocus
                            />
                          ) : (
                            <strong style={{ color: 'var(--accent)', fontSize: '1rem' }}>₹{p.price}</strong>
                          )}
                        </td>
                        <td>
                          {editingPrice === p.id ? (
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button className="btn-save" onClick={() => updatePrice(p.id)}>Save</button>
                              <button className="btn-cancel" onClick={() => { setEditingPrice(null); setNewPrice(''); }}>Cancel</button>
                            </div>
                          ) : (
                            <button className="btn-edit" onClick={() => { setEditingPrice(p.id); setNewPrice(String(p.price)); }}>
                              Edit Price
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ── USERS ── */}
            {activeTab === 'users' && (
              <div className="admin-card">
                <h3>All Users ({users.length})</h3>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id}>
                        <td>#{u.id}</td>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                        <td><span className={`status-badge ${u.role?.toLowerCase()}`}>{u.role}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;