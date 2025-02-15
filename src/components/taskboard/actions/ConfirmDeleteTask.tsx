import { Typography, Box } from "@mui/material";
import CustomModal from "../../shared/CustomModal";
import { TaskItems } from "../../../types/types";

interface ConfirmDeleteModalProps {
    taskItem: TaskItems;
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ taskItem, open, onClose, onConfirm }) => {
    return (
        <CustomModal open={open}
            onClose={onClose}
            title="Confirm Action"
            primaryButtonText="Confirm"
            onPrimaryClick={onConfirm}>
            <Box sx={{ p: 3, textAlign: "left" }}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    Are you sure you want to delete the task: <strong>{taskItem.title}</strong>?
                </Typography>
            </Box>
        </CustomModal>
    );
};

export default ConfirmDeleteModal;
