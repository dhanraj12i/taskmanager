import { Box, Button } from "@mui/material";
import { useState } from "react";
import CreateTaskItem from "../modal-view/CreateTaskItem";

const FilterSearch = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(!open);
  };
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
      {open && <CreateTaskItem open={open} onClose={handleClose} />}
    </Box>
  );
};

export default FilterSearch;
