import React, { useCallback } from "react";
import { gameState, stepState, GAME_STEPS } from "../Game";
import { useRecoilState, useResetRecoilState } from "recoil";
import { Dialog, DialogProps, Box, Typography, Button } from "@material-ui/core";

const ResultModal: React.ComponentType<DialogProps> = (props) => {
  const [, setStep] = useRecoilState(stepState);

  const reset = useResetRecoilState(gameState);
  const onReStart = useCallback(() => {
    reset();
    setStep(GAME_STEPS.GAME_SCREEN);
  }, [setStep, reset]);


  return (
    <Dialog {...props}>
      <Typography variant="h1">RESULT</Typography>
      <Box p={1}>
        <Button variant="contained" color="primary" onClick={reset}>
          HOME
        </Button>
        <Button variant="contained" color="primary" onClick={onReStart}>
          RESTART GAME
        </Button>
      </Box>
    </Dialog>
  );
};

export default ResultModal;
