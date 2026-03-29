import React, { useRef, useState, useEffect } from 'react';
import LottieModule from 'lottie-react';
import { motion, useInView } from 'framer-motion';

const Lottie = LottieModule.default || LottieModule;

const skills = [
  "JavaScript (ES6+)",
  "React & Redux",
  "HTML5 & CSS3",
  "Three.js & WebGL",
  "GSAP Animations",
  "Framer Motion",
  "Node.js & Express",
  "GraphQL & REST APIs"
];

export default function SkillsLottie() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/developer.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error("Failed to load Lottie animation", err));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div id="skills" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '6rem 2rem 8rem', marginTop: '1.5rem', backgroundColor: '#0b0c10', position: 'relative' }} ref={ref}>
      <h2 style={{ textAlign: 'center', fontSize: '3.5rem', marginBottom: '2rem', color: 'var(--accent-1)' }}>
        Toolbox & Skills
      </h2>
      
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        
        {/* Lottie Animation Side */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1 }}
          style={{ flex: '1 1 400px', maxWidth: '500px' }}
        >
          <div className="glass-panel" style={{ padding: '1rem', background: 'rgba(102, 252, 241, 0.05)', minHeight: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {animationData ? <Lottie animationData={animationData} loop={true} /> : <div style={{color: 'var(--accent-1)'}}>Loading Animation...</div>}
          </div>
        </motion.div>

        {/* Skills List Side */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ flex: '1 1 400px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}
        >
          {skills.map((skill, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.08, backgroundColor: 'rgba(102, 252, 241, 0.15)', borderColor: 'var(--accent-1)', boxShadow: '0px 0px 20px rgba(102, 252, 241, 0.4)' }}
              className="glass-panel"
              style={{
                padding: '1.5rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'border-color 0.3s, box-shadow 0.3s'
              }}
            >
              <h4 style={{ fontSize: '1.2rem', color: '#fff', margin: 0 }}>{skill}</h4>
            </motion.div>
          ))}
        </motion.div>

      </div>
      
      <div style={{ textAlign: 'center', marginTop: '6rem', paddingBottom: '2rem' }}>
        <p style={{ color: 'var(--text-color)', fontSize: '1.2rem' }}>End of line. But the code never stops compiling.</p>
        <motion.button 
          whileHover={{ scale: 1.1, boxShadow: '0 0 20px var(--accent-1)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            marginTop: '2rem',
            padding: '1rem 2rem',
            fontSize: '1.2rem',
            color: '#000',
            backgroundColor: 'var(--accent-1)',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Back to Top
        </motion.button>
      </div>
    </div>
  );
}
