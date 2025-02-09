import { Box, Button, Typography } from "@mui/material";
import TaskBoardLogo from "./shared/TaskBoardLogo";
import { removeSession } from "../services/auth";
import { useAuth } from "../states/context/useAuth";
import ViewSelection from "./ViewSelection";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  const handleLogout = async () => {
    await removeSession(); // Call the removeSession function
  };
  const { user } = useAuth();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <TaskBoardLogo />
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Box
            component="img"
            sx={{
              height: "36px",
              width: "36px",
              borderRadius: "18px",
            }}
            alt="Profile-Picture"
            src={`${user.photoURL}`}
          />
          <Typography> {`${user.displayName}`.split(" ")[0]}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <ViewSelection />
        <Button
          variant="outlined"
          sx={{
            borderRadius: "10px",
            backgroundColor: "#ffe3e86e",
            outlineColor: "pink",
            mt: 0.5,
            color: "black",
            textTransform: "none",
            borderColor: "pink",
          }}
          onClick={handleLogout}
          startIcon={
            <Box
              sx={{
                transform: "scaleX(-1)",
                alignSelf: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <LogoutIcon />
            </Box>
          }
        >
          Logout
        </Button>
      </Box>
    </>
  );
};

export default Header;
