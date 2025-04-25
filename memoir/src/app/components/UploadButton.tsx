import React from 'react';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Heart icon or any other icon you'd prefer
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'; // Photo upload icon

const UploadButton: React.FC = () => {
  return (
    <div className="fixed mt-2 bottom-1  left-1/2 transform -translate-x-1/2 ">
      {/* Upload Button with heart or photo icon */}
      <IconButton
        className=" text-white rounded-full shadow-lg p-3 hover:bg-pink-600 transition-all ease-in-out duration-300"
        style={{ fontSize: '2rem', backgroundColor: '#6e0202' }}
        onClick={() => alert('Upload Picture')} // Handle your upload logic here
      >
        <AddPhotoAlternateIcon sx={{ fontSize: '2.5rem', color: 'black' }} />
      </IconButton>
    </div>
  );
};

export default UploadButton;