'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Petal {
  left: number;
  delay: number;
  duration: number;
}

const FallingPetals = () => {
  const [show, setShow] = useState(true);
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Generate petal positions and timings only on client
    const generatedPetals = Array.from({ length: 10 }).map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 5 + Math.random() * 5,
    }));
    setPetals(generatedPetals);

    // Hide after 7 seconds
    const timeout = setTimeout(() => setShow(false), 7000);
    return () => clearTimeout(timeout);
  }, []);

  if (!show) return null;

  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      {petals.map((petal, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl sm:text-4xl"
          style={{ left: `${petal.left}%` }}
          initial={{ y: '-10vh', opacity: 0 }}
          animate={{ y: '110vh', opacity: 1, rotate: 360 }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            ease: 'easeInOut',
          }}
        >
          🌸
        </motion.div>
      ))}
    </div>
  );
};

export default FallingPetals;