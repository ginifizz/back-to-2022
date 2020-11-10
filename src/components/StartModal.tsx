import React, { useCallback } from "react";
import { stepState, GAME_STEPS } from "../Game";
import { useRecoilState } from "recoil";
import {
  DialogProps,
  Box,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Trone from '../assets/trone.svg';
import GameModal from './GameModal';

const useStyles = makeStyles((theme) => ({
  image: {
    width: "40%",
    maxHeight: "100%",
  },
  button: {
    position: "absolute",
    border: "5px solid white",
    boxShadow: "none",
    right: "50px",
    bottom: "-20px",
    "&:hover": {
      boxShadow: "none",
    },
  },
  content: {
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
}));

const StartModal: React.ComponentType<Omit<DialogProps, 'onClose'>> = (props) => {
  const [, setStep] = useRecoilState(stepState);
  const onStart = useCallback(() => {
    setStep(GAME_STEPS.GAME_SCREEN);
  }, [setStep]);

  const classes = useStyles();

  return (
    <GameModal maxWidth="sm" {...props}>
      <Box
        className={classes.content}
        p={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <img src={Trone} className={classes.image} alt="Le trône du gérant" />
        <Box
          pl={2}
          pb={2}
          flex={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          fontSize="body1.fontSize"
          lineHeight={1.2}
          fontWeight="fontWeightBold"
        >
          <Box pb={2}>
            <Typography variant="body1" color="inherit">
              Le mandat de gérant de Kévin arrive à son terme... Et il a décidé
              de raccrocher les gants !
            </Typography>
          </Box>
          <Typography variant="body2" color="textPrimary">
            Tu penses être capable de prendre sa succession ? Alors teste cette
            simulation et découvre si tu as les épaules pour terminer un mandat
            entier sans plomber les finances et la réputation de la SCOP !
          </Typography>
        </Box>
      </Box>
      <Button className={classes.button} variant="contained" color="primary" onClick={onStart}>
        Commencer !
      </Button>
    </GameModal>
  );
};

export default StartModal;
