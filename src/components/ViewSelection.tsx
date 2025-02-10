import { styled, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
  "& .MuiToggleButtonGroup-grouped": {
    border: "none",
    borderRadius: "0",
    padding: "8px 16px",
    "&.Mui-selected": {
      backgroundColor: "transparent",
      borderBottom: `2px solid black`,
    },
    "&:not(:first-of-type)": {
      marginLeft: "0",
    },
    "&.MuiButtonBase-root": {
      padding: "0",
      textTransform: "none",
    },
  },
}));

const styles = {
  gap: {
    gap: "6px",
  },
};

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
      sx={{ gap: "20px" }}
    >
      <ToggleButton value="list" aria-label="list view" sx={styles.gap}>
        <ListOutlinedIcon />
        List
      </ToggleButton>
      <ToggleButton value="board" aria-label="board view" sx={styles.gap}>
        <BarChartRoundedIcon />
        Board
      </ToggleButton>
    </StyledToggleButtonGroup>
  );
};

export default ViewSelection;
