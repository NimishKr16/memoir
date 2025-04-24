'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const heartsAndKisses = ['❤️', '💋'];  // Array with heart and lipstick emojis
const hearts = Array.from({ length: 12 });

const FloatingHearts = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);  // Ensures the animation runs only on the client side
  }, []);

  if (!isClient) return null;  // Prevents rendering during SSR to avoid hydration issues

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {hearts.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = 8 + Math.random() * 6;
        const emoji = heartsAndKisses[Math.floor(Math.random() * heartsAndKisses.length)];  // Randomly choose heart or kiss emoji

        return (
          <motion.div
            key={i}
            className="absolute text-[#f2ebdf] text-xl sm:text-3xl"
            style={{ left: `${left}%` }}
            initial={{ y: '100vh', opacity: 0 }}
            animate={{ y: '-10vh', opacity: 1 }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          >
            {emoji}
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingHearts;