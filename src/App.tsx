import "./App.css";
import { SnackbarProvider } from "notistack";
import Pages from "./components/Pages";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Pages />
    </SnackbarProvider>
  );
}

export default App;
