import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Search } from 'lucide-react';

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        padding: '1rem 2rem',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: '1.5rem',
        background: 'rgba(11, 12, 16, 0.97)',
        borderBottom: '1px solid rgba(102, 252, 241, 0.12)',
        boxShadow: '0 1px 0 rgba(0, 0, 0, 0.2)',
      }}
    >
      <div></div> {/* Left spacer */}

      <div style={{
        display: 'flex',
        gap: '1.75rem',
        background: 'rgba(255, 255, 255, 0.06)',
        padding: '0.65rem 1.75rem',
        borderRadius: '30px',
        border: '1px solid rgba(102, 252, 241, 0.15)',
      }}>
        {['journey', 'projects', 'debugging', 'skills'].map((section) => (
          <motion.button
            key={section}
            whileHover={{ scale: 1.1, color: "var(--accent-1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (location.pathname !== '/') {
                navigate('/');
                setTimeout(() => scrollTo(section), 500);
              } else {
                scrollTo(section);
              }
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-color)',
              fontSize: '1rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              cursor: 'pointer',
              transition: 'color 0.3s'
            }}
          >
            {section}
          </motion.button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifySelf: 'flex-end', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '20px', padding: '0.4rem 1rem', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
          <Search size={16} color="var(--text-color)" style={{ marginRight: '8px' }} />
          <input 
            type="text" 
            placeholder="Search..." 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--text-color)', 
              outline: 'none', 
              width: '120px',
              fontSize: '0.9rem'
            }} 
          />
        </div>

        <div style={{ position: 'relative' }}>
          <motion.button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(102, 252, 241, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'rgba(11, 12, 16, 0.95)',
            border: '1px solid var(--accent-1)',
            color: 'var(--text-color)',
            padding: '0.7rem',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
          }}
        >
          <User size={20} />
        </motion.button>

        <AnimatePresence>
          {isProfileOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                top: 'calc(100% + 15px)',
                right: 0,
                width: '220px',
                background: 'rgba(11, 12, 16, 0.95)',
                border: '1px solid rgba(102, 252, 241, 0.2)',
                borderRadius: '16px',
                padding: '0.5rem 0',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6)',
                overflow: 'hidden',
              }}
            >
              {[
                { name: 'Your Profile', path: '/profile' },
                { name: 'Manage Account', path: '/manage-account' },
                { name: 'History', path: '/history' },
                { name: 'Settings', path: '/settings' },
                { name: 'Sign Out', path: '/' }
              ].map((item, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate(item.path);
                  }}
                  whileHover={{ background: 'rgba(102, 252, 241, 0.1)', x: 5 }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.9rem 1.5rem',
                    background: 'none',
                    border: 'none',
                    color: item.name === 'Sign Out' ? '#ff4d94' : 'var(--text-color)',
                    fontSize: '0.95rem',
                    fontWeight: item.name === 'Sign Out' ? '600' : '400',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    borderTop: item.name === 'Sign Out' ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                    marginTop: item.name === 'Sign Out' ? '0.5rem' : '0'
                  }}
                >
                  {item.name}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.04, color: 'var(--accent-1)' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            if (location.pathname !== '/') {
              navigate('/');
              setTimeout(() => scrollTo('home'), 500);
            } else {
              scrollTo('home');
            }
          }}
          style={{
            background: 'rgba(102, 252, 241, 0.12)',
            border: '1px solid var(--accent-1)',
            color: 'var(--accent-1)',
            padding: '0.55rem 1.15rem',
            borderRadius: '999px',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            cursor: 'pointer',
            textTransform: 'uppercase',
            transition: 'color 0.2s, background 0.2s',
          }}
        >
          Home
        </motion.button>
      </div>
    </motion.nav>
  );
}
