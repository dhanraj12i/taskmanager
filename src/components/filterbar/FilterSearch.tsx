import { Box, Button } from "@mui/material";
import { useState } from "react";
import CreateTaskItem from "../modal-view/CreateTaskItem";
import { createTask } from "../../services/db";
import { TaskItems } from "../../types/types";
import { useDispatch } from "react-redux";
import { setRefetch } from "../../states/store/slice";

const FilterSearch = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(!open);
  };

  const onCreated = (payload: TaskItems) => {
    createTask(payload).then((res) => {
      dispatch(setRefetch(true))
      handleClose();
      console.log(res)
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
      {open && <CreateTaskItem open={open} onClose={handleClose} onSave={onCreated} />}
    </Box>
  );
};

export default FilterSearch;
