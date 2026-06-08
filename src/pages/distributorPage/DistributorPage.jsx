// src/pages/distributorPage/DistributorPage.jsx
import React, { useState } from 'react';
import { API_BASE_URL } from '../../config';

const DistributorPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '', company: '', phone: '', email: '',
    city: '', state: '', message: '', orderType: 'retail'
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const states = ['Punjab', 'Haryana', 'Uttar Pradesh', 'Rajasthan', 'Delhi', 'Himachal Pradesh', 'Uttarakhand', 'Madhya Pradesh', 'Other'];

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/oil/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert('Failed to submit. Please try again.');
      }
    } catch (err) {
      alert('Network error. Please call us at +91-9653550600');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="page" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px', padding: '40px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✅</div>
          <h2 style={{ marginBottom: '12px' }}>Enquiry Submitted!</h2>
          <p style={{ color: 'var(--muted2)', lineHeight: '1.7', marginBottom: '28px' }}>
            Thank you for your interest in Bhavishya Oil. Our team will contact you within 24-48 hours at <strong>{formData.phone}</strong>.
          </p>
          <button className="btn-primary" onClick={() => { setSubmitted(false); setFormData({ name: '', company: '', phone: '', email: '', city: '', state: '', message: '', orderType: 'retail' }); }}>
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page" style={{ paddingBottom: '80px' }}>
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '48px 0' }}>
        <div className="container">
          <div style={{ fontSize: '0.68rem', fontWeight: '700', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>
            Partner With Us
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Distributor & Wholesale Enquiry</h1>
          <p style={{ fontSize: '1rem', color: 'var(--muted2)', marginTop: '12px', maxWidth: '600px' }}>
            Join our growing network of distributors across Northern India. We offer competitive pricing, quality products and reliable supply.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '48px' }}>

          {/* Left — Info */}
          <div>
            <h2 style={{ marginBottom: '24px' }}>Why Distribute Bhavishya?</h2>
            {[
              { icon: '🏆', title: 'Grade-I Quality', desc: 'ISO certified, FSSAI licensed. Highest quality standards.' },
              { icon: '💰', title: 'Competitive Pricing', desc: 'Best wholesale prices. Higher margins for distributors.' },
              { icon: '🚚', title: 'Reliable Supply', desc: 'Consistent supply chain across Northern India.' },
              { icon: '📦', title: 'Multiple Pack Sizes', desc: '200ml to 15L — for every market segment.' },
              { icon: '🤝', title: 'Dedicated Support', desc: 'Our team supports you every step of the way.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', padding: '16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', marginBottom: '12px' }}>
                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px' }}>{item.title}</strong>
                  <p style={{ fontSize: '0.82rem', color: 'var(--muted2)' }}>{item.desc}</p>
                </div>
              </div>
            ))}

            <div style={{ background: 'var(--gold-pale)', border: '1px solid rgba(212,160,23,0.3)', borderRadius: 'var(--radius)', padding: '20px', marginTop: '24px' }}>
              <h4 style={{ marginBottom: '12px', color: 'var(--accent)' }}>Contact Us Directly</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted2)', marginBottom: '8px' }}>📞 +91-9653550600</p>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted2)', marginBottom: '8px' }}>✉️ contact@bhavishyaoil.com</p>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted2)' }}>📍 Sonipat, Haryana-131001</p>
            </div>
          </div>

          {/* Right — Form */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '32px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--accent), var(--accent2))' }} />
            <h3 style={{ marginBottom: '24px' }}>Submit Your Enquiry</h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted2)', marginBottom: '6px' }}>Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name"
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', background: 'var(--surface2)', color: 'var(--text)', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted2)', marginBottom: '6px' }}>Company Name</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Your company"
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', background: 'var(--surface2)', color: 'var(--text)', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted2)', marginBottom: '6px' }}>Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX"
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', background: 'var(--surface2)', color: 'var(--text)', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted2)', marginBottom: '6px' }}>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com"
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', background: 'var(--surface2)', color: 'var(--text)', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted2)', marginBottom: '6px' }}>City *</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} required placeholder="Your city"
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', background: 'var(--surface2)', color: 'var(--text)', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted2)', marginBottom: '6px' }}>State *</label>
                  <select name="state" value={formData.state} onChange={handleChange} required
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', background: 'var(--surface2)', color: 'var(--text)', outline: 'none' }}>
                    <option value="">Select state</option>
                    {states.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted2)', marginBottom: '6px' }}>Order Type *</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {[
                    { value: 'retail', label: 'Retail Order' },
                    { value: 'wholesale', label: 'Wholesale / Bulk' },
                    { value: 'distributor', label: 'Become Distributor' },
                  ].map(opt => (
                    <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', border: `1px solid ${formData.orderType === opt.value ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 'var(--radius)', cursor: 'pointer', flex: 1, background: formData.orderType === opt.value ? 'var(--gold-pale)' : 'var(--surface2)', fontSize: '0.82rem', fontWeight: '500' }}>
                      <input type="radio" name="orderType" value={opt.value} checked={formData.orderType === opt.value} onChange={handleChange} style={{ accentColor: 'var(--accent)' }} />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted2)', marginBottom: '6px' }}>Message / Requirements</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="4"
                  placeholder="Tell us about your requirements, quantity needed, area of distribution..."
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', background: 'var(--surface2)', color: 'var(--text)', outline: 'none', resize: 'vertical', fontFamily: 'var(--font-body)' }} />
              </div>

              <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: 'center', padding: '14px' }}>
                {loading ? 'Submitting...' : 'Submit Enquiry'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributorPage;