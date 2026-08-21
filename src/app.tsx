import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ovhggjufqobeytccvowx.supabase.co';
const supabaseKey = 'Sb_publishable_bscMWeJ6c6h1AoYR5vl8Og_uX2jRgu9';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username: email.split('@')[0] } }
      });
      if (error) {
        setMessage('Error: ' + error.message);
      } else {
        setMessage('Success! Account created. You can now log in.');
        setIsSignUp(false);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage('Error: ' + error.message);
      } else {
        setMessage('Success! Redirecting...');
        window.location.reload();
      }
    }
    setLoading(false);
  };

  return (
    <div style={{ background: '#0b0f19', color: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#121826', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '400px', border: '1px solid #1e293b' }}>
        <h2 style={{ marginBottom: '8px', fontSize: '24px' }}>{isSignUp ? 'Create an account' : 'Member authentication'}</h2>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>Enter your credentials to access live feeds.</p>

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
            {loading ? 'Processing...' : (isSignUp ? 'Register' : 'Access terminal')}
          </button>
        </form>

        <button 
          onClick={() => { setIsSignUp(!isSignUp); setMessage(''); }}
          style={{ background: 'none', border: 'none', color: '#38bdf8', marginTop: '16px', cursor: 'pointer', fontSize: '14px', width: '100%', textAlign: 'center' }}
        >
          {isSignUp ? 'Already have an account? Log in' : "Don't have an account? Register"}
        </button>

        {message && (
          <p style={{ marginTop: '16px', fontSize: '14px', color: message.startsWith('Error') ? '#ef4444' : '#22c55e', textAlign: 'center' }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
