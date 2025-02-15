import React from "react";
import { Modal, Box, Typography, Button, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  width?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const CustomModal: React.FC<ModalProps> = ({
  open,
  width,
  onClose,
  title,
  children,
  primaryButtonText = "Save",
  secondaryButtonText = "Cancel",
  onPrimaryClick,
  onSecondaryClick,
}) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title" sx={{ maxWidth: '600px' }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "60%", sm: width ?? "400px" },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="modal-title" variant="h6">
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box mt={2} sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>{children}</Box>
        <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
          <Button variant="outlined" onClick={onSecondaryClick || onClose} sx={{
            width: "152px",
            height: "42px",
            borderRadius: "25px",
            background: "#ffffff",
            color: "black",
          }}>
            {secondaryButtonText}
          </Button>
          <Button variant="contained" color="primary" sx={{
            width: "152px",
            height: "42px",
            borderRadius: "25px",
            background: "#7B1984",
            color: "white",
          }}
            onClick={onPrimaryClick}>
            {primaryButtonText}
          </Button>
        </Box>
      </Box>
    </Modal >
  );
};

export default CustomModal;
