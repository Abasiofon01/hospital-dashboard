import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider";
import AppRoutes from "./routes";

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
