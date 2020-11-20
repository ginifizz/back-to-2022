import React, { useState, useEffect } from "react";
import {
  DialogProps,
  Box,
  Typography,
  makeStyles,
  Theme,
  darken,
  Grow,
  Tooltip,
  Button,
  ClickAwayListener,
} from "@material-ui/core";
import Curl from "../assets/curl.svg";
import Level from "./Level";
import { CaseType } from "../Game";
import { colors, titles } from "../data/cases";
import { TransitionProps } from "@material-ui/core/transitions";
import { cyan } from "@material-ui/core/colors";
import Help from "@material-ui/icons/HelpOutline";
import GameModal from './GameModal';

interface CaseModalProps extends Omit<DialogProps, "open"> {
  content?: CaseType;
  onClose: () => void;
}

const useStyles = (color: any, withTooltip: boolean = false) =>
  makeStyles<Theme>((theme) => ({
    left: {
      width: "40%",
      position: "relative",
      transform: "translateX(-10%)",
      zIndex: 2,
      [theme.breakpoints.down("md")]: {
        width: "35%",
      },
    },
    title: {
      position: "absolute",
      zIndex: 2,
      bottom: 0,
      left: "45%",
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
        [theme.breakpoints.down("sm")]: {
          borderWidth: "15px",
          transform: "translate(-70%, -10px)",
        },
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
        [theme.breakpoints.down("sm")]: {
          borderWidth: "15px",
          transform: "translate(70%, -10px)",
        },
      },
    },
    mainText: {
      paddingBottom: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        paddingBottom: theme.spacing(1),
      },
    },
    ribbon: {
      position: "relative",
      zIndex: 2,
      background: color[700],
      padding: theme.spacing(1),
      minHeight: "50px",
      textAlign: "center",
      color: "white",
      borderRadius: "5px 5px 0 0",
      boxShadow: "0px 10px 15px 0px rgba(0,0,0,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0.5),
        minHeight: "30px",
      },
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
        [theme.breakpoints.down("sm")]: {
          top: "-10px",
          borderWidth: "10px 10px 0 0",
        },
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
        [theme.breakpoints.down("sm")]: {
          top: "-10px",
          borderWidth: "0 10px 10px 0",
        },
      },
    },
    circle: {
      width: "100%",
      height: "0",
      top: "50%",
      left: "45%",
      transform: "translate(-50%, -50%)",
      paddingBottom: "100%",
      borderRadius: "50%",
      border: `15px solid white`,
      position: "absolute",
      backgroundImage: `url(${Curl})`,
      background: color[500],
      zIndex: -1,
      [theme.breakpoints.down("sm")]: {
        borderWidth: "5px",
      },
    },
    image: {
      width: "100%",
      maxHeight: "100%",
      borderRadius: "50%",
    },
    levels: {
      position: "absolute",
      borderRadius: theme.shape.borderRadius,
      background: color[400],
      top: "100%",
      right: "30px",
      transform: "translateY(-50%) scale(0.8)",
      border: "5px solid white",
    },
    tooltipButton: {
      color: color[800],
    },
    toolTipLayer: {
      position: "fixed",
      opacity: withTooltip ? 1 : 0,
      transition: "opacity ease 0.3s",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      zIndex: 1400,
      pointerEvents: withTooltip ? 'initial' : 'none',
      transform: `scale(${withTooltip ? 1 : 0})`
    },
  }));

const emptyCase = {
  type: undefined,
  mainText: "",
  secondaryText: "",
  reputation: 0,
  money: 0,
  followers: 0,
  ref: null
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
    ref
  } = content;

  const [open, setOpen] = useState(false);
  const [openRef, setOpenRef] = useState(false);
  const color = type ? colors[type] : cyan;
  const classes = useStyles(color, openRef)();

  useEffect(() => {
    if (type) setOpen(true);
  }, [setOpen, type]);

  const handleClose = () => {
    setOpen(false);
  };

   const handleTooltipClose = () => {
     setOpenRef(false);
   };

   const handleTooltipOpen = () => {
     setOpenRef(true);
   };

  return (
    <>
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
          pb={3}
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
            pr={8}
            py={0.5}
            flex={1}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            fontSize="body1.fontSize"
            lineHeight={1.2}
            fontWeight="fontWeightBold"
            className={classes.right}
          >
            <Box className={classes.mainText}>
              <Typography variant="body1" color="inherit">
                {mainText}
              </Typography>
            </Box>
            <Typography variant="body2" color="textPrimary" gutterBottom>
              {secondaryText}
            </Typography>
            {ref && (
              <ClickAwayListener onClickAway={handleTooltipClose}>
                <Box position="relative">
                  <Tooltip
                    arrow
                    onClose={handleTooltipClose}
                    open={openRef}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    placement="top"
                    title={ref || "Y'a pas de ref"}
                  >
                    <Button className={classes.tooltipButton} variant="text" onClick={handleTooltipOpen}>
                      <Help />
                      <Box pl={0.5}>
                        <Typography variant="caption" component="p">
                          C'est quoi la ref ?
                        </Typography>
                      </Box>
                    </Button>
                  </Tooltip>
                </Box>
              </ClickAwayListener>
            )}
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            className={classes.levels}
          >
            {!!money && (
              <Box my={0.5} mx={1.5}>
                <Level
                  type="coin"
                  value={money > 0 ? `+${money}` : `${money}`}
                  title="Participation"
                  imageStep={100}
                />
              </Box>
            )}
            {!!reputation && (
              <Box my={0.5} mx={1.5}>
                <Level
                  type="star"
                  value={reputation > 0 ? `+${reputation}` : `${reputation}`}
                  title="Réputation"
                  imageStep={100}
                />
              </Box>
            )}
            {!!followers && (
              <Box my={0.5} mx={1.5}>
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
      <div className={classes.toolTipLayer} />
    </>
  );
};

export default CaseModal;
