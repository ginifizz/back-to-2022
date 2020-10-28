import { createMuiTheme } from "@material-ui/core/styles";
import amber from "@material-ui/core/colors/amber";
import deepOrange from "@material-ui/core/colors/deepOrange";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Catamaran",
    fontWeightBold: 800,
    h4: {
      fontWeight: 800,
    },
    h5: {
      fontWeight: 800,
    },
  },
  shape: {
    borderRadius: 32,
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
        borderRadius: "15px",
        boxShadow: "10px 10px 0px -2px rgba(0,0,0,0.75)",
      },
      label: {
        color: deepOrange[800],
      },
    },
    MuiDialog: {
      paper: {
        overflowY: "visible",
      },
    },
  },
});

export default theme;
