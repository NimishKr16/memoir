import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import UploadModal from './UploadModal';

const UploadButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed mt-2 pb-2 bottom-1 left-1/2 transform -translate-x-1/2">
        <IconButton
          className="text-white rounded-full shadow-lg p-3 hover:bg-pink-600 transition-all ease-in-out duration-300"
          style={{ fontSize: '2rem', backgroundColor: '#6e0202' }}
          onClick={() => setOpen(true)}
        >
          <AddPhotoAlternateIcon sx={{ fontSize: '2.5rem', color: 'black' }} />
        </IconButton>
      </div>

      <UploadModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default UploadButton;