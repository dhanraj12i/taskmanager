import { styled, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import { useDispatch, useSelector } from "react-redux";
import { setViewType } from "../states/store/slice";
import { getViewType } from "../states/store/selectors";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  "& .MuiToggleButtonGroup-grouped": {
    border: "none",
    borderRadius: 0,
    padding: "8px 16px",
    "&.Mui-selected": {
      backgroundColor: "transparent",
      borderBottom: "2px solid black",
    },
  },
});

const ViewSelection = () => {
  const dispatch = useDispatch();
  const isListView = useSelector(getViewType);

  const handleViewChange = (
    _event: React.MouseEvent<HTMLElement>,
    newView: boolean
  ) => {
    if (newView !== null) dispatch(setViewType(newView));
  };

  return (
    <StyledToggleButtonGroup
      value={isListView}
      exclusive
      onChange={handleViewChange}
      aria-label="View Type"
      sx={{ gap: 2 }}
    >
      <ToggleButton value={true} aria-label="List View">
        <ListOutlinedIcon />
        List
      </ToggleButton>
      <ToggleButton value={false} aria-label="Board View" disabled={false}>
        <BarChartRoundedIcon />
        Board
      </ToggleButton>
    </StyledToggleButtonGroup>
  );
};

export default ViewSelection;
