import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ovhggjufqobeytccvowx.supabase.co';
const supabaseKey = 'Sb_publishable_bscMWeJ6c6h1AoYR5vl8Og_uX2jRgu9';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage('Error: ' + error.message);
      setLoading(false);
    } else {
      setMessage('Success! Redirecting...');
      window.location.reload();
    }
  };

  return (
    <div style={{ background: '#0b0f19', color: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#121826', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '400px', border: '1px solid #1e293b' }}>
        <h2 style={{ marginBottom: '8px', fontSize: '24px' }}>Member authentication</h2>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>Enter your assigned credentials to access live feeds.</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: '#cbd5e1' }}>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', fontSize: '15px', background: '#1e293b', border: '1px solid #334155', color: '#fff', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: '#cbd5e1' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', fontSize: '15px', background: '#1e293b', border: '1px solid #334155', color: '#fff', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={{ width: '100%', padding: '12px', fontSize: '15px', background: '#f59e0b', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '8px' }}
          >
            {loading ? 'Authenticating...' : 'Access terminal'}
          </button>
        </form>

        {message && (
          <p style={{ marginTop: '16px', fontSize: '14px', color: message.startsWith('Error') ? '#ef4444' : '#22c55e', textAlign: 'center' }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
