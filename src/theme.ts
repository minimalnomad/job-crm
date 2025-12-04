import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#333333",
    },
  },

  typography: {
    fontFamily: `"Kanit", "Pretendard", sans-serif`,
    h5: { fontWeight: 700 },
    subtitle1: { fontWeight: 600 },
    body1: { fontSize: 15 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "6px 18px",
          textTransform: "none",
          fontWeight: 600,
          backgroundColor: "#000",
          color: "#fff",
          ":hover": {
            backgroundColor: "#222",
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #000",
          borderRadius: 10,
          boxShadow: "none",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: "#000",
          },
          "&:hover fieldset": {
            borderColor: "#000",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#000",
          },
        },
      },
    },
  },
});
