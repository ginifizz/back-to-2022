import React, { useCallback } from "react";
import {
  Typography,
  Theme,
  makeStyles,
  Box,
  Button,
  useMediaQuery,
} from "@material-ui/core";
import Levels from "./components/Levels";
import { DiceFaceType } from "./components/Dice";
import Curl from "./assets/curl.svg";
import {
  useRecoilState,
  atom,
  selector,
  DefaultValue,
} from "recoil";
import ResultModal from "./components/ResultModal";
import StartModal from "./components/StartModal";
import CaseModal from "./components/CaseModal";
import Board from "./components/Board";
import DiceButton from "./components/DiceButton";
import boardCases from "./data/board";
import cards from "./data/game.json";

export enum GAME_STEPS {
  START_SCREEN = 0,
  GAME_SCREEN = 1,
  RESULT_SCREEN = 2,
}

export type CASE_CATEGORY =
  | "food"
  | "general"
  | "accounting"
  | "baby"
  | "babyfoot"
  | "beer"
  | "conference"
  | "covid"
  | "duo"
  | "hobbies"
  | "music"
  | "old"
  | "tag"
  | "travel"
  | "santa"
  | "vote";

export type CaseType = {
  type: CASE_CATEGORY;
  money: number;
  reputation: number;
  followers: number;
  mainText: string;
  secondaryText: string;
  ref?: string;
};

type GameStateType = {
  step: GAME_STEPS;
  year: number;
  score: {
    money: number;
    reputation: number;
    followers: number;
  };
  position: number;
  currentCase?: CaseType;
  cards: CaseType[];
};

const initialGameState: GameStateType = {
  step: GAME_STEPS.START_SCREEN,
  year: 1,
  score: {
    money: 100,
    reputation: 100,
    followers: 100,
  },
  position: 0,
  cards: cards as CaseType[],
};

interface DiceStateType {
  isRolling: boolean;
  face: DiceFaceType;
  canRoll: boolean;
}

const initialDiceState: DiceStateType = {
  isRolling: false,
  face: 6,
  canRoll: true,
};

export const diceState = atom({
  key: "diceState",
  default: initialDiceState,
});

export const gameState = atom({
  key: "gameState",
  default: initialGameState,
});

export const stepState = selector<GAME_STEPS>({
  key: "step",
  get: ({ get }) => get(gameState).step,
  set: ({ set, get }, newValue) =>
    newValue instanceof DefaultValue
      ? set(gameState, newValue)
      : set(gameState, { ...get(gameState), step: newValue }),
});

export const currentCaseState = selector<CaseType | undefined>({
  key: "currentCase",
  get: ({ get }) => get(gameState).currentCase,
  set: ({ set, get }, newValue) =>
    newValue instanceof DefaultValue
      ? set(gameState, newValue)
      : set(gameState, { ...get(gameState), currentCase: newValue }),
});

export const cardsState = selector<CaseType[]>({
  key: "cards",
  get: ({ get }) => get(gameState).cards,
  set: ({ set, get }, newValue) =>
    newValue instanceof DefaultValue
      ? set(gameState, newValue)
      : set(gameState, { ...get(gameState), cards: newValue }),
});

export const positionState = selector<number>({
  key: "position",
  get: ({ get }) => get(gameState).position,
  set: ({ set, get }, newValue) =>
    newValue instanceof DefaultValue
      ? set(gameState, newValue)
      : set(gameState, { ...get(gameState), position: newValue }),
});

export const scoreState = selector<{
  money: number;
  followers: number;
  reputation: number;
}>({
  key: "score",
  get: ({ get }) => get(gameState).score,
  set: ({ set, get }, newValue) =>
    newValue instanceof DefaultValue
      ? set(gameState, newValue)
      : set(gameState, { ...get(gameState), score: newValue }),
});

export const yearState = selector<number>({
  key: "year",
  get: ({ get }) => get(gameState).year,
  set: ({ set, get }, newValue) =>
    newValue instanceof DefaultValue
      ? set(gameState, newValue)
      : set(gameState, { ...get(gameState), year: newValue }),
});

