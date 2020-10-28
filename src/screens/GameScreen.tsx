import React, { useCallback } from 'react';
import { stepState, GAME_STEPS } from '../Game';
import { useRecoilState } from 'recoil';
import { Container, Box, Typography, Button } from '@material-ui/core';

const GameScreen: React.ComponentType = () => {
    const [, setStep] = useRecoilState(stepState);
    const onResult = useCallback(() => {
      setStep(GAME_STEPS.RESULT_SCREEN);
    }, [setStep]);

  return (
    <Container>
      <Typography variant='h1'>GAME</Typography>
      <Box p={1}>
        <Button variant='contained' color='primary' onClick={onResult}>
          FINISH GAME
        </Button>
      </Box>
    </Container>
  );
};

export default GameScreen;
