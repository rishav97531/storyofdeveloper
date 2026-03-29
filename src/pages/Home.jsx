import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Timeline from '../components/Timeline';
import Projects from '../components/Projects';
import SkillsLottie from '../components/SkillsLottie';
import Navbar from '../components/Navbar';
import DebuggingSection from '../components/DebuggingSection';
import CoffeeChronicles from '../components/CoffeeChronicles';
export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="app-container"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <Navbar />
      <Hero />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <Timeline />
        <DebuggingSection />
        <CoffeeChronicles />
        <Projects />
        <SkillsLottie />
      </div>
    </motion.div>
  );
}
