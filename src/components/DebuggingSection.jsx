import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const debuggingStories = [
  {
    title: 'The First Error',
    content: '> Uncaught TypeError: Cannot read properties of undefined (reading \'map\')\n\nAh, the classic. Staring at the screen at 2 AM, wondering why my beautifully crafted API suddenly decided to ghost me. I added 15 console.logs, only to realize I was destructuring the wrong object. Classic.',
    color: '#ff4444'
  },
  {
    title: 'Stack Overflow to the Rescue',
    content: '> Search: "How to center a div without crying"\n\nFound a thread from 2013. The accepted answer involved float: left and a clearfix hack. Scrolled down to the one comment with 4 upvotes from 2021 that simply said "flexbox". My hero, wherever you are.',
    color: '#00ff00'
  },
  {
    title: 'The Bug That Wasn\'t a Bug',
    content: '> Request failed with status code 403\n\nSpent three days debugging my authentication middleware. Rewrote the JWT logic twice. Traced every network request. Turns out... I was still pointing to localhost on production. Oops.',
    color: '#ffaa00'
  },
  {
    title: 'It Works on My Machine',
    content: '> Warning: Build failed.\n\n"But it works on my machine!" I cried, as the CI/CD pipeline failed for the 4th time. The culprit? A single casing error on an import statement that MacOS ignored but Linux treated as a federal crime. I now fear the letter \'C\'.',
    color: '#00ccff'
  }
];

export default function DebuggingSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorBlink(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="debugging" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '4rem' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="glass-panel"
        style={{
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: '16px',
          padding: '1.5rem 3rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          transition: 'all 0.3s ease',
          boxShadow: isOpen ? '0 0 20px rgba(102, 252, 241, 0.4)' : 'none'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 0 25px rgba(102, 252, 241, 0.5)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = isOpen ? '0 0 20px rgba(102, 252, 241, 0.4)' : 'none';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <h2 style={{ fontSize: '2.5rem', margin: 0, color: 'var(--accent-1)', display: 'flex', alignItems: 'center' }}>
          ~/debugging
          <span style={{ opacity: cursorBlink ? 1 : 0, transition: 'opacity 0.1s', marginLeft: '5px' }}>_</span>
        </h2>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ 
            width: '0', 
            height: '0', 
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderTop: '10px solid var(--accent-1)'
          }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: '2rem' }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ width: '100%', maxWidth: '1000px', overflow: 'hidden' }}
          >
            <div style={{
              background: '#0a0a0a',
              borderRadius: '12px',
              border: '1px solid #333',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              overflow: 'hidden'
            }}>
              {/* Terminal Window Header */}
              <div style={{
                background: '#1a1a1a',
                padding: '0.75rem 1rem',
                borderBottom: '1px solid #333',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
                <span style={{ marginLeft: '1rem', color: '#888', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                  story@developer: ~/journey/debugging
                </span>
              </div>

              {/* Terminal Content */}
              <div style={{
                padding: '2rem',
                fontFamily: '"Fira Code", monospace, "Courier New"',
                color: '#e0e0e0',
                lineHeight: '1.6'
              }}>
                <div style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
                  <span style={{ color: '#27c93f' }}>$</span> <span style={{ color: '#00ccff' }}>cat</span> struggles_and_fixes.txt
                </div>
                
                {debuggingStories.map((story, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                    style={{ marginBottom: '2.5rem' }}
                  >
                    <h3 style={{
                      color: story.color,
                      fontSize: '1.3rem',
                      marginBottom: '1rem',
                      fontFamily: 'monospace'
                    }}>
                      ## {story.title}
                    </h3>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      padding: '1.5rem',
                      borderRadius: '8px',
                      borderLeft: `4px solid ${story.color}`,
                      whiteSpace: 'pre-wrap',
                      fontSize: '1.05rem'
                    }}>
                      {story.content}
                    </div>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}
                >
                  <span style={{ color: '#27c93f' }}>$</span>
                  <span style={{ background: '#e0e0e0', width: '10px', height: '18px', marginLeft: '10px', opacity: cursorBlink ? 1 : 0, transition: 'opacity 0.1s' }}></span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
