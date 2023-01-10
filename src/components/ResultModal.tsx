import React, { useCallback, useState, useEffect, useMemo } from "react";
import {
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
import facebookIcon from "../assets/facebook.svg";
import twitterIcon from "../assets/twitter.svg";
import linkedinIcon from "../assets/linkedin.svg";
import mastodonIcon from "../assets/mastodon.svg";
import GameModal from "./GameModal";
import { resultTexts } from "../data/results";
import Level from "./Level";
import { cyan } from "@material-ui/core/colors";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";


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
    [theme.breakpoints.down("sm")]: {
      padding: "20px",
      "@media (orientation: portrait)": {
        padding: "10px",
        paddingBottom: 0,
      },
    },
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
      "@media (orientation: portrait)": {
        width: "75px",
        height: "150px",
        transform: "rotate(90deg)",
        marginTop: "-20px",
        marginBottom: "-20px"
      },
    },
  },
  mainText: {
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(3),
    fontSize: "2rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.3rem",
    },
  },
  intro: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
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
      "@media (orientation: portrait)": {
        width: "150px",
        height: "150px",
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
  shareButton: {
    width: "50px",
    padding: theme.spacing(1),
    borderRadius: "50%",
    transition: "all ease 0.3s",
    "&:hover": {
      background: cyan[500],
      transform: "scale(0.9)",
    },
    "@media (max-width: 800px)": {
      width: "40px",
    },
  },
  socialText: {
    margin: "0 10px",
    textTransform: "uppercase",
  },
  mastodonContainer: {
    width: "50px",
    height: "50px",
    overflow: "hidden",
    position: "relative",
    cursor: "pointer",
    borderRadius: "50%",
    "&:hover img": {
      background: cyan[500],
      transform: "scale(0.9)",
    },
    "@media (max-width: 800px)": {
      width: "40px",
      height: "40px",
    },
  },
  mastodonButton: {
    position: "absolute",
    transform: "scale(2)",
    zIndex: 10,
    left: "0",
    top: "0",
    opacity: "0",
  },
}));

const ResultModal: React.ComponentType<Omit<DialogProps, "open">> = (props) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useRecoilState(stepState);
  const [score] = useRecoilState(scoreState);

  const resetGame = useResetRecoilState(gameState);

  const rating = useMemo(() => {
    if (score > 80) return 4;
    else if (score > 30) return 3;
    else if (score > -30) return 2;
    else if (score > -80) return 1;
    return 0;
  }, [score]);

  const reset = useCallback(() => {
    resetGame();
  }, [resetGame]);

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

  const formatText = (text: string) =>
    text &&
    text
      .replace(/\s!/gi, "&nbsp;!")
      .replace(/\s:/gi, "&nbsp;:")
      .replace(/\s\?/gi, "&nbsp;?");

  const URL = "https://back-to-2022.vercel.app";

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
            component="p"
            align="center"
            gutterBottom
          >
            <div
              dangerouslySetInnerHTML={{
                __html: formatText(resultTexts.score[rating].result),
              }}
            />
          </Typography>
          <Typography
            className={classes.socialText}
            variant="overline"
            align="center"
            gutterBottom
          >
            Vous avez aimé ce voyage dans le temps&nbsp;?<br/>Partagez-le à vos amis&nbsp;!
          </Typography>
          <Box display="flex" flexDirection="row" alignItems="center">
            <FacebookShareButton
              url={URL}
              quote="Nostalgique de l'année écoulée ? Les-Tilleuls.coop vous propose de remonter
            le temps et de revivre votre année mois par mois ! Prenez les
            bonnes décisions, faites les bons choix et tentez d'obtenir un bilan
            de fin d'année positif."
            >
              <img
                className={classes.shareButton}
                src={facebookIcon}
                alt="Partager sur Facebook"
              />
            </FacebookShareButton>
            <TwitterShareButton
              url={URL}
              title="Nostalgique de l'année écoulée ? @coopTilleuls vous propose de remonter
            le temps et de revivre votre année mois par mois ! Prenez les
            bonnes décisions, faites les bons choix et tentez d'obtenir un bilan
            de fin d'année positif."
            >
              <img
                className={classes.shareButton}
                src={twitterIcon}
                alt="Partager sur Twitter"
              />
            </TwitterShareButton>
            <LinkedinShareButton
              url={URL}
              title="Back to 2022"
              summary="Nostalgique de l'année écoulée ? Les-Tilleuls.coop vous propose de remonter
            le temps et de revivre votre année mois par mois ! Prenez les
            bonnes décisions, faites les bons choix et tentez d'obtenir un bilan
            de fin d'année positif."
            >
              <img
                className={classes.shareButton}
                src={linkedinIcon}
                alt="Partager sur Linkedin"
              />
            </LinkedinShareButton>
            <div className={classes.mastodonContainer}>
              <div
                className={classes.mastodonButton}
                dangerouslySetInnerHTML={{
                  __html: `<share-on-mastodon share_title="Back to 2022"
                   share_description="Nostalgique de l'année écoulée ? Les-Tilleuls.coop vous propose de remonter
            le temps et de revivre votre année mois par mois ! Prenez les
            bonnes décisions, faites les bons choix et tentez d'obtenir un bilan
            de fin d'année positif." modal_heading="Veuillez renseigner votre instance" modal_text="Comme Mastodon possède de nombreux serveurs, nous devons savoir sur laquelle vous souhaitez envoyer votre message." share_text="Partager"
</share-on-mastodon>`,
                }}
              />
              <img
                className={classes.shareButton}
                src={mastodonIcon}
                alt="Partager sur Mastodon"
              />
            </div>
          </Box>
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
