import React, { useState } from "react";
import {
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  MenuItem,
  Box,
} from "@mui/material";
import CustomModal from "../shared/CustomModal";
import FileUpload from "./FileUpload";
import { TaskItems } from "../../types/types";
import { getUUID } from "../../states/store/selectors";
import { useSelector } from "react-redux";
import { convertToFirebaseTimeStamp, validateForm } from "../../utils/utils";
interface CreateTaskItemProps {
  open: boolean;
  onClose: () => void;
  onSave?: (task: TaskItems) => void;
}

const CreateTaskItem: React.FC<CreateTaskItemProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [task, setTask] = useState<TaskItems>({
    UUID: useSelector(getUUID),
    category: "work",
    createdAt: convertToFirebaseTimeStamp(new Date()),
    updated: convertToFirebaseTimeStamp(new Date()),
    duedate: new Date,
    desc: "",
    status: "todo",
    title: "",
    files: [],
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});


  const handleChange = (field: keyof TaskItems, value: string | Date | string[]) => {
    if (field === "files" && Array.isArray(value)) {
      value = [...value];
    }

    setTask((prev) => ({
      ...prev,
      [field]: (typeof value === "string" || value instanceof Date) && field === "duedate"
        ? convertToFirebaseTimeStamp(value)
        : value,
    }));
  };



  const handleSubmit = () => {
    const validationErrors = validateForm(task);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave?.(task);
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title="Create Task"
      primaryButtonText="Create"
      onPrimaryClick={handleSubmit}
    >
      <TextField
        fullWidth
        label="Task Title"
        value={task.title}
        sx={{
          height: "38px",
          padding: "0",
          textAlign: "center",
          borderRadius: "12px",
        }}
        onChange={(e) => handleChange("title", e.target.value)}
        margin="dense"
        error={!!errors.title}
        helperText={errors.title}
      />
      <TextField
        fullWidth
        multiline
        rows={3}
        label="Description"
        value={task.desc}
        onChange={(e) => handleChange("desc", e.target.value)}
        margin="dense"
        error={!!errors.desc}
        helperText={errors.desc}
      />
      <Box sx={{ display: "flex", gap: "22px" }}>
        <ToggleButtonGroup
          value={task.category}
          exclusive
          onChange={(_, value) => value && handleChange("category", value)}
          sx={{
            mt: 1,
            mr: 4,
            height: "30px",
            display: "flex",
            gap: "22px",
          }}
        >
          <ToggleButton value="work" sx={{ borderRadius: "40px" }}>
            Work
          </ToggleButton>
          <ToggleButton value="personal" sx={{ borderRadius: "40px" }}>
            Personal
          </ToggleButton>
        </ToggleButtonGroup>

        <TextField
          type="date"
          label="Due Date"
          // InputLabelProps={{ shrink: true }}
          value={task.duedate}
          onChange={(e) => handleChange("duedate", e.target.value)}
          margin="dense"
          error={!!errors.duedate}
          helperText={errors.duedate}
        />

        <TextField
          select
          label="Task Status"
          value={task.status}
          onChange={(e) => handleChange("status", e.target.value)}
          margin="dense"
          error={!!errors.status}
          helperText={errors.status}
        >
          <MenuItem value="todo">To Do</MenuItem>
          <MenuItem value="inprogress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </TextField>
      </Box>
      <FileUpload setFile={handleChange} />
    </CustomModal>
  );
};

export default CreateTaskItem;
