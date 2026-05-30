"use client";
import { motion } from "framer-motion";
import FallingPetals from "../components/FallingPetals";
import PolaroidCard from "../components/Polariod";
import UploadButton from "../components/UploadButton";
import MobileBottomNav from "../components/MobileBottomNav";
import { useEffect, useState, useMemo } from "react";
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

        // Sort memories by date in descending order (latest first)
        const sortedMemories = memories.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
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

  // Group memories by month-year for stacks
  const grouped = useMemo(() => {
    const map: Record<string, typeof memories> = {};
    memories.forEach((m) => {
      const key = formatMonthYear(m.date);
      if (!map[key]) map[key] = [];
      map[key].push(m);
    });
    return map;
  }, [memories]);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const toggleExpand = (month: string) =>
    setExpandedId((cur) => (cur === month ? null : month));

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
        <div className="mt-16 flex flex-col items-center justify-center gap-4 text-center">
          <div className="relative h-16 w-16 animate-pulse">
            <div className="absolute inset-0 rounded-full bg-[#f55dbb]/30 blur-xl" />
            <div className="absolute inset-3 flex items-center justify-center rounded-full bg-[#f55dbb] text-white shadow-lg">
              <span className="text-2xl leading-none">♥</span>
            </div>
          </div>
          <p className="text-lg font-medium text-[#f2ebdf]">Loading memories...</p>
        </div>
      ) : (
        <motion.div
          className="w-full mt-12 flex flex-col items-center"
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.2 }}
        >
          {memories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center max-w-7xl mx-auto px-4">
              {Object.entries(grouped).map(([month, items]) => (
                <div
                  key={month}
                  className="bg-transparent p-0 rounded-md w-full flex justify-center py-8 sm:py-0"
                >
                  <div className="flex flex-col items-center gap-6 w-full">
                    {/* Stack area - clickable to expand (hidden when expanded) */}
                    {expandedId !== month && (
                      <div
                        className="relative w-72 h-80 cursor-pointer"
                        onClick={() => toggleExpand(month)}
                      >
                        {items.slice(0, 4).map((mem, i) => {
                          // Show only first 4 cards in stack with criss-cross tilt
                          const rotation = i % 2 === 0 ? -3 : 3;
                          return (
                            <motion.div
                              key={mem.id}
                              variants={polaroidAnimation}
                              style={{
                                position: "absolute",
                                left: `${i * 8}px`,
                                top: `${i * 4}px`,
                                zIndex: 100 + i,
                              }}
                            >
                              <PolaroidCard
                                imageSrc={mem.imageUrl}
                                caption={mem.caption}
                                date={mem.date}
                                isExpanded={false}
                                rotation={rotation}
                              />
                            </motion.div>
                          );
                        })}
                        {/* Show indicator if more cards exist */}
                        {items.length > 4 && (
                          <div className="absolute bottom-2 right-2 bg-white text-[#540707] rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold z-40">
                            +{items.length - 4}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Expanded area: all cards in a column when month is clicked */}
                    {expandedId === month && (
                      <motion.div
                        layout
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        }}
                        className="w-full flex justify-center cursor-pointer"
                        onClick={() => toggleExpand(month)}
                      >
                        <div className="flex flex-col items-center gap-4 w-full">
                          {items.map((mem) => (
                            <motion.div
                              key={mem.id}
                              layout
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 20,
                              }}
                            >
                              <PolaroidCard
                                imageSrc={mem.imageUrl}
                                caption={mem.caption}
                                date={mem.date}
                                isExpanded={false}
                                rotation={0}
                              />
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="text-3xl text-[#540707] font-bold mb-4 text-center">
                Begin Your Journey 💖
              </div>
              <p className="text-lg text-[#540707] mb-4 text-center">
                Start your memoir by adding your first beautiful memory
                together. 📸
              </p>
            </>
          )}
        </motion.div>
      )}

      {/* Desktop floating upload (hidden on small screens) */}
      <div className="hidden sm:block fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
        <UploadButton />
      </div>

      {/* Mobile bottom nav with centered upload */}
      <MobileBottomNav />
    </div>
  );
}
