import React, { useState } from "react";
import CustomSelect from "../shared/CustomSelect";
import {
  Box,
  styled,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { setFilters, setSearchText } from "../../states/store/slice";
import { useQueryClient } from "@tanstack/react-query";

const RoundedTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "25px",
    "& input": {
      padding: "10px 14px 10px 0",
    },
  },
}));

const FilterOnLabel: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [localFilters, setLocalFilters] = useState({
    category: '',
    dueDate: '',
    searchText: "",
  });

  const categoryOptions = [
    { value: "All", label: "All" },
    { value: "Work", label: "Work" },
    { value: "Personal", label: "Personal" },
  ]

  const dueDateOptions = [
    { value: "All", label: "All" },
    { value: "today", label: "Today" },
    { value: "this-week", label: "This Week" },
    { value: "this-month", label: "This Month" },
  ]

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalFilters((prev) => ({ ...prev, searchText: value }));
    dispatch(setSearchText(value));
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  }

  const handleFilterChange = (key: "category" | "dueDate", value: string) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
    dispatch(setFilters({ [key]: value }));
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  }

  return (
    <Box
      id="filter and label"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "flex-start", md: "space-between" },
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 2, md: 4 },
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: { md: "center" },
          justifyContent: { xs: "flex-start" },
          flexDirection: { xs: "column", sm: "row" },
          width: { xs: "100%" },
        }}
        gap={1}
      >
        <Box>
          <Typography sx={{ color: "#000000" }}>Filter By:</Typography>
        </Box>
        <Box display={"flex"} sx={{ gap: { xs: 2 } }}>
          <CustomSelect
            label="Category"
            value={localFilters.category}
            onChange={(value) => handleFilterChange("category", value)}
            options={categoryOptions}
          />
          <CustomSelect
            label="Due Date"
            value={localFilters.dueDate}
            onChange={(value) => handleFilterChange("dueDate", value)}
            options={dueDateOptions}
          />
        </Box>
      </Box>

      <RoundedTextField
        sx={{ width: { xs: "100%", md: "unset" } }}
        variant="outlined"
        placeholder="Search"
        value={localFilters.searchText}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
});

export default FilterOnLabel;
