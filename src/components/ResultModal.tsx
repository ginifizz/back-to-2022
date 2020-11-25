import React, { useCallback, useState, useEffect } from "react";
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
import Rating from "./Rating";
import {
  resultTexts,
  getReputationRating,
  getFollowersRating,
  getMoneyRating,
} from "../data/results";

const useStyles = makeStyles((theme) => ({
  text: {
    color: theme.palette.text.secondary,
    fontSize: "1rem",
    marginBottom: theme.spacing(2),
  },
  mainText: {
    color: theme.palette.text.primary,
  },
  button: {
    position: "absolute",
    border: "5px solid white",
    boxShadow: "none",
    right: "70px",
    bottom: "-20px",
    "&:hover": {
      boxShadow: "none",
    },
  },
}));

const ResultModal: React.ComponentType<Omit<DialogProps, "open">> = (
  props
) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useRecoilState(stepState);
  const [score] = useRecoilState(scoreState);

  const resetGame = useResetRecoilState(gameState);
  const resetDice = useResetRecoilState(diceState);

  const reset = useCallback(() => {
    resetDice();
    resetGame();
  }, [resetGame, resetDice]);

  const onReStart = useCallback(() => {
    reset();
    setStep(GAME_STEPS.GAME_SCREEN);
  }, [setStep, reset]);

  const reputationRating = getReputationRating(score.reputation);
  const followersRating = getFollowersRating(score.followers);
  const moneyRating = getMoneyRating(score.money);
  const fullRating = Math.round((reputationRating + followersRating + moneyRating) / 3);

  const classes = useStyles();

    useEffect(() => {
      if (step === GAME_STEPS.RESULT_SCREEN) setOpen(true);
    }, [setOpen, step]);

    const handleClose = () => {
      setOpen(false);
    };

  return (
    <GameModal
      maxWidth="lg"
      {...props}
      onClose={handleClose}
      open={open}
      onExited={onReStart}
      keepMounted
    >
      <Box px={3}>
        <Rating rate={reputationRating} title="Réputation" />
        <Typography className={classes.text} variant="body2" gutterBottom>
          {resultTexts.reputation[reputationRating]}
        </Typography>
        <Rating rate={moneyRating} title="Participation" />
        <Typography className={classes.text} variant="body2" gutterBottom>
          {resultTexts.money[moneyRating]}
        </Typography>
        <Rating rate={followersRating} title="Followers" />
        <Typography className={classes.text} variant="body2" gutterBottom>
          {resultTexts.followers[followersRating]}
        </Typography>
      </Box>
      <Box py={4}>
        <Rating big rate={fullRating} title="Ton score :" />
        <Typography className={classes.mainText} variant="body2" gutterBottom>
          {resultTexts.score[fullRating]}
        </Typography>
      </Box>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={handleClose}
      >
        REFAIRE UNE PARTIE
      </Button>
    </GameModal>
  );
};

export default ResultModal;
