import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ApplicationsPage from "./routes/ApplicationPage";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";

const router = createBrowserRouter([
  { path: "/", element: <ApplicationsPage /> },
]);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Job Tracker</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <RouterProvider router={router} />
      </Container>
    </ThemeProvider>
  );
}
