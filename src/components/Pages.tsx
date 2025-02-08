import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login";
import { Container, Box } from "@mui/material";
import Dashboard from "./Dashboard";
import ProtectedRoute from "../hooks/PotectedRoute";
import { AuthProvider } from "../states/context/AuthContext";

const Pages = () => {
  return (
    <BrowserRouter>
      <Container
        maxWidth="lg"
        sx={{
          m: 0,
          padding: "0 !important",
          boxSizing: "border-box",
          width: { xl: 1560 },
        }}
      >
        <Box sx={{}}>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </AuthProvider>
        </Box>
      </Container>
    </BrowserRouter>
  );
};

export default Pages;
