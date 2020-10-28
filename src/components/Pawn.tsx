import React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import amber from "@material-ui/core/colors/amber";

interface PawnType {
  position: string;
}

const useStyles = makeStyles<Theme, PawnType>((theme) => ({
  cube: {
    gridArea: (props) => props.position,
    boxShadow: "inset 0 0 0 .25em hsla(0,0%,0%,.1)",
    content: '""',
    height: "40px",
    width: "40px",
    left: "50%",
    top: "50%",
    backgroundColor: amber[600],
    position: "relative",
    transform: "translate3d(-50%, -50%, 40px)",
    transformStyle: "preserve-3d",
    transition: 'all ease 0.3s',
    "&::before": {
      position: "absolute",
      boxShadow: "inset 0 0 0 .25em hsla(0,0%,0%,.1)",
      content: '""',
      height: "100%",
      width: "100%",
      backgroundColor: amber[700],
      transform: "rotateY(270deg) translateX(-100%)",
      transformOrigin: "center left",
    },
    "&::after": {
      position: "absolute",
      boxShadow: "inset 0 0 0 .25em hsla(0,0%,0%,.1)",
      content: '""',
      height: "100%",
      width: "100%",
      backgroundColor: amber[800],
      transform: "rotateX(-90deg) translateY(100%)",
      transformOrigin: "100% 100%",
    },
  },
}));

const Pawn: React.ComponentType<PawnType> = ({ position }) => {
  const classes = useStyles({ position });

  return <div className={classes.cube}></div>;
};

export default Pawn;
