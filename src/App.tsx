import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ApplicationsPage from "./routes/ApplicationPage";

const router = createBrowserRouter([
  { path: "/", element: <ApplicationsPage /> },
]);

export default function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Montr</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <RouterProvider router={router} />
      </Container>
    </>
  );
}
