import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core";
import Levels from "./components/Levels";
import { useRecoilState, atom, selector, DefaultValue } from "recoil";
import ResultModal from "./components/ResultModal";
import StartModal from "./components/StartModal";
import CaseModal from "./components/CaseModal";
import Board from "./components/Board";
import boardCases from "./data/board";
import cards from "./data/game.json";

export enum GAME_STEPS {
  START_SCREEN = 0,
  GAME_SCREEN = 1,
  RESULT_SCREEN = 2,
}


export type CASE_CATEGORY =
  | "january"
  | "february"
  | "march"
  | "april"
  | "may"
  | "june"
  | "july"
  | "august"
  | "september"
  | "october"
  | "november"
  | "december";

export type AnswerType = {
  title: string;
  score: number;
  result: string;
};

export type CaseType = {
  type: CASE_CATEGORY;
  mainText: string;
  answers: AnswerType[];
};

type GameStateType = {
  step: GAME_STEPS;
  score: number;
  position: number;
  currentCase?: CaseType;
  cards: CaseType[];
  currentAnswer?: AnswerType;
};

const initialGameState: GameStateType = {
  step: GAME_STEPS.START_SCREEN,
  score: 0,
  position: 0,
  cards: cards as CaseType[],
};

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

export const currentAnswerState = selector<AnswerType | undefined>({
  key: "currentAnswer",
  get: ({ get }) => get(gameState).currentAnswer,
  set: ({ set, get }, newValue) =>
    newValue instanceof DefaultValue
      ? set(gameState, newValue)
      : set(gameState, { ...get(gameState), currentAnswer: newValue }),
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

export const scoreState = selector<number>({
  key: "score",
  get: ({ get }) => get(gameState).score,
  set: ({ set, get }, newValue) =>
    newValue instanceof DefaultValue
      ? set(gameState, newValue)
      : set(gameState, { ...get(gameState), score: newValue }),
});

const useStyles = makeStyles({
  background: {
    backgroundColor: "#0d293f",
    backgroundImage: `url("${process.env.PUBLIC_URL}/bg5.png"), radial-gradient(#4c067c, #120623);`,
    backgroundPosition: "center",
    backgroundSize: "cover, auto, auto",
    backgroundRepeat: "no-repeat, repeat",
    height: "100%",
    overflow: "hidden",
    position: "relative",
  },
  game: {
    "@media (orientation: portrait)": {
      display: "none",
    },
  },
});

const websiteSchema = {
  "@type": "WebSite",
  name: "Back to 2022",
  url: URL,
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Game: React.ComponentType = () => {
  const [step, setStep] = useRecoilState(stepState);
  const [position, setPosition] = useRecoilState(positionState);
  const [currentCase, setCurrentCase] = useRecoilState(currentCaseState);
  const [, setCurrentAnswer] = useRecoilState(currentAnswerState);
  const [cards, setCards] = useRecoilState(cardsState);
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

  const onNextTurn = useCallback(
    async (step) => {
      let currentPosition = position;
      let newPosition = position + step;
      while (currentPosition !== newPosition) {
        currentPosition++;
        if (currentPosition > 11) currentPosition = 0;
        await wait(300);
        setPosition(currentPosition);
        if (currentPosition === 0) {
          onResult();
          return;
        }
      }
      await wait(500);
      setCurrentCase(getCaseContent(boardCases[newPosition]));
    },
    [onResult, setPosition, setCurrentCase, getCaseContent, position]
  );

  const onCardClose = useCallback(() => {
    const { score, currentCase, currentAnswer } = game;
    if (!currentCase) return;
    setGame({
      ...game,
      currentCase: undefined,
      score: currentAnswer ? score + currentAnswer.score : score,
    });
    setCurrentCase(undefined);
    setCurrentAnswer(undefined);
    onNextTurn(1);
  }, [onNextTurn, setCurrentCase, setCurrentAnswer, setGame, game]);

  const startGame = useCallback(() => {
    setStep(GAME_STEPS.GAME_SCREEN);
    onNextTurn(0);
  }, [setStep, onNextTurn]);

  return (
    <div className={classes.background}>
      <Levels />
      <StartModal open={step === GAME_STEPS.START_SCREEN} onClose={startGame} />
      <ResultModal />
      <Board position={position} />
      <CaseModal content={currentCase} onClose={onCardClose} />
    </div>
  );
};

export default Game;
