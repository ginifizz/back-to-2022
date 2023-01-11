import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import cyan from "@material-ui/core/colors/cyan";
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
    fontFamily: "Spline Sans Mono",
    fontWeightBold: 800,
    h4: {
      fontWeight: 800,
      fontSize: "1.8rem",
    },
    h5: {
      fontWeight: 800,
      lineHeight: 0.8,
      "@media (max-width:900px)": {
        fontSize: "0.9rem",
        lineHeight: 1,
      },
    },
    overline: {
      lineHeight: 1.2,
      fontWeight: 800,
      fontSize: "0.9rem",
      "@media (max-width:900px)": {
        fontSize: "0.8rem",
      },
    },
    body2: {
      fontSize: "1.4rem",
      fontWeight: 800,
      lineHeight: "1.2",
      "@media (max-width:900px)": {
        fontSize: "1.2rem",
        lineHeight: "1.1",
      },
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 800,
      "@media (max-width:900px)": {
        fontSize: "0.8rem",
        lineHeight: "1.2",
      },
    },
  },
  shape: {
    borderRadius: 64,
  },
  palette: {
    primary: {
      main: cyan[500],
    },
    secondary: {
      main: deepOrange[500],
    },
    text: {
      primary: "#fff",
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
        border: `2px solid ${cyan[400]}`,
        background: `linear-gradient(to bottom, ${cyan[700]}, ${cyan[400]})`,
        borderRadius: "64px",
        fontWeight: 900,
        padding: "10px 20px",
        "@media (max-width:900px)": {
          padding: "4px 10px",
        },
        "& .MuiButton-label": {
          color: purple[900],
        },
        "&:hover": {
          background: `linear-gradient(to bottom, ${cyan[500]}, ${cyan[200]})`,
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
        fontSize: "0.9rem",
        padding: "10px",
        boxShadow:
          "0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)",
      },
      popper: {
        pointerEvents: "initial",
      },
      arrow: {
        color: "white",
      },
    },
  },
});

export default theme;
