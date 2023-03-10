import React from "react";
import { makeStyles } from "@material-ui/core";
import Case from "./Case";
import Pawn from "./Pawn";
import boardCases from "../data/board";

const positions: string[] = [
  "4 / 4 / 5 / 5",
  "4 / 3 / 5 / 4",
  "4 / 2 / 5 / 3",
  "4 / 1 / 5 / 2",
  "3 / 1 / 4 / 2",
  "2 / 1 / 3 / 2",
  "1 / 1 / 2 / 2",
  " 1 / 2 / 2 / 3",
  " 1 / 3 / 2 / 4",
  "1 / 4 / 2 / 5",
  " 2 / 4 / 3 / 5",
  " 3 / 4 / 4 / 5",
];

const useStyles = (position: number) =>
  makeStyles((theme) => ({
    perspective: {
      backgroundColor: "#012531",
      border: "5px solid #2e3892",
      padding: "1%",
      position: "absolute",
      transform:
        "translate(-50%, -50%) rotateX(60deg) rotateY(0deg) rotateZ(-45deg)",
      transformStyle: "preserve-3d",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridTemplateRows: "repeat(4, 1fr)",
      gap: `2%`,
      width: "90vh",
      height: "90vh",
      left: "50%",
      top: "60%",
      "@media (orientation: portrait)": {
        width: "60vh",
        height: "60vh",
      },
    },
  }));

const Board: React.ComponentType<{position: number}> = ({ position }) => {
  const classes = useStyles(position)();

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
