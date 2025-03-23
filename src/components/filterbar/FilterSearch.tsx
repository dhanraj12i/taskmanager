import { Box, Button } from "@mui/material";
import { useState } from "react";
import { createTask } from "../../services/db";
import { TaskItems } from "../../types/types";
import { useDispatch } from "react-redux";
import { setRefetch } from "../../states/store/slice";
import TaskItemModal from "../modal-view/CreateTaskItem";
import { snackbarMessages } from "../../utils/notification";
import { showSnackbar } from "../../states/notification/NotificationProvider";
import { useQueryClient } from "@tanstack/react-query";

const FilterSearch = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const queryClient = useQueryClient()

  const { variant, msg } = snackbarMessages.success.add;

  const handleClose = () => {
    setOpen(!open);
  };

  const onCreated = (payload: TaskItems) => {
    createTask(payload).then(() => {
      dispatch(setRefetch(true));
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      handleClose();
      showSnackbar(msg("Task", { detail: "Please Update Progress Accordingly" }), variant);
    })
  }

  return (
    <Box display={"flex"} gap={2.5} sx={{ justifyContent: "flex-end" }}>
      <Box>
        <Button
          size="large"
          variant="contained"
          sx={{
            width: "152px",
            height: "42px",
            borderRadius: "25px",
            background: "#7B1984",
            color: "white",
          }}
          onClick={handleClose}
        >
          ADD TASK
        </Button>
      </Box>
      {open && <TaskItemModal open={open} onClose={handleClose} onSave={onCreated} />}
    </Box>
  );
};

export default FilterSearch;
