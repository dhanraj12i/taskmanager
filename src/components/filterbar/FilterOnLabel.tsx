import React, { useMemo } from "react";
import CustomSelect from "../shared/CustomSelect";
import { Box, Typography } from "@mui/material";

interface FiltersProps {
  selectedCategory?: string;
  selectedDueDate?: string;
  onCategoryChange?: (category: string) => void;
  onDueDateChange?: (dueDate: string) => void;
  categories?: string[];
}

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

    const dueDateOptions = useMemo(
      () => [
        { value: "today", label: "Today" },
        { value: "this-week", label: "This Week" },
        { value: "this-month", label: "This Month" },
      ],
      []
    );

    return (
      <Box sx={{}} display={"flex"} gap={1}>
        <Typography sx={{ alignSelf: "center", color: "#000000" }}>
          Filter By:
        </Typography>
        <Box display={"flex"} gap={2}>
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
    );
  }
);

export default FilterOnLabel;
