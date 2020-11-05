import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogProps,
  Box,
  Typography,
  makeStyles,
  Theme,
  IconButton,
  darken,
  Grow
} from "@material-ui/core";
import Curl from "../assets/curl.svg";
import CloseIcon from "@material-ui/icons/Close";
import Level from "./Level";
import { CaseType } from "../Game";
import { colors, titles } from "../data/cases";
import { TransitionProps } from "@material-ui/core/transitions";
import { cyan } from "@material-ui/core/colors";

interface CaseModalProps extends Omit<DialogProps, "open"> {
  content?: CaseType;
  onClose: () => void;
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
    },
    title: {
      position: "absolute",
      zIndex: 2,
      top: 0,
      left: "50%",
      transform: "translate(-50%, -65%)",
      minWidth: "50%",
      "&::before": {
        content: '""',
        position: "absolute",
        zIndex: "-1",
        left: 0,
        border: "25px solid;",
        top: "0",
        transform: "translate(-70%, 15px)",
        borderColor: `${color[800]} ${color[800]} ${color[800]} transparent`,
      },
      "&::after": {
        content: '""',
        position: "absolute",
        zIndex: "-1",
        right: "0",
        border: "25px solid;",
        top: "0",
        transform: "translate(70%, 15px)",
        borderColor: `${color[800]} transparent ${color[800]} ${color[800]}`,
      },
    },
    ribbon: {
      position: "relative",
      zIndex: 2,
      background: color[700],
      padding: theme.spacing(1),
      textAlign: "center",
      color: "white",
      borderRadius: "5px 5px 0 0",
      boxShadow: "0px 10px 15px 0px rgba(0,0,0,0.3)",
      "&::before": {
        content: '""',
        borderColor: `${darken(
          color[900],
          0.2
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
          0.2
        )} transparent transparent transparent`,
        position: "absolute",
        borderStyle: "solid",
        bottom: "-15px",
        right: 0,
        borderWidth: "15px 15px 0 0",
      },
    },
    top: {
      zIndex: 1,
      backgroundImage: `url(${Curl})`,
      backgroundSize: "150%, 100%",
      backgroundPosition: "center",
      background: color[500],
      borderRadius: theme.shape.borderRadius,
      color: "white",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
      height: "200px",
      overflow: "hidden",
    },
    circle: {
      width: "250px",
      height: "250px",
      borderRadius: "50%",
      border: `5px solid ${color[900]}`,
      position: "absolute",
      background: color[100],
      overflow: "hidden",
    },
    image: {
      height: "100%",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
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

const emptyCase = {
  type: undefined,
  mainText: "",
  secondaryText: "",
  reputation: 0,
  money: 0,
  followers: 0,
};

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

const CaseModal: React.ComponentType<CaseModalProps> = ({
  content = emptyCase,
  onClose,
  ...props
}) => {
  const {
    type,
    mainText,
    secondaryText,
    money,
    followers,
    reputation,
  } = content;

  const [open, setOpen] = useState(false);
  const color = type ? colors[type] : cyan;
  const classes = useStyles(color)();

  useEffect(() => {
    if (type) setOpen(true);
  }, [setOpen, type]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      TransitionComponent={Transition}
      {...props}
      keepMounted
      open={open}
      onExited={onClose}
    >
      <Box className={classes.dialog} display="flex" flexDirection="row">
        <IconButton className={classes.close} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <div className={classes.title}>
          <div className={classes.ribbon}>
            <Typography variant="h5" color="inherit">
              {type && titles[type]}
            </Typography>
          </div>
        </div>
        <div className={classes.top}>
          <div className={classes.circle}>
            {type && (
              <img
                className={classes.image}
                src={`${process.env.PUBLIC_URL}/cases/${type}.png`}
                alt={type}
              />
            )}
          </div>
        </div>
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={2}
        >
          <Box
            fontSize="body1.fontSize"
            lineHeight={1.2}
            textAlign="center"
            pb={2}
          >
            {mainText}
          </Box>
          <Box
            fontSize="body2.fontSize"
            fontWeight="fontWeightBold"
            textAlign="center"
            lineHeight={1.2}
          >
            {secondaryText}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" py={2}>
          {!!money && (
            <Box p={0.5}>
              <Level
                type="coin"
                value={money > 0 ? `+${money}` : `${money}`}
                title="Participation"
                imageStep={100}
              />
            </Box>
          )}
          {!!reputation && (
            <Box p={0.5}>
              <Level
                type="star"
                value={reputation > 0 ? `+${reputation}` : `${reputation}`}
                title="Réputation"
                imageStep={100}
              />
            </Box>
          )}
          {!!followers && (
            <Box p={0.5}>
              <Level
                type="heart"
                value={followers > 0 ? `+${followers}` : `${followers}`}
                title="Followers"
                imageStep={100}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Dialog>
  );
};

export default CaseModal;
