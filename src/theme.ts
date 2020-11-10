import { createMuiTheme } from "@material-ui/core/styles";
import amber from "@material-ui/core/colors/amber";
import deepOrange from "@material-ui/core/colors/deepOrange";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Roboto Slab",
    fontWeightBold: 800,
    h4: {
      fontWeight: 800,
    },
    h5: {
      fontWeight: 800,
    },
    overline: {
      lineHeight: 1.2,
      fontWeight: 800,
      fontSize: "10px",
    },
    body1: {
      fontSize: "1.5rem",
      fontWeight: 800,
      lineHeight: "1.2",
    },
    body2: {
      fontSize: "1.1rem",
      fontWeight: 800,
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
    MuiButton: {
      root: {
        fontSize: "1rem",
        border: `2px solid ${amber[500]}`,
        background: `linear-gradient(to bottom, ${amber[300]}, ${amber[800]})`,
        borderRadius: "64px",
        fontWeight: 900,
        padding: '10px 20px'
      },
      label: {
        color: deepOrange[800],
      },
    },
    MuiDialog: {
      paper: {
        overflowY: "visible",
        boxShadow: 'none'
      },
      paperFullScreen: {
        height: '90%'
      }
    },
  },
});

export default theme;
