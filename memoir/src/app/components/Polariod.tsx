import React, { useState } from 'react';
import { Card, CardContent } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useLongPress } from '../hooks/longPress';
import { deleteMemory } from '@/lib/deleteMemory';
import { MemoryType } from '@/types/memory';
import DeleteConfirmModal from './handleDelete';
import toast from 'react-hot-toast';

interface PolaroidCardProps {
  memory: MemoryType;
}
// interface PolaroidCardProps {
//   imageSrc?: string;
//   caption?: string;
//   date?: string; 
// }


const PolaroidCard: React.FC<PolaroidCardProps> = ({ memory }) => {
  
   const [modalOpen, setModalOpen] = useState(false);
  
  // Extract the month from the date
  const month = memory.date ? new Date(memory.date).toLocaleString('default', { month: 'long' }) : '';

  const formatMonthYear = (dateString: string) => {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      year: '2-digit',
    });
    return formatter.format(date); // ➔ "Apr '25"
  };

  const handleDelete = async () => {
    try {
      await deleteMemory(memory.id);
      setModalOpen(false);
      toast.success('Memory deleted 💔', {
        icon: '🗑️',
        style: {
          background: '#f6bcbc',
          color: '#4b2c2c',
          borderRadius: '10px',
          fontWeight: 'bold',
        },
      });
    } catch (error) {
      toast.error('Failed to delete memory 😞', {
        style: {
          background: '#ffcdd2',
          color: '#b71c1c',
          borderRadius: '10px',
        },
      });
    }
  };
  
  const longPressProps = useLongPress(() => {
    setModalOpen(true);
  }, 700);

  
  
  return (
    <>
    <Card {...longPressProps} sx={{ backgroundColor: '#f7d5d6' }} className="relative w-72 bg-pink-500 rounded-lg shadow-xl p-4 m-4 overflow-hidden">
      {/* Thumbtack icon */}
      <div className="absolute top-2 z-50 left-2 text-xl text-red-600">
        <FavoriteIcon />
      </div>

      {/* Image container, increased height */}
      <div className="relative w-full h-72 flex justify-center items-center overflow-hidden mb-2 rounded-lg">
        {memory.imageUrl ? (
          <img
          src={memory.imageUrl}
          alt="Polaroid"
          className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400">No Image</div>
        )}
      </div>

      {/* Month display with typewriter font */}
      {month && (
        <div className="text-center font-mono font-bold text-xl text-gray-600 -mb-4">
          {formatMonthYear(memory.date || '')}
        </div>
      )}

      {/* Caption with marker-like font */}
      {memory.caption && (
        <CardContent className="text-center text-gray-800 -mb-6">
          <p className="font-permanent-marker text-xl">{memory.caption}</p>
        </CardContent>
      )}
    </Card>
    <DeleteConfirmModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
      />
      </>
  );
};

export default PolaroidCard;