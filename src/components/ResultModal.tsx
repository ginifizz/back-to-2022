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
  content: {
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      "@media (orientation: portrait)": {
        flexDirection: "column",
        paddingBottom: theme.spacing(3),
      },
    },
  },
  left: {
    width: '40%'
  },
  right: {
    width: '60%',
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: '5%'
  },
  text: {
    color: theme.palette.text.secondary,
    fontSize: "0.8rem",
    marginBottom: theme.spacing(2),
  },
  mainText: {
    color: theme.palette.text.primary,
    fontSize: "1rem",
    padding: `${theme.spacing(2)}px`
  },
  img: {
    width: '100%',
    maxWidth: '250px',
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
      maxWidth="md"
      {...props}
      onClose={handleClose}
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
        <div className={classes.left}>
          <Rating rate={reputationRating} title="Réputation" />
          <Typography className={classes.text} gutterBottom>
            {resultTexts.reputation[reputationRating]}
          </Typography>
          <Rating rate={moneyRating} title="Participation" />
          <Typography className={classes.text} gutterBottom>
            {resultTexts.money[moneyRating]}
          </Typography>
          <Rating rate={followersRating} title="Followers" />
          <Typography className={classes.text} gutterBottom>
            {resultTexts.followers[followersRating]}
          </Typography>
        </div>
        <div className={classes.right}>
          <img
            className={classes.img}
            src={`${process.env.PUBLIC_URL}/score${fullRating}.png`}
            alt='score'
          />
          <Rating big rate={fullRating} title="Ton score :" />
          <Typography className={classes.mainText} variant="body2" gutterBottom>
            {resultTexts.score[fullRating]}
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
