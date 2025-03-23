import "./App.css";
import Pages from "./components/Pages";
import { NotificationProvider } from "./states/notification/NotificationProvider";

function App() {
  return (
    <NotificationProvider>
      <Pages />
    </NotificationProvider>
  );
}

export default App;
