import React from "react";
import {
  // ConnectableElement,
  // ConnectDragPreview,
  // ConnectDragSource,
  useDrag,
} from "react-dnd";
import { ItemTypes } from "../../../../utils/constants";
import {
  Card,
  Checkbox,
  IconButton,
  Typography,
  Chip,
  Box,
  Stack,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { TaskItems } from "../../../../types/types";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { formatDate } from "../../../../utils/utils";

type ListItemProps = {
  task: TaskItems;
  index: number;
  path: string;
};

const ListItem: React.FC<ListItemProps> = ({ task, index, path }) => {
  console.log(task, index, path, " drag zone", task.title);
  const [{ isDragging }, dragRef] = useDrag({
    type: ItemTypes.TASK,
    item: { task, index, path },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Box ref={dragRef as unknown as React.Ref<unknown>}>
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          background: "#F1F1F1",
          p: 1,
          gap: "65px",
          margin: "4px 0",
          border: isDragging ? "none" : "1px",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", flexShrink: 0, gap: 2 }}
        >
          <Stack
            direction="row"
            alignItems="center"
            sx={{ flexGrow: 1, gap: 1 }}
          >
            <Checkbox
              sx={{
                [`&.Mui-checked`]: {
                  color: "#7B1984",
                },
                fontSize: 15,
                height: 15,
                width: 15,
              }}
            />
            <DragIndicatorIcon
              fontSize="small"
              sx={{
                cursor: "move",
                display: { xs: "none", sm: "flex" },
              }}
            />
            <CheckCircleRoundedIcon
              sx={{
                fontSize: 20,
                color: "gray",
              }}
            />
          </Stack>

          <Typography
            variant="subtitle1"
            sx={{
              width: "350px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              flexShrink: 0,
            }}
          >
            {task.title}
          </Typography>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center",
            gap: 1,
            paddingX: { xs: 1, sm: 2 },
            display: { xs: "none", sm: "flex" },
          }}
        >
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ width: "150px" }}
          >
            {`${formatDate(task.duedate as Date)}`}
          </Typography>

          <Chip
            label={task.status.toLocaleUpperCase()}
            variant="filled"
            sx={{
              fontWeight: "bold",
              backgroundColor: "#DDDADD",
              fontSize: { xs: "10px", sm: "12px" },
              borderRadius: "4px",
            }}
          />

          <Typography
            variant="body2"
            noWrap
            sx={{
              width: "100px",
              textAlign: "left",
              textTransform: "capitalize",
            }}
          >
            {task.category}
          </Typography>

          <IconButton size="small">
            <MoreHorizIcon />
          </IconButton>
        </Box>
      </Card>
    </Box>
  );
};

export default ListItem;
