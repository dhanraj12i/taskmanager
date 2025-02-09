import { styled, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    border: "none", // Remove default border
    borderRadius: "0", // Remove border radius
    padding: "8px 16px", // Add padding
    "&.Mui-selected": {
      backgroundColor: "transparent", // Remove background color for selected state
      borderBottom: `2px solid ${theme.palette.primary.main}`, // Add line below selected option
    },
    "&:not(:first-of-type)": {
      marginLeft: "0", // Remove margin between buttons
    },
  },
}));

const ViewSelection = () => {
  const [view, setView] = useState<"list" | "board">("list");
  const handleViewChange = (
    _event: React.MouseEvent<HTMLElement>,
    newView: "list" | "board"
  ) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  return (
    <StyledToggleButtonGroup
      value={view}
      exclusive
      onChange={handleViewChange}
      aria-label="view type"
    >
      <ToggleButton value="list" aria-label="list view">
        <ListOutlinedIcon />
        List
      </ToggleButton>
      <ToggleButton value="board" aria-label="board view">
        <BarChartRoundedIcon />
        Board
      </ToggleButton>
    </StyledToggleButtonGroup>
  );
};

export default ViewSelection;
