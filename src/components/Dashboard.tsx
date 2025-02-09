import { Box, Button } from "@mui/material";
import { removeSession } from "../services/auth";

const Dashboard = () => {

  const handleLogout = async () => {
    await removeSession(); // Call the removeSession function
  };

  return (
    <Box>
      <Button onClick={handleLogout}>sign out</Button>
    </Box>
  );
};

export default Dashboard;
