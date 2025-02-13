import React from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const CustomModal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  primaryButtonText = "Save",
  secondaryButtonText = "Cancel",
  onPrimaryClick,
  onSecondaryClick,
}) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 400 },
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

        <Box mt={2}>{children}</Box>

        <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
          <Button variant="outlined" onClick={onSecondaryClick || onClose}>
            {secondaryButtonText}
          </Button>
          <Button variant="contained" color="primary" onClick={onPrimaryClick}>
            {primaryButtonText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
