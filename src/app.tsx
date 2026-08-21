import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with your credentials
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
      setMessage('Success! Logged in.');
      window.location.reload();
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '400px', margin: 'auto', background: '#0b0f19', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 style={{ marginBottom: '20px' }}>Member Authentication</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '12px', fontSize: '16px', background: '#1e293b', border: '1px solid #334155', color: '#fff', borderRadius: '6px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '12px', fontSize: '16px', background: '#1e293b', border: '1px solid #334155', color: '#fff', borderRadius: '6px' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '12px', fontSize: '16px', background: '#f59e0b', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          {loading ? 'Logging in...' : 'Access terminal'}
        </button>
      </form>
      {message && <p style={{ marginTop: '15px', color: message.startsWith('Error') ? '#ef4444' : '#22c55e' }}>{message}</p>}
    </div>
  );
}
