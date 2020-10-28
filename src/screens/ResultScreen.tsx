import React, { useCallback } from 'react';
import { gameState, stepState, GAME_STEPS } from '../Game';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { Container, Box, Typography, Button } from '@material-ui/core';

const ResultScreen: React.ComponentType = () => {
    const [, setStep] = useRecoilState(stepState);

    const reset = useResetRecoilState(gameState);
    const onReStart = useCallback(() => {
        reset();
        setStep(GAME_STEPS.GAME_SCREEN);
    }, [setStep, reset]);


  return (
    <Container>
      <Typography variant='h1'>RESULT</Typography>
      <Box p={1}>
        <Button variant='contained' color='primary' onClick={reset}>
          HOME
        </Button>
        <Button variant='contained' color='primary' onClick={onReStart}>
          RESTART GAME
        </Button>
      </Box>
    </Container>
  );
};

export default ResultScreen;
