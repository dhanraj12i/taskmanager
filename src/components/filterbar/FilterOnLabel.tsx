import React, { useMemo } from "react";
import CustomSelect from "../shared/CustomSelect";
import {
  Box,
  styled,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface FiltersProps {
  selectedCategory?: string;
  selectedDueDate?: string;
  onCategoryChange?: (category: string) => void;
  onDueDateChange?: (dueDate: string) => void;
  categories?: string[];
}

const RoundedTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "25px",
    "& input": {
      padding: "10px 14px 10px 0",
    },
  },
}));

const FilterOnLabel: React.FC<FiltersProps> = React.memo(
  ({
    // selectedCategory,
    // selectedDueDate,
    // onCategoryChange,
    // onDueDateChange,
    categories = ["Work", "Personal"],
  }) => {
    const categoryOptions = useMemo(
      () =>
        categories?.map((category) => ({
          value: category,
          label: category,
        })),
      [categories]
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value);
    };

    const dueDateOptions = useMemo(
      () => [
        { value: "today", label: "Today" },
        { value: "this-week", label: "This Week" },
        { value: "this-month", label: "This Month" },
      ],
      []
    );

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
            <Typography
              sx={{
                // alignSelf: "center",
                color: "#000000",
                // verticalAlign: "center",
              }}
            >
              Filter By:
            </Typography>
          </Box>
          <Box display={"flex"} sx={{ gap: { xs: 2 } }}>
            <CustomSelect
              label="Category"
              value={""}
              onChange={() => {}}
              options={categoryOptions}
            />
            <CustomSelect
              label="Due Date"
              value={""}
              onChange={() => {}}
              options={dueDateOptions}
            />
          </Box>
        </Box>

        <RoundedTextField
          sx={{ width: { xs: "100%", md: "unset" } }}
          variant="outlined"
          placeholder={"Search"}
          value={""}
          onChange={handleChange}
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
  }
);

export default FilterOnLabel;
