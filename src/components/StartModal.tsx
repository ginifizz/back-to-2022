import React, { useCallback } from "react";
import { stepState, GAME_STEPS } from "../Game";
import { useRecoilState } from "recoil";
import {
  Dialog,
  DialogProps,
  Box,
  Typography,
  Button,
} from "@material-ui/core";

const StartModal: React.ComponentType<DialogProps> = (props) => {
  const [, setStep] = useRecoilState(stepState);
  const onStart = useCallback(() => {
    setStep(GAME_STEPS.GAME_SCREEN);
  }, [setStep]);

  return (
    <Dialog {...props}>
      <Typography variant="h1">START</Typography>
      <Box p={1}>
        <Button variant="contained" color="primary" onClick={onStart}>
          START
        </Button>
      </Box>
    </Dialog>
  );
};

export default StartModal;
