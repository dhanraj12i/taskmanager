import React, { useState } from "react";
import {
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  MenuItem,
} from "@mui/material";
import CustomModal from "../shared/CustomModal";

export interface TaskItems {
  id?: string;
  UUID: string;
  category: "work" | "personal";
  createdAt: Date;
  updated: Date;
  duedate: Date;
  desc: string;
  status: "todo" | "inprogress" | "completed";
  title: string;
}

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
    UUID: crypto.randomUUID(),
    category: "work",
    createdAt: new Date(),
    updated: new Date(),
    duedate: new Date(),
    desc: "",
    status: "todo",
    title: "",
  });

  const handleChange = (field: keyof TaskItems, value: string | Date) => {
    setTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave?.(task);
    onClose();
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
        onChange={(e) => handleChange("title", e.target.value)}
        margin="dense"
      />
      <TextField
        fullWidth
        multiline
        rows={3}
        label="Description"
        value={task.desc}
        onChange={(e) => handleChange("desc", e.target.value)}
        margin="dense"
      />

      <ToggleButtonGroup
        value={task.category}
        exclusive
        onChange={(_, value) => value && handleChange("category", value)}
        fullWidth
        sx={{ mt: 2 }}
      >
        <ToggleButton value="work">Work</ToggleButton>
        <ToggleButton value="personal">Personal</ToggleButton>
      </ToggleButtonGroup>

      <TextField
        fullWidth
        type="date"
        label="Due Date"
        InputLabelProps={{ shrink: true }}
        value={task.duedate.toISOString().split("T")[0]}
        onChange={(e) => handleChange("duedate", new Date(e.target.value))}
        margin="dense"
      />

      <TextField
        select
        fullWidth
        label="Task Status"
        value={task.status}
        onChange={(e) => handleChange("status", e.target.value)}
        margin="dense"
      >
        <MenuItem value="todo">To Do</MenuItem>
        <MenuItem value="inprogress">In Progress</MenuItem>
        <MenuItem value="completed">Completed</MenuItem>
      </TextField>
    </CustomModal>
  );
};

export default CreateTaskItem;
