import { Box, Button, InputAdornment, styled, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const RoundedTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "25px",
    "& input": {
      padding: "10px 14px 10px 0",
    },
  },
}));

const FilterSearch = () => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };
  return (
    <Box
      display={"flex"}
      gap={2.5}
      sx={{
        flexDirection: {
          sm: "column-reverse",
          xs: "column-reverse",
          md: "row",
        },
        alignItems: { sm: "flex-end", xs: "flex-end", md: "row" },
      }}
    >
      <RoundedTextField
        fullWidth
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
      <Box>
        <Button
          size="large"
          variant="contained"
          sx={{
            width: "152px",
            height: "42px",
            borderRadius: "25px",
            background: "#7B1984",
            color: "white",
          }}
          onClick={() => {
            alert("Add Task");
          }}
        >
          ADD TASK
        </Button>
      </Box>
    </Box>
  );
};

export default FilterSearch;
