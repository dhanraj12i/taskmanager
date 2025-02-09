import { Box } from "@mui/material";
import Header from "./Header";
import FilterBar from "./filterbar/FilterBar";

const Dashboard = () => {
  return (
    <Box
      sx={{ padding: "36px 32px" }}
      display={"flex"}
      flexDirection={"column"}
    >
      <Box>
        <Header />
        <FilterBar />
      </Box>
    </Box>
  );
};

export default Dashboard;
