import React, { useCallback } from "react";
import { makeStyles, Button } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { diceState } from '../Game';
import Dice, { getRandomDiceNumber, DiceFaceType } from "./Dice";

const useStyles = (canRoll: boolean) =>
  makeStyles((theme) => ({
    dice: {
      boxSizing: 'content-box',
      position: "relative",
      left: "50%",
      top: "30%",
      width: "80%",
      height: "80%",
      transform: "translate(-50%, -50%) scale(0.8) ",
      [theme.breakpoints.down("md")]: {
        transform: "translate(-50%, -50%) scale(0.65) ",
      },
      [theme.breakpoints.down("sm")]: {
        transform: "translate(-50%, -50%) scale(0.5) ",
      },
      "& *": {
        boxSizing: 'content-box'
      }
    },
    circle: {
      position: "absolute",
      width: "150px",
      height: "150px",
      right: theme.spacing(4),
      bottom: theme.spacing(4),
      borderRadius: "50%",
      background: `linear-gradient(to bottom, #00020245, #01181b38)`,
      border: "3px solid #00020245",
      boxShadow: "inset 0px 8px 5px 0px rgba(0,0,0,0.3)",
      "@media (orientation: portrait)": {
        left: "50%",
        right: "initial",
        transform: "translateX(-50%)",
        bottom: theme.spacing(2),
      },
      [theme.breakpoints.down("md")]: {
        width: "90px",
        height: "90px",
      },
      [theme.breakpoints.down("sm")]: {
        width: "80px",
        height: "80px",
        bottom: theme.spacing(2),
      },
    },
    button: {
      position: "absolute",
      top: "90%",
      left: "50%",
      transition: "all ease 0.3s",
      transform: canRoll
        ? "translate(-50%, -50%)"
        : "translate(-50%, -50%) scale(0)",
      [theme.breakpoints.down("md")]: {
        top: "100%",
        padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
      },
      [theme.breakpoints.down("sm")]: {
        padding: `0 ${theme.spacing(1)}px`,
        top: "50%",
        fontSize: "0.8rem",
      },
    },
  }));

const wait = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

const DiceButton: React.ComponentType<{onDiceEnd: (diceFace:DiceFaceType) => void}> = ({ onDiceEnd }) => {
  const [dice, setDice] = useRecoilState(diceState);
  const classes = useStyles(dice.canRoll)();

    const onRollEnd = useCallback((newDiceFace) => {
      setDice(prevDice => ({
        ...prevDice,
        isRolling: false
      }));
      onDiceEnd(newDiceFace);
    }, [setDice, onDiceEnd]);

    const rollDice = useCallback(async () => {
      setDice(prevDice => ({
        ...prevDice,
        canRoll: false
      }));
      const newDiceFace = getRandomDiceNumber() as DiceFaceType;
      setDice(prevDice => ({
        ...prevDice,
        isRolling: true,
      }));
      let random = getRandomDiceNumber([dice.face, newDiceFace]) as DiceFaceType;
      setDice((prevDice) => ({
        ...prevDice,
        face: random,
      }));
    await wait(300);
    random = getRandomDiceNumber([newDiceFace, random]) as DiceFaceType;
      setDice((prevDice) => ({
        ...prevDice,
        face: random,
      }));
    await wait(300);
      setDice((prevDice) => ({
        ...prevDice,
        face: newDiceFace,
      }));
    await wait(300);
      setDice((prevDice) => ({
        ...prevDice,
        isRolling: false,
      }));
    onRollEnd(newDiceFace);
    }, [setDice, onRollEnd, dice]);

    const launchDice = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      event.stopPropagation();
      if (!dice.canRoll) return;
      rollDice();
    };


  return (
    <div className={classes.circle} onClick={launchDice}>
      <div className={classes.dice}>
        <Dice face={dice.face} />
      </div>
      <Button
        disabled={!dice.canRoll}
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={launchDice}
      >
        Lancer&nbsp;le&nbsp;dé
      </Button>
    </div>
  );
};

export default DiceButton;
