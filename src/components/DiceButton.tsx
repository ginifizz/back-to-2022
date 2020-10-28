import React, { useCallback } from "react";
import { makeStyles, Button } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { diceState, positionState } from '../Game';
import Dice, { getRandomDiceNumber, DiceFaceType } from "./Dice";

const useStyles = makeStyles((theme) => ({
  dice: {
    position: "relative",
    left: "50%",
    top: "30%",
    width: "80%",
    height: "80%",
    transform: "translate(-50%, -50%) scale(0.8) ",
  },
  circle: {
    position: "absolute",
    width: "150px",
    height: "150px",
    background:
      "radial-gradient(circle, rgba(0,211,194,1) 46%, rgba(0,131,194,1) 100%)",
    right: theme.spacing(4),
    bottom: theme.spacing(4),
    borderRadius: "50%",
    border: "5px solid #078bc2",
    boxShadow: "inset 0px 0px 30px 0px rgba(0,0,0,0.5);",
  },
  button: {
    position: "absolute",
    top: "90%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const wait = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

const DiceButton: React.ComponentType = () => {
  const classes = useStyles();
  const [dice, setDice] = useRecoilState(diceState);
    const [position, setPosition] = useRecoilState(positionState);

    const onRollEnd = useCallback((newDiceFace) => {
      setDice(prevDice => ({
        ...prevDice,
        isRolling: false
      }));
      let newPosition = position + newDiceFace;
      if (newPosition > 15) newPosition = Math.abs(15 - newPosition + 1);
      setPosition(newPosition);
    }, [setPosition, position, setDice]);

    const rollDice = useCallback(async () => {
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


  return (
    <div className={classes.circle}>
      <div className={classes.dice}>
        <Dice face={dice.face} />
      </div>
      <Button className={classes.button} variant="contained" color="primary" onClick={rollDice}>
        Lancer le dé
      </Button>
    </div>
  );
};

export default DiceButton;
