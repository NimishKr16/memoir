'use client';
import { motion } from 'framer-motion';
import FallingPetals from '../components/FallingPetals';
import PolaroidCard from '../components/Polariod';
import UploadButton from '../components/UploadButton';

export default function MemoirPage() {
  // Animation for Polaroid Cards
  const polaroidAnimation = {
    initial: { opacity: 0, y: -50 }, // Start off-screen above
    animate: { opacity: 1, y: 0 }, // Drop to normal position with fade-in
    transition: { 
      type: 'spring', 
      stiffness: 100, 
      damping: 25,
      duration: 0.8
    }
  };

  return (
    <div className="min-h-screen bg-[#540707] text-[#f2ebdf] px-4 pt-20 sm:pt-32 flex flex-col items-center">
      <FallingPetals />

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="text-7xl md:text-6xl sm:text-8xl text-center italic"
        style={{ fontFamily: '"Great Vibes", cursive' }}
      >
        Memoir 💗
      </motion.h1>

      {/* Polaroid Cards Section with Staggered Animation */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4 mt-12"
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.3 }} // Stagger animation for each card
      >
        <motion.div variants={polaroidAnimation}>
          <PolaroidCard
            imageSrc="https://images.unsplash.com/photo-1593642532973-d31b6557fa68"
            caption="A beautiful sunset over the mountains!"
          />
        </motion.div>
        
        <motion.div variants={polaroidAnimation}>
          <PolaroidCard caption="A simple caption" />
        </motion.div>

        <motion.div variants={polaroidAnimation}>
          <PolaroidCard caption="Another memory" />
        </motion.div>
      </motion.div>

      {/* Upload Button positioned at the bottom, mobile responsive */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 sm:mb-12 md:mt-8 mb-6">
        <UploadButton />
      </div>
    </div>
  );
}