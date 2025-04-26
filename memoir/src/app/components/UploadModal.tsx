'use client';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { uploadMemory } from '@/lib/uploadMemory';
import toast from 'react-hot-toast';

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
}

// Styled romantic header
const RomanticDialogTitle = styled(DialogTitle)(() => ({
  color: '#f2ebdf',
  backgroundColor: '#6e0202',
  textAlign: 'center',
  fontFamily: 'cursive',
  fontWeight: 'bold',
  fontSize: '1.8rem',
  borderRadius: '10px',
}));

const UploadModal: React.FC<UploadModalProps> = ({ open, onClose }) => {
  const [image, setImage] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const [date, setDate] = useState('');

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string); // Base64 string
      };
      reader.onerror = reject;
      reader.readAsDataURL(file); // Read as Base64
    });
  };

  const handleUpload = async () => {
    if (!image || !caption || !date) {
      toast.error('Please fill in all the fields ✨', {
        style: {
          borderRadius: '10px',
          background: '#540707',
          color: '#f2ebdf',
          fontFamily: 'cursive',
        },
      });
      return;
    }

    try {
      // Convert the image to Base64
      const base64Image = await convertToBase64(image);

      // Upload the memory with Base64 image data
      toast.promise(
        uploadMemory(base64Image, caption, date),
        {
          loading: 'Saving your memory... 💌',
          success: 'Memory saved with love! 💖',
          error: 'Oops! Something went wrong 💔',
        },
        {
          style: {
            borderRadius: '10px',
            background: '#540707',
            color: '#f2ebdf',
            fontFamily: 'cursive',
          },
          iconTheme: {
            primary: '#f2ebdf',
            secondary: '#6e0202',
          },
        }
      );

      // Close the modal after success
      onClose();
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      // Reset the state after upload
      setImage(null);
      setCaption('');
      setDate('');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ className: 'bg-[#f5b0dc] text-[#f2ebdf] rounded-2xl p-4' }}>
      <RomanticDialogTitle>Upload a Memory 💖</RomanticDialogTitle>
      <DialogContent className="flex flex-col gap-4">
      <label className="cursor-pointer mt-2 flex flex-col items-center justify-center border-2 border-dashed border-[#f2ebdf] rounded-xl p-6 bg-[#6e0202] hover:bg-[#7d0202] transition duration-300 ease-in-out text-[#f2ebdf] text-center">
  {image ? (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <img src={URL.createObjectURL(image)} alt="Image Preview" className="w-32 h-32 object-cover mb-2 rounded-md" />
      <span className="text-lg font-medium">Image Uploaded 📸</span>
    </div>
  ) : (
    <span className="text-lg font-medium">Add a Memory 📸</span>
  )}
  
  <input
    type="file"
    accept="image/*"
    onChange={(e) => setImage(e.target.files?.[0] || null)}
    className="hidden"
  />
</label>

        <TextField
          label="Caption"
          variant="outlined"
          fullWidth
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="bg-white rounded-md"
        />

        <TextField
          label="Date"
          type="date"
          variant="outlined"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-white rounded-md"
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>
      <DialogActions className="flex justify-between px-6 pb-4">
        <Button
          onClick={onClose}
          className="!text-[#540707] hover:!bg-[#f2ebdf]"
        >
          Cancel
        </Button>
        <Button
          onClick={handleUpload}
          variant="contained"
          className="!bg-[#f2ebdf] !text-[#540707] hover:!bg-[#e5dcca]"
        >
          Save Memory
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadModal;