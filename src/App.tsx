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
      <AppBar
        position="static"
        sx={{
          p: 1,
          mb: 2,
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.text.secondary,
        }}
      >
        <Toolbar>
          <Typography variant="h5">JOB TRACKER</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <RouterProvider router={router} />
      </Container>
    </ThemeProvider>
  );
}
