import React, { useState } from "react";
import {
  ConnectDragPreview,
  ConnectDragSource,
  ConnectDropTarget,
  DndProvider,
  useDrag,
  useDrop,
} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Box, Button, Typography, Paper } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { fetchTasks } from "../../services/db";

const ItemTypes = {
  TASK: "task",
};

type Task = {
  id: string;
  text: string;
};

type Row = {
  id: string;
  title: string;
  tasks: Task[];
};

const initialData: Row[] = [
  { id: "todo", title: "To Do", tasks: [] },
  { id: "inprogress", title: "In Progress", tasks: [] },
  { id: "completed", title: "Completed", tasks: [] },
];

console.log("fetchData---->  ", await fetchTasks().then((res) => res));
type TaskProps = {
  task: Task;
  index: number;
  path: string;
  moveTask?: (fromPath: string, toRowId: string, taskIndex: number) => void;
};

type DropZoneProps = {
  rowId: string;
  moveTask: (fromPath: string, toRowId: string, taskIndex: number) => void;
  children: React.ReactNode;
};

const Task: React.FC<TaskProps> = ({ task, index, path }) => {
  const [, dragRef]: [
    { isDragging: boolean },
    ConnectDragSource,
    ConnectDragPreview
  ] = useDrag({
    type: ItemTypes.TASK,
    item: { task, index, path },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const combinedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        dragRef(node);
      }
    },
    [dragRef]
  );

  return (
    <Box
      ref={combinedRef as unknown as React.Ref<unknown>}
      sx={{
        padding: "8px",
        margin: "4px 0",
        // backgroundColor: isDragging ? "lightgray" : "white",
        boxShadow: 1,
        cursor: "move",
        borderRadius: "4px",
      }}
    >
      {task.text}
    </Box>
  );
};

const DropZone: React.FC<DropZoneProps> = ({ rowId, moveTask, children }) => {
  const [, dropRef]: [unknown, ConnectDropTarget] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item: { task: Task; index: number; path: string }) =>
      moveTask(item.path, rowId, item.index),
  });

  const combinedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        dropRef(node);
      }
    },
    [dropRef]
  );

  return (
    <Box
      ref={combinedRef}
      sx={{
        minHeight: "100px",
        padding: "8px",
        border: "1px solid lightgray",
        borderRadius: "8px",
      }}
    >
      {children}
    </Box>
  );
};

const DragDropTable: React.FC = () => {
  const [data, setData] = useState<Row[]>(initialData);

  const moveTask = (fromPath: string, toRowId: string) => {
    const [fromRowIndex, fromTaskIndex] = fromPath
      .split("-")
      .map((value) => parseInt(value));
    const fromRow = data[fromRowIndex];
    const toRow = data.find((row) => row.id === toRowId);

    if (!fromRow || !toRow) return;

    const task = fromRow.tasks[fromTaskIndex];

    const updatedFromRow: Row = {
      ...fromRow,
      tasks: fromRow.tasks.filter((_, idx) => idx !== fromTaskIndex),
    };

    const updatedToRow: Row = {
      ...toRow,
      tasks: [...toRow.tasks, task],
    };

    const updatedData = data.map((row) => {
      if (row.id === fromRow.id) return updatedFromRow;
      if (row.id === toRow.id) return updatedToRow;
      return row;
    });

    setData(updatedData);
  };

  const addTask = (rowId: string) => {
    const newTaskText = prompt("Enter task name:", "New Task");
    if (newTaskText) {
      const newTask: Task = {
        id: `${rowId}-${Date.now()}`,
        text: newTaskText,
      };

      setData((prevData) =>
        prevData.map((row) =>
          row.id === rowId ? { ...row, tasks: [...row.tasks, newTask] } : row
        )
      );
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Paper elevation={3} sx={{ padding: "16px", marginTop: "16px" }}>
        {data.map((row, rowIndex) => (
          <DropZone rowId={row.id} moveTask={moveTask} key={`${row.id}`}>
            <Accordion key={row.id}>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls={`panel${rowIndex}-content`}
                id={`panel${rowIndex}-header`}
              >
                <Typography variant="h6">
                  {row.title} {` (${row.tasks.length})`}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {row.tasks.length === 0 && row.title === "To Do" ? ( // move this part into Task.
                  <Button
                    variant="outlined"
                    onClick={() => addTask(row.id)}
                    fullWidth
                  >
                    Add Task
                  </Button>
                ) : (
                  row.tasks.map((task, taskIndex) => (
                    <Task
                      key={`${rowIndex}-${taskIndex}`}
                      task={task}
                      index={taskIndex}
                      moveTask={moveTask}
                      path={`${rowIndex}-${taskIndex}`}
                    />
                  ))
                )}
              </AccordionDetails>
            </Accordion>
          </DropZone>
        ))}
      </Paper>
    </DndProvider>
  );
};

export default DragDropTable;
