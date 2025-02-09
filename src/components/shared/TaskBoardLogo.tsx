import { Box, Typography } from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

const TaskBoardLogo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        gap: "10px",
        color: "#7B1984",
        fontWeight: "500",
      }}
    >
      <AssignmentOutlinedIcon sx={{ alignSelf: "center" }} />
      <Typography variant="h5" component="h1">
        TaskBuddy
      </Typography>
    </Box>
  );
};

export default TaskBoardLogo;
