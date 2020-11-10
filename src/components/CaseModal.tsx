import React, { useState, useEffect } from "react";
import {
  DialogProps,
  Box,
  Typography,
  makeStyles,
  Theme,
  darken,
  Grow
} from "@material-ui/core";
import Curl from "../assets/curl.svg";
import Level from "./Level";
import { CaseType } from "../Game";
import { colors, titles } from "../data/cases";
import { TransitionProps } from "@material-ui/core/transitions";
import { cyan } from "@material-ui/core/colors";
import GameModal from './GameModal';

interface CaseModalProps extends Omit<DialogProps, "open"> {
  content?: CaseType;
  onClose: () => void;
}

const useStyles = (color: any) =>
  makeStyles<Theme>((theme) => ({
    left: {
      width: "40%",
      position: "relative",
      transform: "translateX(-10%)",
      zIndex: 2,
    },
    right: {
      width: '60%',
    },
    title: {
      position: "absolute",
      zIndex: 2,
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      minWidth: "80%",
      "&::before": {
        content: '""',
        position: "absolute",
        zIndex: "-1",
        left: 0,
        border: "25px solid;",
        top: "0",
        transform: "translate(-70%, -15px)",
        borderColor: `${color[800]} ${color[800]} ${color[800]} transparent`,
      },
      "&::after": {
        content: '""',
        position: "absolute",
        zIndex: "-1",
        right: "0",
        border: "25px solid;",
        top: "0",
        transform: "translate(70%, -15px)",
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
        borderColor: `transparent ${darken(
          color[900],
          0.2
        )} transparent transparent`,
        position: "absolute",
        borderStyle: "solid",
        top: "-15px",
        left: 0,
        borderWidth: "15px 15px 0 0",
      },
      "&::after": {
        content: '""',
        borderColor: `transparent transparent ${darken(
          color[900],
          0.2
        )} transparent`,
        position: "absolute",
        borderStyle: "solid",
        top: "-15px",
        right: 0,
        borderWidth: "0 15px 15px 0",
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
      boxShadow: "0px 10px 15px 0px rgba(0,0,0,0.5) inset",
    },
    circle: {
      width: "100%",
      height: "0",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      paddingBottom: "100%",
      borderRadius: "50%",
      border: `15px solid white`,
      position: "absolute",
      backgroundImage: `url(${Curl})`,
      background: color[500],
      zIndex: -1,
    },
    image: {
      width: "100%",
      maxHeight: "100%",
      borderRadius: "50%",
    },
    levels: {
      position: "absolute",
      borderRadius: theme.shape.borderRadius,
      padding: 0,
      background: color[400],
      top: '100%',
      right: '50px',
      transform: 'translateY(-50%)',
      border: '5px solid white'
    }
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
    <GameModal
      onClose={handleClose}
      TransitionComponent={Transition}
      {...props}
      keepMounted
      open={open}
      onExited={onClose}
      color={color}
      maxWidth="md"
    >
      <Box
        p={1}
        pb={2}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
        <div className={classes.left}>
          {type && (
            <>
              <div className={classes.circle} />
              <img
                src={`${process.env.PUBLIC_URL}/cases/${type}.png`}
                className={classes.image}
                alt={type}
              />
              <div className={classes.title}>
                <div className={classes.ribbon}>
                  <Typography variant="h5" color="inherit">
                    {type && titles[type]}
                  </Typography>
                </div>
              </div>
            </>
          )}
        </div>
        <Box
          pl={2}
          pr={8}
          py={2}
          flex={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          fontSize="body1.fontSize"
          lineHeight={1.2}
          fontWeight="fontWeightBold"
          className={classes.right}
        >
          <Box pb={2}>
            <Typography variant="body1" color="inherit">
              {mainText}
            </Typography>
          </Box>
          <Typography variant="body2" color="textPrimary">
            {secondaryText}
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          py={2}
          className={classes.levels}
        >
          {!!money && (
            <Box py={0.5}>
              <Level
                type="coin"
                value={money > 0 ? `+${money}` : `${money}`}
                title="Participation"
                imageStep={100}
              />
            </Box>
          )}
          {!!reputation && (
            <Box py={0.5}>
              <Level
                type="star"
                value={reputation > 0 ? `+${reputation}` : `${reputation}`}
                title="Réputation"
                imageStep={100}
              />
            </Box>
          )}
          {!!followers && (
            <Box py={0.5}>
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
    </GameModal>
  );
};

export default CaseModal;
