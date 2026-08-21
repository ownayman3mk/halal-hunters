import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ownggjxfqkeytcvsexux.supabase.co';
const supabaseKey = 'Sb_publishable_bscMWeJ6c6h1AoYR5vl8Og_uX2jRgu9';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (isSignup) {
      // 1. Sign up and save Full Name + is_active status directly in Auth Metadata
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            is_active: false, // Starts inactive by default
          }
        }
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage('Account created successfully! Waiting for activation.');
      }
    } else {
      // 2. Login check
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
      } else {
        // Check if user is active from their metadata
        const isActive = data.user?.user_metadata?.is_active;
        if (!isActive) {
          setMessage('Your account is not activated by admin yet.');
          await supabase.auth.signOut(); // Log them back out if inactive
        } else {
          setMessage('Logged in successfully!');
        }
      }
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif', background: '#f5f5f5' }}>
      <form onSubmit={handleAuth} style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', width: '300px' }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>{isSignup ? 'Sign Up' : 'Login'}</h2>
        
        {message && <p style={{ color: message.includes('success') ? 'green' : 'red', fontSize: '14px', marginBottom: '15px' }}>{message}</p>}
        
        {isSignup && (
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Full Name</label>
            <input 
              type="text" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              required 
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
        )}

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
