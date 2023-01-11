import React from "react";
import {
  Dialog,
  DialogProps,
  Box,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import { cyan } from "@material-ui/core/colors";
import Zoom from "@material-ui/core/Zoom";

export interface GameModalProps extends Omit<DialogProps, 'onClose'> {
  color?: any;
  onClose?: () => void;
  flipChildren?: any;
}

const useStyles = (color: any) =>
  makeStyles<Theme>((theme) => ({
    paper: {
      backgroundColor: cyan[400],
      transform: "translateX(5px) translateY(-2px) rotate(-2deg)",
      [theme.breakpoints.down("sm")]: {
        background: "none",
        transform: "translateX(5px) translateY(-2px) rotate(-2deg)",
        "@media (orientation: portrait)": {
          marginLeft: "16px",
          marginRight: "16px",
        },
      },
      perspective: "40rem",
    },
    border: {
      position: "absolute",
      width: "calc(100% - 16px)",
      height: "calc(100% - 16px)",
      left: "8px",
      top: "8px",
      pointerEvents: "none",
      borderRadius: theme.shape.borderRadius,
    },
    dialog: {
      overflow: "visible",
      position: "relative",
      zIndex: 1,
      width: "100%",
      height: "100%",
      transform: "translateX(-10px) translateY(2px) rotate(-2deg)",
      color: cyan[300],
      [theme.breakpoints.down("sm")]: {
        transform: "none",
      },
      transformStyle: "preserve-3d",
      flex: 1,
      transition: "all ease 0.3s",
    },
    flip: {
      transform:
        "translateX(-10px) translateY(2px) rotate(-2deg) rotateX(-180deg)",
    },
    eventsNone: {
      pointerEvents: "none",
    },
    front: {
      backfaceVisibility: "hidden",
      minWidth: "100%",
      padding: theme.spacing(2),
      background: "radial-gradient(#37065c, #130624)",
      borderRadius: theme.shape.borderRadius,
      border: "3px solid #4cd8ed",
      zIndex: 1,
    },
    back: {
      transform: "rotateX(-180deg) translate(-100%, 0)",
      backfaceVisibility: "hidden",
      minWidth: "100%",
      padding: theme.spacing(2),
      background: "radial-gradient(#37065c, #130624)",
      borderRadius: theme.shape.borderRadius,
      border: "3px solid #4cd8ed",
      zIndex: 2,
      display: "flex"
    },
  }));

const GameModal: React.ComponentType<GameModalProps> = ({
  onClose,
  children,
  flipChildren,
  color = purple,
  ...props
}) => {
  const classes = useStyles(color)();

  return (
    <Dialog
      onClose={onClose}
      TransitionComponent={Zoom}
      transitionDuration={300}
      {...props}
      keepMounted
      classes={{ paper: classes.paper }}
    >
      <Box className={`${classes.dialog} ${flipChildren ? classes.flip : null}`} display="flex" flexDirection="row">
          <div className={`${classes.front} ${flipChildren && classes.eventsNone}`}>
            {children}
          </div>
          <div className={classes.back}>
            {flipChildren}
          </div>
        </Box>
    </Dialog>
  );
};

export default GameModal;
