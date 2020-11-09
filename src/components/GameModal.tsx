import React from "react";
import {
  Dialog,
  DialogProps,
  Box,
  Typography,
  makeStyles,
  Theme,
  IconButton,
  darken,
  Grow,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { TransitionProps } from "@material-ui/core/transitions";
import { cyan } from "@material-ui/core/colors";

interface GameModalProps extends Omit<DialogProps, 'onClose'> {
  color?: any;
  title: string;
  onClose?: () => void;
}

const useStyles = (color: any) =>
  makeStyles<Theme>((theme) => ({
    dialog: {
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
      borderRadius: theme.shape.borderRadius,
      background: color[300],
      boxShadow: `1px 1px 0px ${color[800]},2px 2px 0px ${color[800]},3px 3px 0px ${color[800]},4px 4px 0px ${color[800]},5px 5px 0px ${color[800]},6px 6px 0px ${color[800]},7px 7px 0px ${color[800]},8px 8px 0px ${color[800]},9px 9px 0px ${color[800]},10px 10px 0px ${color[800]},11px 11px 0px ${color[800]}`,
      padding: theme.spacing(2),
      color: theme.palette.getContrastText(color[300]),
      minWidth: '500px'
    },
    title: {
      position: "absolute",
      zIndex: 2,
      top: 0,
      left: "50%",
      transform: "translate(-50%, -40%)",
      minWidth: "50%",
      "&::before": {
        content: '""',
        position: "absolute",
        zIndex: "-1",
        left: 0,
        border: "25px solid;",
        top: "0",
        transform: "translate(-70%, 15px)",
        borderColor: `${color[900]} ${color[900]} ${color[900]} transparent`,
      },
      "&::after": {
        content: '""',
        position: "absolute",
        zIndex: "-1",
        right: "0",
        border: "25px solid;",
        top: "0",
        transform: "translate(70%, 15px)",
        borderColor: `${color[900]} transparent ${color[900]} ${color[900]}`,
      },
    },
    ribbon: {
      position: "relative",
      zIndex: 2,
      background: color[800],
      padding: theme.spacing(1),
      textAlign: "center",
      color: "white",
      borderRadius: "5px 5px 0 0",
      boxShadow: "0px 10px 15px 0px rgba(0,0,0,0.3)",
      "&::before": {
        content: '""',
        borderColor: `${darken(
          color[900],
          0.5
        )} transparent transparent transparent`,
        position: "absolute",
        borderStyle: "solid",
        bottom: "-15px",
        left: 0,
        borderWidth: "15px 0 0 15px",
      },
      "&::after": {
        content: '""',
        borderColor: `${darken(
          color[900],
          0.5
        )} transparent transparent transparent`,
        position: "absolute",
        borderStyle: "solid",
        bottom: "-15px",
        right: 0,
        borderWidth: "15px 15px 0 0",
      },
    },
    close: {
      zIndex: 4,
      position: "absolute",
      right: -theme.spacing(2),
      top: -theme.spacing(2),
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
  title,
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
    >
      <Box className={classes.dialog} display="flex" flexDirection="row">
        {onClose && (
          <IconButton className={classes.close} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        )}
        <div className={classes.title}>
          <div className={classes.ribbon}>
            <Typography variant="h5" color="inherit">
              {title}
            </Typography>
          </div>
        </div>
        {children}
      </Box>
    </Dialog>
  );
};

export default CaseModal;
