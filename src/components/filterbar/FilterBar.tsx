import { Box, Divider } from "@mui/material";
import FilterOnLabel from "./FilterOnLabel";
import FilterSearch from "./FilterSearch";

const FilterBar = () => {
  return (
    <Box sx={{ pt: 1 }}>
      <Box
        sx={{
          pt: 0.5,
          flexDirection: { xs: "column-reverse", sm: "row" },
        }}
        display={"flex"}
        justifyContent={"space-between"}
        gap={2}
      >
        <FilterOnLabel />
        <FilterSearch />
      </Box>
      <Divider sx={{ mt: 4 }} />
    </Box>
  );
};

export default FilterBar;
