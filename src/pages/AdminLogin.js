import React, { useState } from 'react';
import { supabase } from '../config/supabase';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message || 'Login failed');
      setLoading(false);
    } else {
      navigate('/levryn-admin');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#121212', padding: '20px' }}>
      <form onSubmit={handleLogin} style={{ background: '#1E1E1E', padding: '40px', borderRadius: '8px', width: '100%', maxWidth: '380px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#FFFFFF', fontWeight: '500', letterSpacing: '0.05em', fontFamily: 'Playfair Display, serif', textTransform: 'uppercase' }}>Levryn Admin</h2>
        <div style={{ marginBottom: '15px' }}>
          {errorMessage && <div style={{ color: '#ffb4b4', marginBottom: '12px' }}>{errorMessage}</div>}
          <label style={{ display: 'block', marginBottom: '8px', color: '#A3A3A3', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
          <input 
            type="email" 
            placeholder="salikahmed49@gmail.com"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#FFF', boxSizing: 'border-box', fontSize: '16px', fontFamily: 'Inter, sans-serif', height: '48px' }} 
            required 
          />
        </div>
        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#A3A3A3', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#FFF', boxSizing: 'border-box', fontSize: '16px', fontFamily: 'Inter, sans-serif', height: '48px' }} 
            required 
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          style={{ width: '100%', padding: '14px', background: '#FFFFFF', color: '#000000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' }}
        >
          {loading ? 'LOGGING IN...' : 'SIGN IN'}
        </button>
      </form>
    </div>
  );
}