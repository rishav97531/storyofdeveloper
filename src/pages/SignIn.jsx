import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowLeft } from 'lucide-react';

export default function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const toggleMode = () => setIsSignUp(!isSignUp);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.4 } }
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#fff',
    padding: '12px 16px 12px 48px',
    borderRadius: '8px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s'
  };

  const iconStyle = {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--accent-1)',
    opacity: 0.7
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="app-container hero-bg"
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', position: 'relative' }}
    >
      <motion.button
        whileHover={{ scale: 1.1, x: -5, boxShadow: '0 0 15px rgba(102, 252, 241, 0.5)' }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/')}
        style={{
          position: 'absolute', top: '2rem', left: '2rem',
          background: 'var(--glass-bg)', border: '1px solid var(--accent-1)',
          color: 'var(--text-color)', padding: '0.8rem', borderRadius: '50%',
          cursor: 'pointer', backdropFilter: 'blur(10px)', display: 'flex', zIndex: 10
        }}
      >
        <ArrowLeft size={24} />
      </motion.button>

      <AnimatePresence mode="wait">
        <motion.div
          key={isSignUp ? "signup" : "signin"}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            background: 'var(--glass-bg)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(102, 252, 241, 0.3)', borderRadius: '24px',
            padding: '3rem', width: '100%', maxWidth: '450px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 className="glow-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p style={{ color: 'var(--text-color)' }}>
              {isSignUp ? 'Join the journey today.' : 'Please enter your details.'}
            </p>
          </div>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={(e) => e.preventDefault()}>
            {isSignUp && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ position: 'relative' }}>
                <User style={iconStyle} size={20} />
                <input type="text" placeholder="Full Name" style={inputStyle} />
              </motion.div>
            )}

            <div style={{ position: 'relative' }}>
              <Mail style={iconStyle} size={20} />
              <input type="email" placeholder="Email Address" style={inputStyle} />
            </div>

            <div style={{ position: 'relative' }}>
              <Lock style={iconStyle} size={20} />
              <input type="password" placeholder="Password" style={inputStyle} />
            </div>

            {isSignUp && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ position: 'relative' }}>
                <Lock style={iconStyle} size={20} />
                <input type="password" placeholder="Confirm Password" style={inputStyle} />
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(255, 0, 127, 0.6)' }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: 'linear-gradient(45deg, var(--accent-3), #ff4d94)', border: 'none',
                color: '#fff', padding: '1rem', borderRadius: '8px',
                fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer', marginTop: '1rem'
              }}
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </motion.button>
          </form>

          {!isSignUp && (
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                <span style={{ color: 'var(--text-color)', fontSize: '0.9rem' }}>or continue with</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02, background: 'rgba(255, 255, 255, 0.15)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                  background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#ffffff', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer',
                  fontWeight: '600', transition: 'all 0.3s'
                }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                  </g>
                </svg>
                Google
              </motion.button>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p style={{ color: 'var(--text-color)', fontSize: '0.9rem' }}>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <span 
                onClick={toggleMode}
                style={{ color: 'var(--accent-1)', marginLeft: '8px', cursor: 'pointer', fontWeight: '600' }}
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
