import React, { useCallback, useState, useEffect, useMemo } from "react";
import {
  diceState,
  gameState,
  stepState,
  scoreState,
  GAME_STEPS,
} from "../Game";
import { useRecoilState, useResetRecoilState } from "recoil";
import {
  DialogProps,
  Box,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import GameModal from "./GameModal";
import {
  resultTexts,
} from "../data/results";
import Level from "./Level";

const useStyles = makeStyles((theme) => ({
  content: {
    flexDirection: "row",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      "@media (orientation: portrait)": {
        flexDirection: "column",
        paddingBottom: theme.spacing(3),
      },
    },
  },
  left: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 50px",
  },
  right: {
    position: "relative",
    overflow: "hidden",
    width: "150px",
    height: "300px",
    borderRight: "1px solid",
    borderColor: theme.palette.primary.main,
    [theme.breakpoints.down("sm")]: {
      width: "100px",
      height: "200px",
    },
  },
  text: {
    color: theme.palette.text.secondary,
    fontSize: "0.8rem",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      fontSize: "0.6rem",
      marginBottom: theme.spacing(1),
    },
  },
  mainText: {
    color: theme.palette.text.primary,
    [theme.breakpoints.down("md")]: {
      fontSize: "1.5rem",
      marginBottom: theme.spacing(1),
    },
  },
  intro: {
    color: theme.palette.primary.main,
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
      marginBottom: theme.spacing(1),
    },
  },
  levels: {
    position: "absolute",
    right: 0,
    top: "50%",
    width: "300px",
    height: "300px",
    transform: "translateX(50%) translateY(-50%)",
    [theme.breakpoints.down("sm")]: {
      width: "200px",
      height: "200px",
    },
  },
  button: {
    position: "absolute",
    boxShadow: "none",
    right: "50px",
    bottom: "-20px",
    "&:hover": {
      boxShadow: "none",
    },
  },
}));

const ResultModal: React.ComponentType<Omit<DialogProps, "open">> = (props) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useRecoilState(stepState);
  const [score] = useRecoilState(scoreState);

  const resetGame = useResetRecoilState(gameState);
  const resetDice = useResetRecoilState(diceState);

  const rating = useMemo(() => {
    if (score > 80) return 4;
    else if (score > 30) return 3;
    else if (score > -30) return 2;
    else if (score > -80) return 1;
    return 0;
  }, [score]);

  const reset = useCallback(() => {
    resetDice();
    resetGame();
  }, [resetGame, resetDice]);

  const onReStart = useCallback(() => {
    reset();
    setStep(GAME_STEPS.START_SCREEN);
  }, [setStep, reset]);

  const classes = useStyles();

  useEffect(() => {
    if (step === GAME_STEPS.RESULT_SCREEN) setOpen(true);
  }, [setOpen, step]);

  const handleClose = () => {
    setOpen(false);
  };

  const formatText = (text:string) =>
    text &&
    text
      .replace(/\s!/gi, "&nbsp;!")
      .replace(/\s:/gi, "&nbsp;:")
      .replace(/\s\?/gi, "&nbsp;?");

  return (
    <GameModal
      maxWidth="md"
      {...props}
      onClose={undefined}
      open={open}
      onExited={onReStart}
      keepMounted
    >
      <Box
        className={classes.content}
        p={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <div className={classes.right}>
          <Box className={classes.levels}>
            <Level />
          </Box>
        </div>
        <div className={classes.left}>
          <Typography
            className={classes.intro}
            variant="body2"
            color="primary"
            align="center"
            gutterBottom
          >
            <div
              dangerouslySetInnerHTML={{
                __html: formatText(resultTexts.score[rating].intro),
              }}
            />
          </Typography>
          <Typography
            className={classes.mainText}
            variant="h4"
            align="center"
            gutterBottom
          >
            <div
              dangerouslySetInnerHTML={{
                __html: formatText(resultTexts.score[rating].result),
              }}
            />
          </Typography>
        </div>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleClose}
        >
          REFAIRE UNE PARTIE
        </Button>
      </Box>
    </GameModal>
  );
};

export default ResultModal;
