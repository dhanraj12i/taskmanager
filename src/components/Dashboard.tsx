import { Button } from "@mui/material";
import { removeSession } from "../services/auth";

const Dashboard = () => {
  const handleLogout = async () => {
    await removeSession(); // Call the removeSession function
  };
  return (
    <div>
      <Button onClick={handleLogout}>sign out</Button>
    </div>
  );
};

export default Dashboard;
