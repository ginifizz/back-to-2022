import React, { useCallback, useEffect, useRef } from "react";
import { Box, makeStyles, Button } from "@material-ui/core";
import Level from "./components/Level";
import { DiceFaceType } from "./components/Dice";
import Curl from "./assets/curl.svg";
import { useRecoilState, atom, selector, DefaultValue } from "recoil";
import ResultModal from "./components/ResultModal";
import StartModal from "./components/StartModal";
import CaseModal from "./components/CaseModal";
import Board from "./components/Board";
import DiceButton from "./components/DiceButton";
import Logo from "./assets/logo2.svg";
import cases from "./data/cases";
import boardCases from "./data/board";

export enum GAME_STEPS {
  START_SCREEN = 0,
  GAME_SCREEN = 1,
  RESULT_SCREEN = 2,
}

export type CASE_CATEGORY = "food" |
  "general" |
  "accounting" |
  "baby" |
  "babyfoot" |
  "beer" |
  "conference" |
  "covid" |
  "duo" |
  "hobbies" |
  "music" |
  "old" |
  "tag" |
  "travel" |
  "vote";

export type CaseType = {
  type: string;
  score: {
    money: number;
    reputation: number;
    followers: number;
  };
  text: {
    main: string;
    secondary: string;
  }
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
};

interface DiceStateType {
  isRolling: boolean;
  face: DiceFaceType;
  canRoll: boolean;
}

const initialDiceState: DiceStateType = {
  isRolling: false,
  face: 6,
  canRoll: true
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

export const positionState = selector<number>({
  key: "position",
  get: ({ get }) => get(gameState).position,
  set: ({ set, get }, newValue) =>
    newValue instanceof DefaultValue
      ? set(gameState, newValue)
      : set(gameState, { ...get(gameState), position: newValue }),
});

const useStyles = makeStyles({
  background: {
    backgroundImage: `url(${Curl}), radial-gradient(#00c4c2, #0383c2);`,
    backgroundSize: '150%, 100%',
    backgroundPosition: 'center',
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

const useHasChanged = (val: any) => {
  const prevVal = usePrevious(val);
  return prevVal !== undefined && prevVal !== val;
};

const usePrevious = <T extends unknown>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const Game: React.ComponentType = () => {
  const [step, setStep] = useRecoilState(stepState);
  const [position] = useRecoilState(positionState);
  const [currentCase, setCurrentCase] = useRecoilState(currentCaseState);
  const hasChangedPosition = useHasChanged(position);

  const onResult = useCallback(() => {
    setStep(GAME_STEPS.RESULT_SCREEN);
  }, [setStep]);
  const classes = useStyles();

  const getCaseContent = (category: CASE_CATEGORY) => {
    const availableCases = cases[category];
    return availableCases[Math.floor(Math.random() * availableCases.length)];
  };

  useEffect(() => {
    if (hasChangedPosition) {
      setCurrentCase(getCaseContent(boardCases[position]));
    }
  }, [setCurrentCase, hasChangedPosition, position]);

  return (
    <div className={classes.background}>
      <Box
        position="absolute"
        paddingTop={1}
        right={0}
        display="flex"
        alignItems="flex-end"
      >
        <Level value="100" title="Réputation" type="star" />
        <Level value="100" title="Participation" type="coin" />
        <Level value="100" title="Followers" type="heart" />
      </Box>
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
      <DiceButton />
      <CaseModal content={currentCase} onClose={() => setCurrentCase(undefined)} />
    </div>
  );
};

export default Game;
