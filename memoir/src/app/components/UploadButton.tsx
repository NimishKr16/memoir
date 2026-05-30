import React, { useState } from "react";
import { IconButton } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import UploadModal from "./UploadModal";

const UploadButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-4 left-0 right-0 z-[9999] flex justify-center pointer-events-none sm:bottom-8">
        <IconButton
          className="pointer-events-auto text-white rounded-full shadow-lg p-3 hover:bg-pink-600 transition-all ease-in-out duration-300"
          style={{ fontSize: "2rem", backgroundColor: "#6e0202" }}
          onClick={() => setOpen(true)}
        >
          <AddPhotoAlternateIcon sx={{ fontSize: "2.5rem", color: "pink" }} />
        </IconButton>
      </div>

      <UploadModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default UploadButton;
