import React, { useCallback } from "react";
import { Box, makeStyles, Button } from "@material-ui/core";
import Levels from "./components/Levels";
import { DiceFaceType } from "./components/Dice";
import Curl from "./assets/curl.svg";
import { useRecoilState, atom, selector, DefaultValue } from "recoil";
import ResultModal from "./components/ResultModal";
import StartModal from "./components/StartModal";
import CaseModal from "./components/CaseModal";
import Board from "./components/Board";
import DiceButton from "./components/DiceButton";
import Logo from "./assets/logo2.svg";
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
  asset?: string;
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

export const scoreState = selector<{money: number, followers: number, reputation: number}>({
  key: "score",
  get: ({ get }) => get(gameState).score,
  set: ({ set, get }, newValue) =>
    newValue instanceof DefaultValue
      ? set(gameState, newValue)
      : set(gameState, { ...get(gameState), score: newValue }),
});

const useStyles = makeStyles({
  background: {
    backgroundImage: `url(${Curl}), radial-gradient(#00c4c2, #0383c2);`,
    backgroundSize: "150%, 100%",
    backgroundPosition: "center",
    height: "100vh",
    overflow: "hidden",
  },
  logo: {
    position: "absolute",
    top: "20px",
    left: "50px",
    width: "350px",
  },
});

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Game: React.ComponentType = () => {
  const [step, setStep] = useRecoilState(stepState);
  const [position, setPosition] = useRecoilState(positionState);
  const [currentCase, setCurrentCase] = useRecoilState(currentCaseState);
  const [cards, setCards] = useRecoilState(cardsState);
  const [dice, setDice] = useRecoilState(diceState);
  const [game, setGame] = useRecoilState(gameState);

  const onResult = useCallback(() => {
    setStep(GAME_STEPS.RESULT_SCREEN);
  }, [setStep]);
  const classes = useStyles();

  const getCaseContent = useCallback((category: CASE_CATEGORY) => {
    const availableCases = cards.filter((card) => card.type === category);
    const caseContent =
      availableCases[Math.floor(Math.random() * availableCases.length)];
    setCards(cards.filter(card => card !== caseContent));
    console.log(cards.length);
    return caseContent;
  }, [cards, setCards]);

  const onDiceEnd = useCallback(async (diceFace) => {
    let currentPosition = position;
    let newPosition = position + diceFace;
    if (newPosition > 15) newPosition = Math.abs(15 - newPosition + 1);
    while (currentPosition !== newPosition) {
      currentPosition++;
      if (currentPosition > 15) currentPosition = 0;
      await wait(300);
      setPosition(currentPosition);
    }
    await wait(300);
    // setPosition(newPosition);
    setCurrentCase(getCaseContent(boardCases[newPosition]));
  }, [setPosition, setCurrentCase, getCaseContent, position]);

  const onCardClose = useCallback(() => {
    const { score, currentCase } = game;
    if (!currentCase) return;
    setGame({
      ...game,
      currentCase: undefined,
      score: {
        money: score.money + currentCase?.money,
        followers: score.followers + currentCase?.followers,
        reputation: score.reputation + currentCase?.reputation
      }
    })
    setCurrentCase(undefined);
    setDice(prevDice => ({
      ...prevDice,
      canRoll: true
    }));
  }, [setDice, setCurrentCase, setGame, game]);

  return (
    <div className={classes.background}>
      <Levels />
      <img src={Logo} alt="logo" className={classes.logo} />
      <StartModal open={step === GAME_STEPS.START_SCREEN} />
      <ResultModal open={step === GAME_STEPS.RESULT_SCREEN} />
      {step === GAME_STEPS.GAME_SCREEN && (
        <Box position="absolute" bottom={0} left={0}>
          <Button variant="contained" color="primary" onClick={onResult}>
            FINISH GAME
          </Button>
        </Box>
      )}
      <Board position={position} />
      <DiceButton onDiceEnd={onDiceEnd} />
      <CaseModal content={currentCase} onClose={onCardClose} />
    </div>
  );
};

export default Game;
