import { Container, Typography, Button, Box } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { singIn } from "../services/auth";
import { useAuth } from "../states/context/useAuth";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
import TaskBoardLogo from "./shared/TaskBoardLogo";

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const createSession = async () => {
    const data = await singIn();
    setUser(data ?? {});
    if (data) {
      navigate("/dashboard");
    }
    console.log(data, "data after login");
  };

  // useEffect(() => {}, [user, navigate]);

  return (
    <Container
      maxWidth={"xl"}
      sx={{
        width: "100vw",
        display: "flex",
        justifyContent: "flex-start",
        backgroundColor: "#FFF9F9",
        height: "100vh",
        p: 0,
      }}
    >
      <Box
        sx={{
          p: 4,
          mt: 8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <TaskBoardLogo />
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ textAlign: "justify", mt: "8px", width: "360px" }}
        >
          Streamline your workflow and track progress effortlessly with our
          all-in-one task management app.
        </Typography>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={createSession}
            sx={{
              textTransform: "none",
              backgroundColor: " black",
              borderRadius: "20px", // Adjust the value for desired roundness
              padding: "20px 20px",
              width: "420px",
            }}
          >
            Continue with Google
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
