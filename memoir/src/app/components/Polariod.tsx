import React from 'react';
import { Card, CardContent } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface PolaroidCardProps {
  imageSrc?: string;
  caption?: string;
  date?: string; // Add the date field
}


const PolaroidCard: React.FC<PolaroidCardProps> = ({ imageSrc, caption, date }) => {
  // Extract the month from the date
  const month = date ? new Date(date).toLocaleString('default', { month: 'long' }) : '';

  const formatMonthYear = (dateString: string) => {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      year: '2-digit',
    });
    return formatter.format(date); // ➔ "Apr '25"
  };
  
  return (
    <Card sx={{ backgroundColor: '#f7d5d6' }} className="relative w-72 bg-pink-500 rounded-lg shadow-xl p-4 m-4 overflow-hidden">
      {/* Thumbtack icon */}
      <div className="absolute top-2 z-50 left-2 text-xl text-red-600">
        <FavoriteIcon />
      </div>

      {/* Image container, increased height */}
      <div className="relative w-full h-72 flex justify-center items-center overflow-hidden mb-2 rounded-lg">
        {imageSrc ? (
          <img
            src={imageSrc}
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
          {formatMonthYear(date || '')}
        </div>
      )}

      {/* Caption with marker-like font */}
      {caption && (
        <CardContent className="text-center text-gray-800 -mb-6">
          <p className="font-permanent-marker text-xl">{caption}</p>
        </CardContent>
      )}
    </Card>
  );
};

export default PolaroidCard;