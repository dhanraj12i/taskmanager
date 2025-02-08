import "./App.css";
import { SnackbarProvider } from "notistack";
import Pages from "./components/Pages";
import { AuthProvider } from "./states/context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <SnackbarProvider maxSnack={3}>
        <Pages />
      </SnackbarProvider>
    </AuthProvider>
  );
}

export default App;
