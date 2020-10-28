import React, { useCallback } from 'react';
import { stepState, GAME_STEPS } from '../Game';
import { useRecoilState } from 'recoil';
import { Container, Box, Typography, Button } from '@material-ui/core';

const StartScreen: React.ComponentType = () => {
    const [, setStep] = useRecoilState(stepState);
    const onStart = useCallback(() => {
      setStep(GAME_STEPS.GAME_SCREEN);
    }, [setStep]);

    return (
      <Container>
        <Typography variant='h1'>START</Typography>
        <Box p={1}>
          <Button variant='contained' color='primary' onClick={onStart}>
            START
          </Button>
        </Box>
      </Container>
    );};

export default StartScreen;
