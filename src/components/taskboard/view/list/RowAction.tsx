import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskItems } from '../../../../types/types';
import ConfirmDeleteModal from '../../actions/ConfirmDeleteTask';
import TaskItemModal from '../../../modal-view/CreateTaskItem';

interface TaskActionMenuProps {
    task: TaskItems;
    onEdit: (task: TaskItems) => void;
    onDelete: (taskId: string) => void;
    anchorEl: HTMLElement | null;
    open: boolean;
    handleClose: () => void;
}

const TaskActionMenu: React.FC<TaskActionMenuProps> = ({
    task,
    onEdit,
    onDelete,
    anchorEl,
    open,
    handleClose
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setEditIsOpen] = useState(false);



    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    const toggleEditModal = () => {
        setEditIsOpen(!isEditOpen)
    }

    const confirmDelete = () => {
        onDelete(task.id!);
        setIsOpen(false);
    };

    const closeDeleteModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} PaperProps={{
                elevation: 3,
                sx: { borderRadius: 2, minWidth: 150 }
            }}>
                <MenuItem onClick={toggleEditModal}>
                    <EditIcon fontSize="small" sx={{ mr: 1 }} /> Edit
                </MenuItem>
                <MenuItem onClick={toggleModal} sx={{ color: 'error.main' }}>
                    <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Delete
                </MenuItem>
            </Menu>
            {isEditOpen && <TaskItemModal open={isEditOpen} onClose={toggleEditModal} onSave={onEdit} taskData={{ ...task }} />}
            {isOpen && <ConfirmDeleteModal
                open={isOpen}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
                taskItem={task}
            />}
        </>
    );
};

export default TaskActionMenu;
