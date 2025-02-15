import { Box } from "@mui/material";
import Header from "./Header";
import FilterBar from "./filterbar/FilterBar";
import Layout from "./taskboard/view/Layout";

const Dashboard = () => {
  return (
    <Box sx={{ padding: "0" }}>
      <Box
        sx={{
          padding: { sm: "0 14px", xs: "0 14px", md: "0 32px" },
          mt: { md: "54px", xs: "0px" },
          backgroundColor: { xs: "#FAEEFC", md: "unset" },
        }}
      >
        <Header />
      </Box>
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
