import React from "react";
import { Box } from "@mui/material";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../../../utils/constants";
import { TaskItems } from "../../../../types/types";

type DropZoneProps = {
  rowId: string;
  moveTask: (fromPath: string, toRowId: string, taskIndex: number) => void;
  children: React.ReactNode;
};

const ListPanalWrapper: React.FC<DropZoneProps> = ({
  rowId,
  moveTask,
  children,
}) => {
  const [, dropRef] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item: { task: TaskItems; index: number; path: string }) => {
      moveTask(item.path, rowId, item.index);
    },
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
        minHeight: "45px",
        background: "#F1F1F1",
        padding: "8px",
      }}
    >
      {children}
    </Box>
  );
};

export default ListPanalWrapper;
