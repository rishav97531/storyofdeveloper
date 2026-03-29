import React from 'react';
import { motion } from 'framer-motion';

const coffeeStories = [
  {
    title: 'The First Sip ☕',
    content: '08:00 AM. The blank editor stares back. A hot ceramic mug is the only thing standing between the developer and total existential dread. Without this initial hit of roasted beans, arrays remain unmapped and promises unresolved.',
    color: '#d4b595'
  },
  {
    title: 'Coffee Before Git Push ☕',
    content: '14:30 PM. The feature is "done," but the fear of breaking the build looms. One does not simply run `git push origin main` without first taking a deep sip of espresso for courage. It provides the clarity needed to realize you left a debugger statement in production.',
    color: '#c29e75'
  },
  {
    title: 'The Debugging Brew ☕',
    content: '19:45 PM. The code compiles, but the UI is completely blank. The lukewarm, 4-hour-old latte suddenly tastes like pure liquid magic. With every sip, you trace the data flow slightly faster until the bug is found.',
    color: '#a37145'
  },
  {
    title: 'When Coffee Becomes the Variable ☕',
    content: '01:15 AM. You are no longer writing code; the caffeine is writing code through you. The codebase is a blur, the syntax feels natural, and you have become one with the machine. Your blood type is now officially "Arabica."',
    color: '#8c5a35'
  }
];

export default function CoffeeChronicles() {
  return (
    <div id="coffee" style={{ 
      padding: '4rem 2rem', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      marginBottom: '4rem',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          background: 'linear-gradient(145deg, rgba(74, 46, 27, 0.4), rgba(40, 24, 15, 0.8))',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(212, 181, 149, 0.2)',
          borderRadius: '24px',
          padding: '3rem 2vw',
          width: '100%',
          maxWidth: '1100px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 0 40px rgba(212, 181, 149, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
            margin: '0 0 1rem 0', 
            color: '#e8d2b7', 
            textAlign: 'center',
            fontFamily: "'Outfit', sans-serif"
          }}
        >
          The Coffee Chronicles ☕
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: '#bd9a7a',
            textAlign: 'center',
            maxWidth: '600px',
            marginBottom: '4rem',
            lineHeight: 1.6
          }}
        >
          Narrating the deep, emotional, and dependency-driven relationship between developers and their beans.
        </motion.p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          width: '100%',
          padding: '0 1rem',
          boxSizing: 'border-box'
        }}>
          {coffeeStories.map((story, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.2 + (i * 0.15), duration: 0.6 }}
              whileHover={{ scale: 1.03, translateY: -5 }}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '2rem',
                borderRadius: '16px',
                borderTop: `4px solid ${story.color}`,
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <h3 style={{
                color: '#e8d2b7',
                fontSize: '1.3rem',
                marginBottom: '1rem',
                fontFamily: "'Outfit', sans-serif"
              }}>
                {story.title}
              </h3>
              <p style={{
                color: '#d4b595',
                lineHeight: '1.7',
                fontSize: '1rem',
                opacity: 0.9,
                margin: 0
              }}>
                {story.content}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
