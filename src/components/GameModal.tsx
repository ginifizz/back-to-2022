import React from "react";
import {
  Dialog,
  DialogProps,
  Box,
  makeStyles,
  Theme,
  IconButton,
  Grow,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { TransitionProps } from "@material-ui/core/transitions";
import { cyan } from "@material-ui/core/colors";

interface GameModalProps extends Omit<DialogProps, 'onClose'> {
  color?: any;
  onClose?: () => void;
}

const useStyles = (color: any) =>
  makeStyles<Theme>((theme) => ({
    paper: {
      backgroundColor: color[500],
      transform: "translateX(35px) translateY(-2px) rotate(-2deg)",
    },
    dialog: {
      display: "flex",
      flexDirection: "column",
      overflow: "visible",
      padding: theme.spacing(2),
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      zIndex: 1,
      backgroundColor: "white",
      width: "100%",
      height: "100%",
      transform: "translateX(-50px) translateY(2px) rotate(-2deg)",
      boxShadow: `0px 0px 20px rgba(0, 0, 0, 0.5)`,
      color: color[600]
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

const CaseModal: React.ComponentType<GameModalProps> = ({
  onClose,
  children,
  color = cyan,
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
      <Box className={classes.dialog} display="flex" flexDirection="row">
        {onClose && (
          <IconButton className={classes.close} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        )}
        {children}
      </Box>
    </Dialog>
  );
};

export default CaseModal;
