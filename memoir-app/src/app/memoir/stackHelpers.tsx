import React from "react";

export const stackOffset = (index: number) => ({
  left: `${index * 12}px`,
  top: `${index * 6}px`,
  zIndex: 100 + index,
});
