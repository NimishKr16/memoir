import React from 'react';
import { Card, CardContent } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface PolaroidCardProps {
  imageSrc?: string;
  caption?: string;
}

const PolaroidCard: React.FC<PolaroidCardProps> = ({ imageSrc, caption }) => {
  return (
    <Card sx={{ backgroundColor: '#f7d5d6' }} className="relative w-72 bg-pink-500 rounded-lg shadow-lg p-4 m-4">
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

      {/* Caption area, reduced height */}
      {caption && (
        <CardContent className="text-center text-gray-800 p-2">
          {caption}
        </CardContent>
      )}
    </Card>
  );
};

export default PolaroidCard;