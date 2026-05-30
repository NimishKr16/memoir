import React from "react";
import { Card } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface PolaroidCardProps {
  imageSrc?: string;
  caption?: string;
  date?: string;
  isExpanded?: boolean;
  onClick?: () => void;
  rotation?: number; // Rotation angle for stacked effect
}

const PolaroidCard: React.FC<PolaroidCardProps> = ({
  imageSrc,
  caption,
  date,
  isExpanded = false,
  onClick,
  rotation = 0,
}) => {
  // Defensive rewrite for Cloudinary URLs to ensure browser-friendly formats
  const displayImageSrc = imageSrc?.includes("res.cloudinary.com")
    ? imageSrc.replace("/upload/", "/upload/f_auto,q_auto/")
    : imageSrc;

  const formatMonthYear = (dateString: string) => {
    const dateObj = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "2-digit",
    });
    return formatter.format(dateObj); // ➔ "Apr '25"
  };

  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      className={`cursor-pointer transition-transform duration-300 hover:shadow-2xl ${isExpanded ? "w-full sm:w-[18rem]" : "w-72"}`}
      style={{
        transform: `rotate(${rotation}deg) ${isExpanded ? "scale(1)" : "scale(0.98)"}`,
      }}
    >
      <Card
        sx={{
          backgroundColor: "#f7d5d6",
          boxShadow: isExpanded
            ? "0 25px 50px rgba(0,0,0,0.3)"
            : "0 10px 25px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.1)",
        }}
        className={`relative ${isExpanded ? "w-full" : "w-72"} bg-pink-500 rounded-sm p-3 overflow-hidden transition-all duration-300 flex flex-col items-center`}
      >
        {/* Heart pin */}
        <div className="absolute top-3 left-3 z-50 text-red-500 opacity-80 hover:opacity-100 transition-opacity">
          <FavoriteIcon sx={{ fontSize: "1.5rem" }} />
        </div>

        {/* Image container */}
        <div
          className={`relative w-full ${isExpanded ? "h-96" : "h-64"} flex justify-center items-center overflow-hidden mb-3 rounded-sm bg-gray-100`}
        >
          {displayImageSrc ? (
            <img
              src={displayImageSrc}
              alt="Memory"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400 text-center">No Image</div>
          )}
        </div>

        {/* Date/Month display */}
        {date && (
          <div className="text-center text-sm font-semibold text-gray-700 mb-2 tracking-wide">
            {formatMonthYear(date)}
          </div>
        )}

        {/* Caption - hand-written style */}
        {caption && (
          <div className="w-full px-2 pb-2 flex justify-center">
            <p className="font-permanent-marker text-center text-gray-800 text-xl">
              {caption}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PolaroidCard;
