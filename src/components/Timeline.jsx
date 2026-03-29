import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useSpring } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const storyEvents = [
  { year: "2018", title: "Hello World", desc: "Wrote the first lines of code. A simple 'Hello World' that sparked an obsession." },
  { year: "2019", title: "The JS Tsunami", desc: "Dived deep into JavaScript, struggling with callbacks, promises, and the 'this' keyword." },
  { year: "2020", title: "Framework Frenzy", desc: "Discovered React. Component architecture changed everything. The world became modular." },
  { year: "2022", title: "Full Stack Reality", desc: "Connected the front to the back. Databases, APIs, and the joy of deploying a full application." },
  { year: "2024", title: "State of Art", desc: "Crafting beautiful, interactive experiences using 3D graphics and advanced animations." },
  { year: "2025", title: "The AI Revolution", desc: "Integrating Large Language Models and AI agents seamlessly into production applications natively." },
  { year: "2026", title: "Future Architect", desc: "Leading engineering workflows to build entirely autonomous and scalable digital ecosystems." }
];

export default function Timeline() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    itemsRef.current.forEach((el, index) => {
      gsap.fromTo(el, 
        { opacity: 0, x: index % 2 === 0 ? -100 : 100, y: 50 },
        {
          opacity: 1, x: 0, y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <div id="journey" ref={containerRef} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '5rem 2rem 6rem', marginTop: '0.5rem', background: 'linear-gradient(to bottom, var(--bg-color), #111)' }}>
      <h2 style={{ textAlign: 'center', fontSize: '3.5rem', marginBottom: '3rem', marginTop: '0.5rem', color: 'var(--accent-2)' }}>The Journey</h2>
      
      <div style={{ position: 'relative', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
        {/* The center line */}
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '100%', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px' }}></div>
        <motion.div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '100%', background: 'linear-gradient(to bottom, var(--accent-1), var(--accent-3))', borderRadius: '2px', scaleY, transformOrigin: 'top' }}></motion.div>
        
        {storyEvents.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div 
              key={index} 
              ref={el => itemsRef.current[index] = el}
              style={{ 
                display: 'flex', 
                justifyContent: isLeft ? 'flex-start' : 'flex-end', 
                marginBottom: '4rem',
                position: 'relative'
              }}
            >
              {/* Timeline dot */}
              <div 
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '20px',
                  transform: 'translate(-50%, -50%)',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'var(--bg-color)',
                  border: '4px solid var(--accent-1)',
                  boxShadow: '0 0 15px var(--accent-1), inset 0 0 10px var(--accent-1)',
                  zIndex: 2,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.5)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'}
              ></div>

              <div className="glass-panel" style={{ 
                width: '45%', 
                textAlign: isLeft ? 'right' : 'left',
                borderLeft: !isLeft ? '2px solid var(--accent-1)' : '1px solid var(--glass-border)',
                borderRight: isLeft ? '2px solid var(--accent-3)' : '1px solid var(--glass-border)',
                transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s',
                cursor: 'pointer',
                backdropFilter: 'none',
                WebkitBackdropFilter: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = isLeft ? 'translateX(-10px) translateY(-10px)' : 'translateX(10px) translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(102, 252, 241, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0) translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <h3 style={{ fontSize: '2rem', color: 'var(--accent-1)', marginBottom: '0.5rem' }}>{item.year}</h3>
                <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{item.title}</h4>
                <p style={{ lineHeight: '1.6', color: 'var(--text-color)' }}>{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
