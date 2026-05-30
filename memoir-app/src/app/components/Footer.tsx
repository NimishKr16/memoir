import { Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer className="text-[#f2ebdf] text-center py-16 pb-[calc(8rem+env(safe-area-inset-bottom))] sm:py-8 sm:pb-8 mt-12">
      <Typography
        variant="body1"
        className="text-lg sm:text-xl"
        style={{ fontSize: "1rem" }}
      >
        Crafted with love by{" "}
        <strong className="text-[#f2ebdf]">her Mish</strong>, designed and
        crowned by the most beautiful princess -
        <strong className="text-[#f2ebdf]">Riv</strong> 👑
      </Typography>
    </footer>
  );
};

export default Footer;
