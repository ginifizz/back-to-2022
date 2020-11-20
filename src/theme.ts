import { createMuiTheme } from "@material-ui/core/styles";
import amber from "@material-ui/core/colors/amber";
import deepOrange from "@material-ui/core/colors/deepOrange";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 900,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: "Roboto Slab",
    fontWeightBold: 800,
    h4: {
      fontWeight: 800,
    },
    h5: {
      fontWeight: 800,
      lineHeight: 0.8,
      "@media (max-width:900px)": {
        fontSize: "1rem",
        lineHeight: 1,
      },
    },
    overline: {
      lineHeight: 1.2,
      fontWeight: 800,
      fontSize: "0.7rem",
      "@media (max-width:900px)": {
        fontSize: "0.5rem",
      },
    },
    body1: {
      fontSize: "1.5rem",
      fontWeight: 800,
      lineHeight: "1.2",
      "@media (max-width:900px)": {
        fontSize: "0.95rem",
        lineHeight: "1.1",
      },
    },
    body2: {
      fontSize: "1.1rem",
      fontWeight: 800,
      "@media (max-width:900px)": {
        fontSize: "0.75rem",
        lineHeight: "1.2",
      },
    },
  },
  shape: {
    borderRadius: 64,
  },
  palette: {
    primary: {
      main: amber[500],
    },
    secondary: {
      main: deepOrange[500],
    },
  },
  overrides: {
    MuiIconButton: {
      root: {
        "@media (max-width:900px)": {
          padding: "4px",
        },
      },
    },
    MuiButton: {
      contained: {
        fontSize: "1rem",
        border: `2px solid ${amber[500]}`,
        background: `linear-gradient(to bottom, ${amber[300]}, ${amber[800]})`,
        borderRadius: "64px",
        fontWeight: 900,
        padding: "10px 20px",
        "@media (max-width:900px)": {
          padding: "4px 10px",
        },
        "& .MuiButton-label": {
          color: deepOrange[800],
        },
      },
      text: {
        padding: 0,
      },
    },
    MuiDialog: {
      paper: {
        overflowY: "visible",
        boxShadow: "none",
      },
      paperFullScreen: {
        height: "90%",
      },
      paperWidthMd: {
        maxWidth: "800px",
      },
    },
    MuiTooltip: {
      tooltip: {
        transform: "rotate(-3deg)!important",
        backgroundColor: "white",
        color: "#000",
        borderRadius: "10px",
        fontSize: "0.8rem",
        padding: "10px",
        boxShadow:
          "0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)",
      },
      arrow: {
        color: "white",
      },
    },
  },
});

export default theme;
