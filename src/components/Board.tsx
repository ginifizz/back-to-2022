import React from "react";
import { makeStyles } from "@material-ui/core";
import Case from "./Case";
import Pawn from "./Pawn";
import boardCases from "../data/board";

interface LevelType {
  value: number;
  type: string;
  title: string;
}

const positions: string[] = [
  "5 / 5 / 6 / 6",
  "5 / 4 / 6 / 5",
  "5 / 3 / 6 / 4",
  "5 / 2 / 6 / 3",
  "5 / 1 / 6 / 2",
  "4 / 1 / 5 / 2",
  "3 / 1 / 4 / 2",
  "2 / 1 / 3 / 2",
  "1 / 1 / 2 / 2",
  " 1 / 2 / 2 / 3",
  " 1 / 3 / 2 / 4",
  " 1 / 4 / 2 / 5",
  " 1 / 5 / 2 / 6",
  " 2 / 5 / 3 / 6",
  " 3 / 5 / 4 / 6",
  " 4 / 5 / 5 / 6",
];

const useStyles = makeStyles((theme) => ({
  perspective: {
    backgroundColor: "#012531",
    border: "5px solid #fff",
    padding: theme.spacing(2),
    position: "absolute",
    transform:
      "translate(-50%, -50%) rotateX(60deg) rotateY(0deg) rotateZ(-45deg)",
    transformStyle: "preserve-3d",
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridTemplateRows: "repeat(5, 1fr)",
    gap: `${theme.spacing(2)}px`,
    width: "90vh",
    height: "90vh",
    left: "50%",
    top: "60%",
  },
}));

const Board: React.ComponentType<{position: number}> = ({ position }) => {
  const classes = useStyles();

  return (
    <div className={classes.perspective}>
      {boardCases.map((boardCase, index) => (
        <Case type={boardCase} position={positions[index]} index={index} />
      ))}
      <Pawn position={positions[position]} />
    </div>
  );
};

export default Board;
