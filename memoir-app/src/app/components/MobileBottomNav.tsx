"use client";

import React from "react";
import { Box, IconButton } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import UploadButton from "./UploadButton";

const MobileBottomNav: React.FC = () => {
  return (
    <div className="fixed left-0 right-0 bottom-0 z-[99999] sm:hidden pointer-events-none translate-y-0 transform-gpu">
      <div className="pointer-events-auto w-full border-t border-[#f2ebdf]/15 bg-[#540707] pt-3 pb-[calc(0.65rem+env(safe-area-inset-bottom))] shadow-[0_-12px_30px_rgba(0,0,0,0.28)]">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            px: 2,
          }}
        >
          <Box />

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <UploadButton />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", pr: 1.5 }}>
            <IconButton
              component="a"
              href="https://riv-ai.vercel.app/"
              target="_blank"
              rel="noreferrer"
              aria-label="Open Riv AI"
              sx={{
                width: 34,
                height: 34,
                color: "#f2ebdf",
                backgroundColor: "rgba(242, 235, 223, 0.1)",
                "&:hover": {
                  backgroundColor: "rgba(242, 235, 223, 0.2)",
                },
              }}
            >
              <AutoAwesomeRoundedIcon sx={{ fontSize: "1rem" }} />
            </IconButton>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default MobileBottomNav;
