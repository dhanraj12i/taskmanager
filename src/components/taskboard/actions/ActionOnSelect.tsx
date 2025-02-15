import React, { useState } from 'react';
import { Box, Snackbar, Button, Menu, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteTasks, updateTaskStatus } from '../../../services/db';
import { setRefetch } from '../../../states/store/slice';
import { TaskItems } from '../../../types/types';

interface ActionOnSelectProps {
    selectedTasks: TaskItems[];
    setSelectedTasks: React.Dispatch<React.SetStateAction<TaskItems[]>>
}

const ActionOnSelect: React.FC<ActionOnSelectProps> = ({ selectedTasks, setSelectedTasks }) => {
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
        setSelectedTasks([])
        dispatch(setRefetch(true));
        handleCloseMenu();
    };

    const handleDelete = async () => {
        const ids = selectedTasks.map((task: TaskItems) => task.id);
        if (ids.length > 0) {
            alert('delete api before line')
            await deleteTasks(ids as string[]);
            setSelectedTasks([])
            dispatch(setRefetch(true));
        };
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
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                        transformOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        sx={{
                            mt: -1,
                            "& .MuiPaper-root": {
                                borderRadius: "8px",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                                backgroundColor: "#ffffff",
                                minWidth: "120px",
                            },
                        }}
                    >
                        {["TODO", "INPROGRESS", "COMPLETED"].map((status) => (
                            <MenuItem
                                key={status}
                                onClick={() => handleStatusUpdate(status)}
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "#f0f0f0",
                                    },
                                }}
                            >
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
