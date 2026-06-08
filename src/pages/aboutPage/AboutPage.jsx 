// src/pages/aboutPage/AboutPage.jsx
import React from 'react';

const AboutPage = ({ onNavigate }) => {
  return (
    <div className="page" style={{ paddingBottom: '80px' }}>

      {/* Header */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '48px 0' }}>
        <div className="container">
          <div style={{ fontSize: '0.68rem', fontWeight: '700', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>
            Our Story
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>About Bhavishya Oil</h1>
          <p style={{ fontSize: '1rem', color: 'var(--muted2)', marginTop: '12px', maxWidth: '600px' }}>
            A family legacy of purity, quality and trust. Bringing the finest Kachi Ghani Mustard Oil to families across Northern India.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '60px' }}>

        {/* Story */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', marginBottom: '80px' }}>
          <div>
            <h2 style={{ marginBottom: '20px' }}>Surender Kala & Sons Private Limited</h2>
            <p style={{ fontSize: '1rem', color: 'var(--muted2)', lineHeight: '1.8', marginBottom: '16px' }}>
              Based in Sonipat, Haryana, we are a dedicated manufacturer and distributor of premium Kachi Ghani Mustard Oil. Our commitment to purity and quality has made Bhavishya a trusted name in households across Northern India.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--muted2)', lineHeight: '1.8', marginBottom: '16px' }}>
              Every drop of Bhavishya mustard oil is cold-pressed using the traditional Kachi Ghani method, preserving the natural nutrients, flavor and aroma of pure mustard seeds. We add Vitamin A & D for extra nutritional benefits.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--muted2)', lineHeight: '1.8' }}>
              Our oil is completely free from Argemone oil and adulterants, certified by FSSAI and graded as Grade-I quality — the highest standard in mustard oil production.
            </p>
          </div>
          <div style={{ background: 'var(--surface2)', borderRadius: 'var(--radius-xl)', padding: '40px', border: '1px solid var(--border)' }}>
            <img src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80"
              alt="Bhavishya Mustard Oil"
              style={{ width: '100%', borderRadius: 'var(--radius-lg)', marginBottom: '20px' }} />
            <div style={{ textAlign: 'center' }}>
              <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--accent)' }}>
                "Oil For Healthy Life"
              </strong>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ marginBottom: '32px', textAlign: 'center' }}>Our Certifications</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {[
              { title: 'ISO 22000:2018', desc: 'Food Safety Management System certification ensuring highest food safety standards.' },
              { title: 'ISO 9001:2015', desc: 'Quality Management System certification for consistent product quality.' },
              { title: 'FSSAI Licensed', desc: 'Food Safety and Standards Authority of India. License No. 10019064002099.' },
              { title: 'Grade — I', desc: 'Highest grade classification for mustard oil quality in India.' },
              { title: 'Trade Mark ®', desc: 'Registered Trade Mark No. 3268585. Bhavishya is a protected brand.' },
              { title: 'Argemone Free', desc: '100% free from Argemone oil. Tested and verified for your safety.' },
            ].map((cert, i) => (
              <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--accent), var(--accent2))' }} />
                <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>✓</div>
                <h3 style={{ fontSize: '1rem', marginBottom: '8px', color: 'var(--accent)' }}>{cert.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted2)', lineHeight: '1.6' }}>{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Company Details */}
        <div style={{ background: 'var(--surface2)', borderRadius: 'var(--radius-xl)', padding: '40px', border: '1px solid var(--border)', marginBottom: '80px' }}>
          <h2 style={{ marginBottom: '28px' }}>Company Information</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { label: 'Company Name', value: 'Surender Kala & Sons Private Limited' },
              { label: 'Brand Name', value: 'Bhavishya® Kachi Ghani Mustard Oil' },
              { label: 'Address', value: 'Khasra No-11/20/2, Shahpur Turk, Sector-18, Sonipat, Haryana-131001' },
              { label: 'Phone', value: '+91-9653550600' },
              { label: 'Email', value: 'contact@bhavishyaoil.com' },
              { label: 'Website', value: 'www.bhavishyaoil.com' },
              { label: 'FSSAI License', value: '10019064002099' },
              { label: 'Trade Mark No.', value: '3268585' },
              { label: 'ISO Certifications', value: 'ISO 22000:2018 & ISO 9001:2015' },
              { label: 'Product Grade', value: 'Grade — I' },
              { label: 'Facebook', value: 'bhavishyaoil' },
              { label: 'Distribution', value: 'Northern India (Punjab, Haryana, UP, Rajasthan, Delhi & more)' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', padding: '12px', background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', minWidth: '120px' }}>{item.label}</span>
                <span style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--text)' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '16px' }}>Ready to Order?</h2>
          <p style={{ color: 'var(--muted2)', marginBottom: '28px' }}>Shop our full range of products or enquire about wholesale distribution.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="btn-primary" onClick={() => onNavigate('inventory')}>Shop Now</button>
            <button className="btn-outline" onClick={() => onNavigate('distributor')}>Distributor Enquiry</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;