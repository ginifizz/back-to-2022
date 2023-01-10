import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import Level from "./Level";

const useStyles = makeStyles((theme) => ({
  menu: {
    position: "absolute",
    width: "100%",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    left: 0,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "space-between",
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  levels: {
    position: "absolute",
    right: 0,
    top: 0,
    width: "360px",
    height: "360px",
    transform: "translateX(calc(50% - 10px))",
    [theme.breakpoints.down("sm")]: {
      width: "200px",
      height: "200px",
    },
  },
  level: {
    margin: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(1),
    },
  },
  logo: {
    position: "absolute",
    top: "20px",
    left: "20px",
    width: "400px",
    [theme.breakpoints.down("md")]: {
      width: "300px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "200px"
    },
  },
}));

const Levels: React.ComponentType = () => {

  const classes = useStyles();

  return (
    <Box className={classes.menu}>
      <img
        src={`${process.env.PUBLIC_URL}/logo3.png`}
        alt="logo"
        className={classes.logo}
      />
      <Box className={classes.levels}>
        <div className={classes.level}>
          <Level />
        </div>
      </Box>
    </Box>
  );
};

export default Levels;