const useStyles = makeStyles({
  background: {
    backgroundImage: `url(${Curl}), radial-gradient(#00c4c2, #0383c2);`,
    backgroundSize: "150%, 100%",
    backgroundPosition: "center",
    height: "100%",
    overflow: "hidden",
    position: "relative",
    "@media (orientation: portrait)": {
      backgroundSize: "200%, 200%",
    },
  },
  game: {
    "@media (orientation: portrait)": {
      display: "none",
    },
  },
  button: {
    "@media (orientation: landscape)": {
      display: "none",
    },
  },
});

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Game: React.ComponentType = () => {
  const [step, setStep] = useRecoilState(stepState);
  const [position, setPosition] = useRecoilState(positionState);
  const [currentCase, setCurrentCase] = useRecoilState(currentCaseState);
  const [year, setYear] = useRecoilState(yearState);
  const [cards, setCards] = useRecoilState(cardsState);
  const [, setDice] = useRecoilState(diceState);
  const [game, setGame] = useRecoilState(gameState);

  const onResult = useCallback(() => {
    setStep(GAME_STEPS.RESULT_SCREEN);
  }, [setStep]);
  const classes = useStyles();

  const getCaseContent = useCallback(
    (category: CASE_CATEGORY) => {
      const availableCases = cards.filter((card) => card.type === category);
      const caseContent =
        availableCases[Math.floor(Math.random() * availableCases.length)];
      setCards(cards.filter((card) => card !== caseContent));
      return caseContent;
    },
    [cards, setCards]
  );

  const onDiceEnd = useCallback(
    async (diceFace) => {
      let currentPosition = position;
      let newPosition = position + diceFace;
      if (newPosition > 15) newPosition = Math.abs(15 - newPosition + 1);
      while (currentPosition !== newPosition) {
        currentPosition++;
        if (currentPosition > 15) currentPosition = 0;
        await wait(300);
        setPosition(currentPosition);
        if (currentPosition === 0) {
          const newYear = year + 1;
          setYear(newYear);
          await wait(300);
          if (newYear > 4) {
            onResult();
            return;
          }
        }
      }
      await wait(500);
      setCurrentCase(getCaseContent(boardCases[newPosition]));
    },
    [
      onResult,
      setYear,
      year,
      setPosition,
      setCurrentCase,
      getCaseContent,
      position,
    ]
  );

  const onCardClose = useCallback(() => {
    const { score, currentCase } = game;
    if (!currentCase) return;
    setGame({
      ...game,
      currentCase: undefined,
      score: {
        money: score.money + currentCase?.money,
        followers: score.followers + currentCase?.followers,
        reputation: score.reputation + currentCase?.reputation,
      },
    });
    setCurrentCase(undefined);
    setDice((prevDice) => ({
      ...prevDice,
      canRoll: true,
    }));
  }, [setDice, setCurrentCase, setGame, game]);

  // eslint-disable-next-line no-restricted-globals
  const isPortrait = useMediaQuery(
    (theme: Theme) =>
      `${theme.breakpoints.down("xs")} and (orientation:portrait)`
  );

  const setLandscape = async () => {
    await document.body.requestFullscreen();
    // eslint-disable-next-line no-restricted-globals
    await screen.orientation.lock("landscape");
  };

  /*
    const reset = useResetRecoilState(gameState);

  const testGame = useCallback(() => {
    let position = 0;
    let year = 1;
    let score = {
      reputation: 100,
      followers: 100,
      money: 100,
    };
    while (year < 5) {
      const dice = getRandomDiceNumber();
      position += dice;
      if (position > 15) {
        year++;
        if (year > 4) {
          reset();
          return score;
        }
        position = position - 15 - 1;
      }
      const content = getCaseContent(boardCases[position]);
      score.reputation += content.reputation;
      score.followers += content.followers;
      score.money += content.money;
    }
    reset();
    return score;
  }, [reset, getCaseContent]);

  const launchGames = useCallback(
    (count) => {
      const scores: any[] = [];
      for (let i = 0; i < count; i++) {
        scores.push(testGame());
      }
      console.log("REPUTATION");
      console.log(
        "<30",
        scores.filter((score) => score.reputation <= 30).length
      );
      console.log(
        "<60",
        scores.filter(
          (score) => score.reputation > 30 && score.reputation <= 60
        ).length
      );
      console.log(
        "<90",
        scores.filter(
          (score) => score.reputation > 60 && score.reputation <= 90
        ).length
      );
      console.log(
        "<120",
        scores.filter(
          (score) => score.reputation > 90 && score.reputation <= 120
        ).length
      );
      console.log(
        ">120",
        scores.filter((score) => score.reputation > 120).length
      );
      console.log("MONEY");
      console.log("<30", scores.filter((score) => score.money <= 30).length);
      console.log(
        "<60",
        scores.filter((score) => score.money > 30 && score.money <= 60).length
      );
      console.log(
        "<90",
        scores.filter((score) => score.money > 60 && score.money <= 90).length
      );
      console.log(
        "<120",
        scores.filter((score) => score.money > 90 && score.money <= 120).length
      );
      console.log(">120", scores.filter((score) => score.money > 120).length);
      console.log("FOLLOWERS");
 console.log("<60", scores.filter((score) => score.followers <= 60).length);
 console.log(
   "<90",
   scores.filter((score) => score.followers > 60 && score.followers <= 90)
     .length
 );
 console.log(
   "<120",
   scores.filter((score) => score.followers > 90 && score.followers <= 120)
     .length
 );
  console.log(
    "<150",
    scores.filter((score) => score.followers > 120 && score.followers <= 150)
      .length
  );
 console.log(">150", scores.filter((score) => score.followers > 150).length);
    },
    [testGame]
  );

  useEffect(() => {
    launchGames(1000);
  }, [launchGames]);
  */

  return (
    <div className={classes.background}>
      {!isPortrait && (
        <>
          <Levels />
          <StartModal open={step === GAME_STEPS.START_SCREEN} />
          <ResultModal />
          <Board position={position} />
          <DiceButton onDiceEnd={onDiceEnd} />
          <CaseModal content={currentCase} onClose={onCardClose} />
        </>
      )}
      {isPortrait && (
        <Box
          p={2}
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h3">OUPS...</Typography>
          <Typography align="center" variant="body2" gutterBottom>
            Ce jeu est optimisé pour un format paysage, désolée&nbsp;!
          </Typography>
          <br />
          <Button onClick={setLandscape}>Afficher le jeu</Button>
        </Box>
      )}
    </div>
  );
};

export default Game;
