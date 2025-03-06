import React from "react";
import { Modal, Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  outline: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function Loader() {
  const loader = useSelector((state) => state?.loader);
  const { showLoader } = loader;

  return (
    <Modal open={showLoader}>
      <Box sx={style}>
        <CircularProgress size={50} />
      </Box>
    </Modal>
  );
}
