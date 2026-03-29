import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

export default function ManageAccount() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        style={{ padding: '10rem 2rem 2rem', maxWidth: '800px', margin: '0 auto' }}
      >
        <h1 style={{ fontSize: '3rem', color: 'var(--accent-1)', marginBottom: '1rem' }}>Manage Account</h1>
        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '20px', padding: '2rem', backdropFilter: 'blur(10px)' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Account management options will be provided here.</p>
        </div>
      </motion.div>
    </div>
  );
}
