'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import PolaroidCard from './Polariod';
import { MemoryType } from '@/types/memory'; // Your memory type

interface PolaroidStackProps {
  month: string;
  memories: MemoryType[];
}

const PolaroidStack: React.FC<PolaroidStackProps> = ({ month, memories }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleStack = () => {
    if (memories.length > 1) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-col items-center my-8 group">
      {/* Month Label */}
      {/* <h2 className="text-3xl mb-4 font-mono text-[#f2ebdf]">{month}</h2> */}

      {/* Stack (clickable if multiple memories) */}
      <div
        onClick={toggleStack}
        className={`relative ${
          isOpen ? 'flex flex-wrap justify-center w-auto h-auto space-x-4' : 'w-[300px] h-[400px]'
        } transition-all duration-500 ease-in-out cursor-pointer`}
      >
        {memories.map((memory, index) => (
          <motion.div
            key={memory.id}
            layout
            className={`${isOpen ? 'static' : 'absolute'}`}
            style={
              isOpen
                ? {}
                : {
                    top: index * 5,
                    left: index * 5,
                    zIndex: memories.length - index,
                    rotate: `${index % 2 === 0 ? -2 : 5}deg`,
                  }
            }
            whileHover={{ rotate: isOpen ? 0 : 0, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          >
            <PolaroidCard
               memory={memory}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PolaroidStack;