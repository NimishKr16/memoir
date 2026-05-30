'use client';
import { useEffect, useState } from 'react';
import { Button, Typography, Container } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FloatingHearts from './components/floatingHearts';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#540707] text-[#f2ebdf] flex items-center justify-center relative overflow-hidden">
      <FloatingHearts />

      {isClient && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="z-10 w-full px-4"
        >
          <Container
            maxWidth="md"
            className="text-center px-4 py-20 sm:py-32"
          >
            <Typography variant="h2" className="font-bold pb-6" style={{ fontSize: '3rem' }}>
              Welcome to <span className="italic">Memoir</span>
            </Typography>

            <Typography variant="body1" className="pb-8 text-lg sm:text-xl" style={{ fontSize: '2rem' }}>
              A memory board built just for <span className="italic font-bold">Mish</span> & <span className="italic font-bold">Riv</span> — to share love, laughter, and timeless moments from afar 💌
            </Typography>

            
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => router.push('/memoir')}
                endIcon={<FavoriteIcon />}
                sx={{ fontSize: '1.25rem' }}
                className="!bg-[#f2ebdf] !text-[#540707] hover:!bg-[#e5dcca]"
              >
                Start Sharing Memories
              </Button>
          </Container>
        </motion.div>
      )}
      
    </div>
    
  );
}