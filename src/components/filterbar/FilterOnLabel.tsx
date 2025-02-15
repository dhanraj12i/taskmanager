import React, { useMemo, useState, useCallback } from "react";
import CustomSelect from "../shared/CustomSelect";
import {
  Box,
  styled,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, setSearchText } from "../../states/store/slice";
import { getFilters } from "../../states/store/selectors";

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
  const filters = useSelector(getFilters);

  // Local state to manage UI before dispatching to Redux
  const [localFilters, setLocalFilters] = useState({
    category: filters.category || "All",
    dueDate: filters.dueDate || "All",
    searchText: "",
  });

  const categoryOptions = useMemo(() => [
    { value: "All", label: "All" },
    { value: "Work", label: "Work" },
    { value: "Personal", label: "Personal" },
  ], []);

  const dueDateOptions = useMemo(() => [
    { value: "All", label: "All" },
    { value: "today", label: "Today" },
    { value: "this-week", label: "This Week" },
    { value: "this-month", label: "This Month" },
  ], []);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalFilters((prev) => ({ ...prev, searchText: value }));
    dispatch(setSearchText(value));
  }, [dispatch]);

  const handleFilterChange = useCallback((key: "category" | "dueDate", value: string) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
    dispatch(setFilters({ [key]: value }));
  }, [dispatch]);

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
