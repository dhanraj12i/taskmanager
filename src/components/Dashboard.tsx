import { Box } from "@mui/material";
import Header from "./Header";
import FilterBar from "./filterbar/FilterBar";
import Layout from "./taskboard/view/Layout";

const Dashboard = () => {
  return (
    <Box>
      <Header />
      <Box
        sx={{
          padding: { xs: "18px 14px", sm: "36px 32px" },
        }}
        display={"flex"}
        flexDirection={"column"}
      >
        <FilterBar />
        <Layout />
      </Box>
    </Box>
  );
};

export default Dashboard;
