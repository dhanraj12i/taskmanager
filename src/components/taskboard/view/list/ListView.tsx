import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button, Typography, Divider, Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { RowItem, TaskBoardData, TaskItems } from "../../../../types/types";
import ListPanalWrapper from "./ListPanalWrapper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ListItem from "./ListItem";
import ActionOnSelect from '../../actions/ActionOnSelect';
import { editTask } from "../../../../services/db";

type ListViewProps = {
  listData: TaskBoardData;
  isBoardView?: boolean
};

const ListView: React.FC<ListViewProps> = ({ listData, isBoardView = false }) => {
  const [selectedTasks, setSelectedTasks] = useState<TaskItems[]>([]);
  const [panalItems, setPanalItems] = useState<TaskBoardData>(listData);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    panalItems?.reduce((acc, row) => ({ ...acc, [row.title]: true }), {})
  );

  useEffect(() => {
    if (listData.length > 0) {
      setPanalItems(listData);
      console.log("[ListView] Updated panel items from listData:", listData);
    }
  }, [listData]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
    console.log(`[ListView] Toggled section: ${section}`, expandedSections);
  };

  const moveTask = async (fromPath: string, toRowId: string) => {
    console.log(`[ListView - DragDrop] Moving task from ${fromPath} to row ${toRowId}`);

    const [fromRowIndex, fromTaskIndex] = fromPath.split("-").map((value) => parseInt(value));
    const fromRow = panalItems[fromRowIndex];
    const toRow = panalItems.find((row) => row.id === toRowId);

    console.log("[ListView - DragDrop] task while toRow:", toRow);
    console.log("[ListView - DragDrop] fromRowIndex fromTaskIndex", { fromRowIndex, fromTaskIndex });

    if (!fromRow || !toRow) {
      console.warn(`[ListView - DragDrop] Invalid move operation: fromRow or toRow not found`);
      return;
    }

    const task = fromRow.tasks[fromTaskIndex];

    if (task?.id) {
      console.log("[ListView - DragDrop] task while move:", task);

      const prevData = [...panalItems];

      const updatedFromRow: RowItem = {
        ...fromRow,
        tasks: fromRow.tasks.filter((_, idx) => idx !== fromTaskIndex),
      };

      const updatedToRow: RowItem = {
        ...toRow,
        tasks: [...toRow.tasks, { ...task, status: toRow.id }],
      };

      const updatedData = panalItems.map((row) => {
        if (row.id === fromRow.id) return updatedFromRow;
        if (row.id === toRow.id) return updatedToRow;
        return row;
      });

      console.log("[ListView - DragDrop] Updated panel items after move:", updatedData);
      setPanalItems(updatedData);

      try {
        await editTask(task.id, { ...task, status: toRow.id });
      } catch (error) {
        console.error("[ListView - DragDrop] API call failed, reverting dragged Item position:", error);
        setPanalItems(prevData);
      }
    }
  };


  useEffect(() => {
    console.log("[ListView] BoardView mode:", isBoardView);
    console.log("[ListView] Selected tasks updated:", selectedTasks);
  }, [isBoardView, selectedTasks]);

  const handleCheckBox = (task: TaskItems) => {
    setSelectedTasks((prevSelected) => {
      const isSelected = prevSelected.some((t) => t.id === task.id);
      const updatedSelection = isSelected
        ? prevSelected.filter((t) => t.id !== task.id)
        : [...prevSelected, task];

      console.log(`[ListView - Checkbox] ${isSelected ? "Deselected" : "Selected"} task:`, task);
      console.log("[ListView - Checkbox] Updated selected tasks:", updatedSelection);
      return updatedSelection;
    });
  };


  return (
    <>
      {listData?.length > 0 && (
        <DndProvider backend={HTML5Backend}>
          <Box
            id={"mainBox"}
            sx={{
              marginTop: "16px",
              boxShadow: "none",
              border: "none",
              display: "flex",
              flexDirection: isBoardView ? 'row' : "column",
            }}
            gap={4}
          >
            {panalItems?.map((row, rowIndex) => (
              <Box
                key={`${row.id}-${rowIndex +
                  row.tasks[rowIndex]?.title +
                  row.tasks[rowIndex]?.id || "test"
                  }`}
                sx={{ width: isBoardView ? '350px' : '100%' }}
                id={"mainBox-card1"}
              >
                <Accordion
                  key={row.title}
                  expanded={expandedSections[row.title]}
                  onChange={() => toggleSection(row.title)}
                  style={{
                    backgroundColor: row.bgColor,
                    borderBottom: "0",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<KeyboardArrowDownIcon />}
                    aria-controls={`panel${rowIndex}-content`}
                    id={`panel${rowIndex}-header`}
                    sx={{
                      height: "45px",
                      "&.MuiAccordionSummary-gutters": { maxHeight: "45px" },
                    }}
                  >
                    <Typography variant="h6">
                      {row.title} {` (${row.tasks.length})`}
                    </Typography>
                  </AccordionSummary>
                  <ListPanalWrapper
                    rowId={row.id}
                    moveTask={moveTask}
                    key={`${row.id}-${rowIndex + row.tasks[rowIndex]?.title || "test"
                      }`}
                  >
                    <AccordionDetails sx={{ padding: "0", minHeight: "200px" }}>
                      {row.tasks?.length === 0 ? (
                        <>
                          <Typography
                            sx={{
                              textAlign: "center",
                              color: "gray",
                              py: 1,
                              verticalAlign: "center",
                            }}
                          >
                            No Task in {row.title}
                          </Typography>
                          {row.title === "ToDo" && (
                            <Button
                              variant="outlined"
                              // onClick={() => addTask(row.id)}
                              fullWidth
                            >
                              Add Task
                            </Button>
                          )}
                        </>
                      ) : (
                        row.tasks?.map((task, taskIndex) => (
                          <React.Fragment key={`${rowIndex}-${taskIndex}`}>
                            <ListItem
                              task={task}
                              isBoardView={isBoardView}
                              index={taskIndex}
                              selectedTasks={selectedTasks}
                              handleCheckBox={handleCheckBox}
                              path={`${rowIndex}-${taskIndex}`}
                            />
                            {taskIndex !== row.tasks.length - 1 && <Divider />}
                          </React.Fragment>
                        ))
                      )}

                      {/* <Divider /> */}
                    </AccordionDetails>
                  </ListPanalWrapper>
                </Accordion>
              </Box>
            ))}
          </Box>
          {selectedTasks.length > 0 && <ActionOnSelect selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} />}
        </DndProvider>
      )}
    </>
  );
};

export default ListView;
