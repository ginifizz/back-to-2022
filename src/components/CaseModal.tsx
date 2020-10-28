import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogProps,
  Box,
  Typography,
  makeStyles,
  Theme,
  IconButton,
  Slide,
} from "@material-ui/core";
import Curl from "../assets/curl.svg";
import CloseIcon from "@material-ui/icons/Close";
import Level from './Level';
import { CaseType } from '../Game';
import { TransitionProps } from "@material-ui/core/transitions";

interface CaseModalProps extends Omit<DialogProps, 'open'> {
  content?: CaseType;
  onClose: () => void;
}

const useStyles = makeStyles<Theme>((theme) => ({
  dialog: {
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    borderRadius: theme.shape.borderRadius,
    background: "#5dbfcd",
    boxShadow:
      "1px 1px 0px #118594,2px 2px 0px #118594,3px 3px 0px #118594,4px 4px 0px #118594,5px 5px 0px #118594,6px 6px 0px #118594,7px 7px 0px #118594,8px 8px 0px #118594,9px 9px 0px #118594,10px 10px 0px #118594,11px 11px 0px #118594",
    padding: theme.spacing(2),
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
      borderColor: "#04707b #04707b #04707b transparent",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      zIndex: "-1",
      right: "0",
      border: "25px solid;",
      top: "0",
      transform: "translate(70%, 15px)",
      borderColor: "#04707b transparent #04707b #04707b",
    },
  },
  ribbon: {
    position: "relative",
    zIndex: 2,
    background: "#108694",
    padding: theme.spacing(1),
    textAlign: "center",
    color: "white",
    borderRadius: "5px 5px 0 0",
    boxShadow: "0px 10px 15px 0px rgba(0,0,0,0.3)",
    "&::before": {
      content: '""',
      borderColor: "#033135 transparent transparent transparent",
      position: "absolute",
      borderStyle: "solid",
      bottom: "-15px",
      left: 0,
      borderWidth: "15px 0 0 15px",
    },
    "&::after": {
      content: '""',
      borderColor: "#033135 transparent transparent transparent",
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
    background: "rgba(255, 255, 255, 0.2)",
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
    border: "5px solid #04707b",
    position: "absolute",
    background: "#108694",
    overflow: 'hidden'
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
    background: "#108694",
    color: "#fff",
    transition: "all ease 0.2s",
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.63)",
    transform: "scale(1.3)",
    "&:hover": {
      background: "#08646f",
    },
  },
}));

const emptyCase = {
  type: '',
  text: {
    main: '',
    secondary: ''
  },
  score: {
    reputation: 0,
    money: 0,
    followers: 0
  }
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});


const CaseModal: React.ComponentType<CaseModalProps> = ({
  content = emptyCase,
  onClose,
  ...props
}) => {
  const classes = useStyles();
  const { type, text, score } = content;


const [open, setOpen] = useState(false);

useEffect(() => {if (type !== '') setOpen(true)}, [setOpen, type]);


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
      onEntered={() => console.log("entered")}
    >
      <Box className={classes.dialog} display="flex" flexDirection="row">
        <IconButton className={classes.close} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <div className={classes.title}>
          <div className={classes.ribbon}>
            <Typography variant="h5" color="inherit">
              {`#${type}`}
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
            {text.main}
          </Box>
          <Box
            fontSize="body2.fontSize"
            fontWeight="fontWeightBold"
            textAlign="center"
            lineHeight={1.2}
          >
            {text.secondary}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" py={2}>
          {!!score.money && (
            <Box p={0.5}>
              <Level
                type="coin"
                value={score.money > 0 ? `+${score.money}` : `${score.money}`}
                title=""
                imageStep={100}
              />
            </Box>
          )}
          {!!score.reputation && (
            <Box p={0.5}>
              <Level
                type="star"
                value={
                  score.reputation > 0
                    ? `+${score.reputation}`
                    : `${score.reputation}`
                }
                title=""
                imageStep={100}
              />
            </Box>
          )}
          {!!score.followers && (
            <Box p={0.5}>
              <Level
                type="heart"
                value={
                  score.followers > 0
                    ? `+${score.followers}`
                    : `${score.followers}`
                }
                title=""
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
