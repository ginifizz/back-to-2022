import React from "react";
import {
  Dialog,
  DialogProps,
  Box,
  makeStyles,
  Theme,
  IconButton,
  Grow
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { TransitionProps } from "@material-ui/core/transitions";
import { purple } from "@material-ui/core/colors";
import { cyan } from "@material-ui/core/colors";

export interface GameModalProps extends Omit<DialogProps, 'onClose'> {
  color?: any;
  onClose?: () => void;
  flipChildren?: any;
}

const useStyles = (color: any) =>
  makeStyles<Theme>((theme) => ({
    paper: {
      backgroundColor: "#000",
      transform: "translateX(5px) translateY(-2px) rotate(-2deg)",
      [theme.breakpoints.down("sm")]: {
        background: "none",
        transform: "translateX(5px) translateY(-2px) rotate(-2deg)",
      },
      perspective: "40rem",
    },
    border: {
      position: "absolute",
      width: "calc(100% - 16px)",
      height: "calc(100% - 16px)",
      left: "8px",
      top: "8px",
      border: "2px dashed #8300a3",
      pointerEvents: "none",
      borderRadius: theme.shape.borderRadius,
    },
    dialog: {
      overflow: "visible",
      padding: theme.spacing(2),
      position: "relative",
      zIndex: 1,
      width: "100%",
      height: "100%",
      transform: "translateX(-10px) translateY(2px) rotate(-2deg)",
      color: cyan[300],
      [theme.breakpoints.down("sm")]: {
        transform: "none",
      },
      borderRadius: theme.shape.borderRadius,
      border: "3px solid #4cd8ed",
      background: "radial-gradient(#37065c, #130624)",
      boxShadow: "rgb(64 221 255) 0px 0px 12px",
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
    },
    back: {
      transform: "rotateX(-180deg) translate(-100%, 0)",
      backfaceVisibility: "hidden",
      minWidth: "100%",
    },
    close: {
      zIndex: 4,
      position: "absolute",
      right: theme.spacing(3),
      top: theme.spacing(3),
      background: color[800],
      color: "#fff",
      transition: "all ease 0.2s",
      boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.63)",
      transform: "scale(1.3)",
      "&:hover": {
        background: color[900],
      },
    },
  }));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return (
    <Grow
      ref={ref}
      {...props}
      timeout={{ appear: 10000, enter: 500, exit: 300 }}
    />
  );
});

const GameModal: React.ComponentType<GameModalProps> = ({
  onClose,
  children,
  flipChildren,
  color = purple,
  ...props
}) => {
  const classes = useStyles(color)();

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <Dialog
      onClose={onClose}
      TransitionComponent={Transition}
      {...props}
      keepMounted
      classes={{ paper: classes.paper }}
    >
      <Box className={`${classes.dialog} ${flipChildren ? classes.flip : null}`} display="flex" flexDirection="row">
        <div className={classes.border} />
          <div className={`${classes.front} ${flipChildren && classes.eventsNone}`}>
            {onClose && (
              <IconButton className={classes.close} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            )}
            {children}
          </div>
          {flipChildren && <div className={classes.back}>
            {flipChildren}
          </div>}
        </Box>
    </Dialog>
  );
};

export default GameModal;
