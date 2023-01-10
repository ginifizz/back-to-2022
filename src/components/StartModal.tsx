import React from "react";
import {
  DialogProps,
  Box,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import GameModal from './GameModal';

const useStyles = makeStyles((theme) => ({
  image: {
    width: "45%",
    maxHeight: "100%",
    transform: "scale(1.4) rotate(-15deg) translateX(-20px)",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "35%",
      maxHeight: "70vh",
    },
    [theme.breakpoints.down("sm")]: {
      "@media (orientation: portrait)": {
        transform: "scale(1.6) rotate(-15deg) translateY(-20px)",
        marginRight: 0,
      },
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
  intro: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
  content: {
    flexDirection: "row",
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      "@media (orientation: portrait)": {
        flexDirection: "column",
        paddingBottom: theme.spacing(3),
      },
    },
  },
}));

interface StartModalProps extends Omit<DialogProps, "onClose"> {
  onClose?: () => void;
}

const StartModal: React.ComponentType<StartModalProps> = ({onClose, ...props}) => {

  const classes = useStyles();

  return (
    <GameModal maxWidth="md" {...props}>
      <Box
        className={classes.content}
        p={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <img
          src={`${process.env.PUBLIC_URL}/endYear.png`}
          className={classes.image}
          alt="Le trône du gérant"
        />
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
            <Typography variant="h4" color="inherit" className={classes.intro}>
              L'année 2022 vient de se terminer&nbsp;!
            </Typography>
          </Box>
          <Typography variant="body1" color="textPrimary">
            Nostalgique de l'année écoulée&nbsp;? Ou au contraire, déçu par
            cette cuvée 2022 en demi-teinte&nbsp;? On vous propose de remonter
            le temps et de revivre votre année mois par mois&nbsp;! Prenez les
            bonnes décisions, faites les bons choix et tentez d'obtenir un bilan
            de fin d'année positif&nbsp;!
          </Typography>
        </Box>
      </Box>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={onClose}
      >
        Commencer !
      </Button>
    </GameModal>
  );
};

export default StartModal;
