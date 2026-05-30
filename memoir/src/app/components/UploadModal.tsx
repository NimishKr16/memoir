"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { uploadMemory } from "@/lib/uploadMemory";
import toast from "react-hot-toast";

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
}

// Styled romantic header
const RomanticDialogTitle = styled(DialogTitle)(() => ({
  color: "#f2ebdf",
  backgroundColor: "#6e0202",
  textAlign: "center",
  fontFamily: "cursive",
  fontWeight: "bold",
  fontSize: "1.8rem",
  borderRadius: "10px",
}));

const UploadModal: React.FC<UploadModalProps> = ({ open, onClose }) => {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [date, setDate] = useState("");
  const wordCount = caption.trim().split(/\s+/).length;

  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [image]);

  const handleUpload = async () => {
    if (!image || !caption || !date) {
      toast.error("Please fill in all the fields ✨", {
        style: {
          borderRadius: "10px",
          background: "#540707",
          color: "#f2ebdf",
          fontFamily: "cursive",
        },
      });
      return;
    }

    try {
      await toast.promise(
        uploadMemory(image, caption, date),
        {
          loading: "Saving your memory... 💌",
          success: "Memory saved with love! 💖",
          error: "Oops! Something went wrong 💔",
        },
        {
          style: {
            borderRadius: "10px",
            background: "#540707",
            color: "#f2ebdf",
            fontFamily: "cursive",
          },
          iconTheme: {
            primary: "#f2ebdf",
            secondary: "#6e0202",
          },
        },
      );

      onClose();
      setImage(null);
      setCaption("");
      setDate("");
    } catch (err) {
      console.error("Upload failed:", err);
      return;
    }
  };

  const handleClose = () => {
    setImage(null);
    setPreviewUrl(null);
    setCaption("");
    setDate("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ className: "bg-[#f5b0dc] text-[#f2ebdf] rounded-2xl p-4" }}
    >
      <RomanticDialogTitle>Upload a Memory 💖</RomanticDialogTitle>
      <DialogContent className="flex flex-col gap-4">
        <label className="cursor-pointer mt-2 flex flex-col items-center justify-center border-2 border-dashed border-[#f2ebdf] rounded-xl p-6 bg-[#6e0202] hover:bg-[#7d0202] transition duration-300 ease-in-out text-[#f2ebdf] text-center">
          {image ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Image Preview"
                  className="w-36 h-36 object-cover mb-2 rounded-md shadow-lg border border-[#f2ebdf]/30"
                />
              ) : (
                <div className="w-36 h-36 mb-2 rounded-md border border-dashed border-[#f2ebdf]/40 flex items-center justify-center text-sm text-[#f2ebdf] bg-[#7d0202] px-3 text-center">
                  Preview unavailable for this file type
                </div>
              )}
              <span className="text-lg font-medium">Image Selected!</span>
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
          onChange={(e) => {
            const newCaption = e.target.value;
            const wordCount = newCaption.trim().split(/\s+/).length;

            if (wordCount <= 15) {
              setCaption(newCaption); // Update caption if word count is less than or equal to 15
            }
          }}
          className="bg-white rounded-md"
          helperText={`${wordCount} / 15 words`}
          error={wordCount > 15}
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
          onClick={handleClose}
          className="!text-[#540707] hover:!bg-[#f2ebdf]"
        >
          Cancel
        </Button>
        <Button
          onClick={handleUpload}
          variant="contained"
          className="!bg-[#f2ebdf] !text-[#540707] hover:!bg-[#e5dcca]"
          disabled={wordCount > 15}
        >
          Save Memory
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadModal;
