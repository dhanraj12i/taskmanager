import { Box, Button, Typography, Menu, MenuItem } from "@mui/material";
import TaskBoardLogo from "./shared/TaskBoardLogo";
import { removeSession } from "../services/auth";
import { useAuth } from "../states/context/useAuth";
import ViewSelection from "./ViewSelection";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";

const Header = () => {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await removeSession();
    handleClose();
  };

  return (
    <Box
      sx={{
        alignSelf: "center",
        display: { xs: "block" },
        margin: "auto",
        height: { sm: "54px", xs: "54px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: 'center',
          mb: 0.5,
          pt: { xs: 1, md: 0 }
        }}
      >
        <TaskBoardLogo />
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            component="img"
            sx={{
              height: "36px",
              width: "36px",
              borderRadius: "18px",
              cursor: "pointer",
            }}
            alt="Profile-Picture"
            src={`${user.photoURL}`}
            onClick={handleClick}
          />
          <Typography sx={{ display: { xs: "none", sm: "flex" } }}>
            {" "}
            {`${user.displayName}`.split(" ")[0]}
          </Typography>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={open}
          sx={{
            display: { xs: "flex", md: "none" },
            borderRadius: "12px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
          onClose={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            onClick={handleLogout}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 16px",
              minHeight: "36px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <LogoutIcon
              fontSize="small"
              sx={{
                mr: 1,
                color: "#7B1984",
                borderRadius: "50%",
                padding: "4px",
                backgroundColor: "#f5f5f5",
              }}
            />
            Logout
          </MenuItem>
        </Menu>

      </Box>
      <Box
        sx={{
          display: { sm: "none", xs: "none", md: "flex" },
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
            <Box sx={{ transform: "scaleX(-1)" }}>
              <LogoutIcon />
            </Box>
          }
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
