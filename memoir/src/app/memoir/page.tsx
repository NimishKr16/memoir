"use client";
import { motion } from "framer-motion";
import FallingPetals from "../components/FallingPetals";
import PolaroidCard from "../components/Polariod";
import UploadButton from "../components/UploadButton";
import { useEffect, useState } from "react";
import { fetchMemories } from "@/lib/fetchMemories";
import Loader from "react-js-loader";
import { db } from '@/lib/firebase'
import { collection, onSnapshot } from 'firebase/firestore';
interface Memory {
  id: string;
  date: string;        // The date should be in string format or Date object
  imageUrl: string; // Base64 image data
  caption: string;
}

export default function MemoirPage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'memories'), (querySnapshot) => {
      const memories: Memory[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        memories.push({
          id: doc.id,
          date: data.date,
          imageUrl: data.imageUrl,
          caption: data.caption,
        });
      });

      // Sort memories by month in increasing order
      const sortedMemories = memories.sort((a, b) => {
        const monthA = new Date(a.date).getMonth(); // Get month from date
        const monthB = new Date(b.date).getMonth(); // Get month from date
        return monthA - monthB; // Sort in ascending order of month
      });

      setMemories(sortedMemories);
      setLoading(false);
    });

    return () => {
      unsubscribe(); // Clean up the listener on component unmount
    };
  }, []); // Empty dependency array means this runs once on mount
  // Animation for Polaroid Cards
  const polaroidAnimation = {
    initial: { opacity: 0, y: -50 }, // Start off-screen above
    animate: { opacity: 1, y: 0 }, // Drop to normal position with fade-in
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 25,
      duration: 0.8,
    },
  };

  return (
    <div className="min-h-screen bg-[#540707] text-[#f2ebdf] px-4 pt-20 sm:pt-32 flex flex-col items-center">
      <FallingPetals />

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-7xl md:text-6xl sm:text-8xl text-center italic"
        style={{ fontFamily: '"Great Vibes", cursive' }}
      >
        Memoir 💗
      </motion.h1>

      {/* Polaroid Cards Section with Staggered Animation */}
      {loading ? (
        <Loader type="heart" color="#f55dbb" bgColor="#f55dbb" size={100} />
      ) : (
        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-12"
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.3 }} // Stagger animation for each card
        >
          {memories.length > 0 ? (
            memories.map((memory: any) => (
              <motion.div key={memory.id} variants={polaroidAnimation}>
                <PolaroidCard
                  imageSrc={memory.imageUrl}
                  caption={memory.caption}
                  date={memory.date}
                />
              </motion.div>
            ))
          ) : (
            <>
              <div className="text-3xl text-[#540707] font-bold mb-4">
                Begin Your Journey 💖
              </div>
              <p className="text-lg text-[#540707] mb-4">
                Start your memoir by adding your first beautiful memory
                together. 📸
              </p>
            </>
          )}
        </motion.div>
      )}

      {/* Upload Button positioned at the bottom, mobile responsive */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 sm:mb-12 md:mt-8 mb-6">
        <UploadButton />
      </div>
    </div>
  );
}
