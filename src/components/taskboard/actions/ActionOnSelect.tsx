import React, { useState } from 'react';
import { Box, Snackbar, Button, Menu, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteTasks, updateTaskStatus } from '../../../services/db';
import { setRefetch } from '../../../states/store/slice';
import { TaskItems } from '../../../types/types';

interface ActionOnSelectProps {
    selectedTasks: TaskItems[];
}

const ActionOnSelect: React.FC<ActionOnSelectProps> = ({ selectedTasks }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const dispatch = useDispatch();

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleStatusUpdate = async (status: string) => {
        await updateTaskStatus(selectedTasks, status.toLowerCase() as "todo" | "inporgress" | "completed");
        dispatch(setRefetch(true));
        handleCloseMenu();
    };

    const handleDelete = async () => {
        const ids = selectedTasks.map((task: TaskItems) => task.id);
        if (ids.length > 0) {
            await deleteTasks(ids as string[]);
            dispatch(setRefetch(true));
        }
    };

    return (
        <Snackbar
            open={selectedTasks.length > 0}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            message={`${selectedTasks.length} Tasks Selected`}
            action={
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        onClick={handleOpenMenu}
                        sx={{ backgroundColor: '#333' }}
                    >
                        Status
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                    >
                        {['TODO', 'INPROGRESS', 'COMPLETED'].map((status) => (
                            <MenuItem key={status} onClick={() => handleStatusUpdate(status)}>
                                {status}
                            </MenuItem>
                        ))}
                    </Menu>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </Box>
            }
        />
    );
};

export default ActionOnSelect;
