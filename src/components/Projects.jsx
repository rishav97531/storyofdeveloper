import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

const projects = [
  {
    title: "AI Storyboarder",
    desc: "A generative AI tool that generates 3D storyboards from scripts using Three.js and LLMs.",
    tag: "Next.js • Three.js",
    color: "rgba(102, 252, 241, 0.8)",
  },
  {
    title: "EcoTracker platform",
    desc: "Global dashboard tracking carbon emissions in real-time, handling millions of datapoints.",
    tag: "React • WebGL",
    color: "rgba(255, 0, 127, 0.8)",
  },
  {
    title: "HoloOS Interface",
    desc: "Concept futuristic operating system interface built natively in the browser with GSAP.",
    tag: "Vanilla JS • GSAP",
    color: "rgba(11, 255, 11, 0.8)",
  }
];

const TiltCard = ({ project }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-panel"
    >
      <div 
        style={{
          transform: "translateZ(50px)",
          padding: '2.5rem',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: `0 0 20px ${project.color.replace('0.8', '0.2')}`
        }}
      >
        <h3 style={{ fontSize: '2rem', color: project.color, textShadow: `0 0 10px ${project.color}`, marginBottom: '1rem' }}>{project.title}</h3>
        <p style={{ color: 'var(--text-color)', lineHeight: '1.6', fontSize: '1.1rem', marginBottom: '1.5rem' }}>{project.desc}</p>
        <span style={{ padding: '0.4rem 1rem', border: "1px solid " + project.color, borderRadius: '20px', fontSize: '0.9rem', color: project.color }}>
          {project.tag}
        </span>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  return (
    <div id="projects" ref={targetRef} style={{ height: '300vh', backgroundColor: '#111', marginTop: '1.5rem', paddingTop: '2rem' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
        <h2 style={{ textAlign: 'center', fontSize: '3.5rem', marginBottom: '2rem', color: '#fff', textShadow: '0 0 15px rgba(255,255,255,0.3)' }}>Projects Showcase</h2>
        
        <motion.div style={{
          x,
          display: 'flex',
          width: '300vw',
        }}>
          {projects.map((project, idx) => (
            <div
              key={idx}
              style={{ width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 2rem' }}
            >
              <div style={{ width: '100%', maxWidth: '600px', perspective: '1000px' }}>
                <TiltCard project={project} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
