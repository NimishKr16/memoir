"use client";
import { motion } from "framer-motion";
import FallingPetals from "../components/FallingPetals";
import UploadButton from "../components/UploadButton";
import { useEffect, useState } from "react";
import Loader from "react-js-loader";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { groupBy } from "lodash";
import PolaroidStack from "../components/PolaroidStack";

interface Memory {
  id: string;
  date: string; // The date should be in string format or Date object
  imageUrl: string; // Base64 image data
  caption: string;
}

export default function MemoirPage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "memories"),
      (querySnapshot) => {
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
          // const monthA = new Date(a.date).getMonth(); // Get month from date
          // const monthB = new Date(b.date).getMonth(); // Get month from date
          // return monthA - monthB; // Sort in ascending order of month
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

        setMemories(sortedMemories);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe(); // Clean up the listener on component unmount
    };
  }, []); // Empty dependency array means this runs once on mount
  // Animation for Polaroid Cards
  const groupedMemories = groupBy(memories, (memory) => {
    const date = new Date(memory.date);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "2-digit",
    }).format(date);
  });

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
          className="flex flex-wrap justify-center gap-6 mt-12"
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.3 }} // Stagger animation for each card
        >
          {memories.length > 0 ? (
            Object.entries(groupedMemories).map(([monthYear, memories]) => (
              <PolaroidStack
                key={monthYear}
                month={monthYear}
                memories={memories}
              />
            ))
          ) : (
            <>
              <div className="flex flex-col items-center justify-center text-center mt-40 space-y-4">
                <div className="text-4xl sm:text-5xl font-extrabold text-pink-300 animate-bounce">
                  Begin Our Journey 💖
                </div>
                <p className="text-xl sm:text-xl text-pink-200 max-w-md">
                  Our love story deserves to be remembered. 📸 <br />
                  Add our first beautiful memory together!
                </p>
                <div className="w-16 h-1 bg-pink-300 rounded-full mt-4 animate-pulse" />
              </div>
            </>
          )}
        </motion.div>
      )}

      {/* Upload Button positioned at the bottom, mobile responsive */}
      <div className="fixed bottom-8 left-1/2 z-100 transform -translate-x-1/2 sm:mb-12 md:mt-8 mb-6">
        <UploadButton />
      </div>
    </div>
  );
}
