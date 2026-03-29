import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sparkles, Float, MeshDistortMaterial } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FloatingShape = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <MeshDistortMaterial 
          color="#66fcf1" 
          envMapIntensity={1} 
          clearcoat={1} 
          clearcoatRoughness={0.1}
          metalness={0.8}
          roughness={0.2}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  );
};

export default function Hero() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]);
  const yText = useTransform(scrollY, [0, 1000], [0, 500]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div
      id="home"
      className="hero-bg"
      style={{
        width: '100vw',
        height: '100vh',
        boxSizing: 'border-box',
        marginBottom: '3rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, y: yBg }}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#ff007f" />
          <directionalLight position={[-10, -10, -5]} intensity={1} color="#66fcf1" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Sparkles count={200} scale={12} size={2} speed={0.4} opacity={0.6} color="#66fcf1" />
          <FloatingShape />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </motion.div>

      <div style={{ 
        position: 'absolute', 
        top: '0', 
        left: '0', 
        width: '100%', 
        height: '100%', 
        zIndex: 1,
        pointerEvents: 'none'
      }}>
        <motion.div
          initial={{ x: -24, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          style={{
            position: 'absolute',
            top: '6.5rem',
            left: '2rem',
            zIndex: 10,
            y: yText,
            opacity: opacityText,
          }}
        >
          <h1 style={{ 
            fontSize: '3rem', 
            margin: 0, 
            letterSpacing: '8px', 
            textAlign: 'left', 
            lineHeight: '1.2',
            fontFamily: "'Outfit', sans-serif",
            fontWeight: '900',
            color: 'var(--accent-1)'
          }}>
            <motion.span 
              animate={{ 
                scale: [1, 1.05, 1]
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              style={{
                backgroundColor: 'var(--accent-1)',
                color: '#0b0c10',
                padding: '4px 16px',
                borderRadius: '12px',
                display: 'inline-block',
                fontWeight: '900'
              }}>
              NARRATEX
            </motion.span>
          </h1>
        </motion.div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%'
        }}>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            style={{
              textAlign: 'center',
              padding: '3rem 2rem',
              marginTop: '1rem',
              background: 'radial-gradient(ellipse at center, rgba(11, 12, 16, 0.45) 0%, rgba(11, 12, 16, 0) 72%)',
              borderRadius: '50%',
              zIndex: 10,
              pointerEvents: 'auto',
              y: yText,
              opacity: opacityText,
            }}
          >
            <h2 style={{ fontSize: '4rem', marginBottom: '1.5rem', maxWidth: '800px', lineHeight: '1.3', color: '#fff', fontWeight: 800 }}>
              The Life of a Developer
            </h2>
            <p style={{ fontSize: '1.5rem', color: 'var(--text-color)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
              Fix one bug, create three more… welcome to development.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '3rem', flexWrap: 'wrap' }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(102, 252, 241, 0.8)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const el = document.getElementById('journey');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
              }}
              style={{
                background: 'var(--accent-1)',
                color: '#000',
                border: 'none',
                padding: '1rem 2.5rem',
                borderRadius: '30px',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 0 15px rgba(102, 252, 241, 0.4)',
                transition: 'all 0.3s ease'
              }}
            >
              Start Journey
            </motion.button>

            <motion.button
               whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}
               whileTap={{ scale: 0.95 }}
               onClick={() => navigate('/signin')}
               style={{
                 display: 'flex',
                 alignItems: 'center',
                 gap: '12px',
                 background: 'rgba(11, 12, 16, 0.85)',
                 border: '1px solid rgba(255, 255, 255, 0.25)',
                 color: '#ffffff',
                 padding: '1rem 2rem',
                 borderRadius: '30px',
                 fontSize: '1.1rem',
                 fontWeight: '600',
                 cursor: 'pointer',
                 transition: 'all 0.3s ease',
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
              Sign in with Google
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          style={{ position: 'absolute', bottom: '40px' }}
        >
          <div style={{ width: '30px', height: '50px', border: '2px solid var(--accent-1)', borderRadius: '15px', position: 'relative' }}>
            <motion.div 
              animate={{ y: [0, 15, 0] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ width: '6px', height: '6px', backgroundColor: 'var(--accent-1)', borderRadius: '50%', position: 'absolute', top: '10px', left: '10px' }}
            />
          </div>
        </motion.div>
        </div>
      </div>
    </div>
  );
}
