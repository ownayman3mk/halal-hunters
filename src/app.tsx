import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ownggjxfqkeytcvsexux.supabase.co';
const supabaseKey = 'sb_publishable_boosters...'; // Keep your existing key here if it's already full
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (isSignup) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
      } else {
        // Also try to insert into profiles table safely so it shows up in your table editor
        if (data.user) {
          await supabase.from('profiles').insert([
            { id: data.user.id, email: email, is_active: false }
          ]).select();
        }
        setMessage('Account created successfully! Contact admin for activation.');
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage('Logged in successfully!');
      }
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif', background: '#f5f5f5' }}>
      <form onSubmit={handleAuth} style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', width: '300px' }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>{isSignup ? 'Sign Up' : 'Login'}</h2>
        
        {message && <p style={{ color: message.includes('success') ? 'green' : 'red', fontSize: '14px', marginBottom: '15px' }}>{message}</p>}
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {loading ? 'Processing...' : (isSignup ? 'Sign Up' : 'Login')}
        </button>

        <p onClick={() => setIsSignup(!isSignup)} style={{ marginTop: '15px', textAlign: 'center', fontSize: '13px', color: '#0070f3', cursor: 'pointer' }}>
          {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </p>
      </form>
    </div>
  );
}
