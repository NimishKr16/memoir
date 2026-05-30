"use client";
import { motion } from "framer-motion";
import FallingPetals from "../components/FallingPetals";
import PolaroidCard from "../components/Polariod";
import UploadButton from "../components/UploadButton";
import { useEffect, useMemo, useState } from "react";
import Loader from "react-js-loader";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
interface Memory {
  id: string;
  date: string; // The date should be in string format or Date object
  imageUrl: string; // Base64 image data
  caption: string;
}

export default function MemoirPage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null);

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
      },
    );

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

  const formatMonthYear = (dateString: string) => {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "2-digit",
    });
    return formatter.format(date); // ➔ "Apr '25"
  };

  const groupedMemories = useMemo(() => {
    const groups = new Map<string, Memory[]>();

    memories.forEach((memory) => {
      const monthKey = formatMonthYear(memory.date);
      const current = groups.get(monthKey) ?? [];
      groups.set(monthKey, [...current, memory]);
    });

    return Array.from(groups.entries())
      .map(([monthKey, monthMemories]) => ({
        monthKey,
        monthMemories,
        sortDate: new Date(monthMemories[0].date).getTime(),
      }))
      .sort((a, b) => a.sortDate - b.sortDate);
  }, [memories]);

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
          className="mt-12 grid w-full max-w-7xl grid-cols-1 justify-items-center gap-6 sm:[grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]"
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.3 }} // Stagger animation for each card
        >
          {groupedMemories.length > 0 ? (
            groupedMemories.map(({ monthKey, monthMemories }) => {
              const isExpanded = expandedMonth === monthKey;
              const visibleMemories = isExpanded
                ? monthMemories
                : monthMemories.slice(0, 3);

              return (
                <motion.button
                  key={monthKey}
                  type="button"
                  onClick={() => setExpandedMonth(isExpanded ? null : monthKey)}
                  layout
                  className={`relative w-full max-w-[22rem] overflow-visible text-left transition-all duration-300 sm:max-w-none ${
                    isExpanded ? "h-auto min-h-[440px]" : "h-[440px]"
                  }`}
                  variants={polaroidAnimation}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div
                    className={`relative mx-auto w-full overflow-visible origin-top-left ${
                      isExpanded
                        ? "grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6 justify-start items-start"
                        : "h-full"
                    }`}
                  >
                    {visibleMemories.map((memory, index) => {
                      const collapsed = !isExpanded;
                      const xOffset = collapsed ? index * 12 : 0;
                      const yOffset = collapsed ? index * 14 : 0;
                      const scale = collapsed ? 1 - index * 0.045 : 1;
                      const rotate = collapsed
                        ? index % 2 === 0
                          ? -5 + index
                          : 5 - index
                        : 0;
                      const zIndex = collapsed ? 20 - index : 1;

                      return (
                        <motion.div
                          key={memory.id}
                          layout
                          className={
                            collapsed
                              ? "absolute left-4 top-4 origin-top-left"
                              : "relative origin-top-left justify-self-start"
                          }
                          style={{
                            x: xOffset,
                            y: yOffset,
                            zIndex,
                          }}
                          animate={{
                            x: xOffset,
                            y: yOffset,
                            scale,
                            rotate,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 220,
                            damping: 24,
                            mass: 0.9,
                          }}
                        >
                          <PolaroidCard
                            imageSrc={memory.imageUrl}
                            caption={memory.caption}
                            date={memory.date}
                          />
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.button>
              );
            })
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
