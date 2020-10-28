import React from "react";
import { makeStyles, Theme } from "@material-ui/core";

export type DiceFaceType = 1 | 2 | 3 | 4 | 5 | 6;
interface DiceType {
  face: DiceFaceType;
}

const getResultTransform = (result: DiceFaceType) => {
  switch (result) {
    case 1:
      return "translate(-75%, -50%) rotateX(360deg) rotateY(720deg) rotateZ(360deg)";
    case 2:
      return "translate(-75%, -35%) rotateX(450deg) rotateY(720deg) rotateZ(360deg)";
    case 3:
      return "translate(-50%, -50%) rotateX(360deg) rotateY(630deg) rotateZ(360deg)";
    case 4:
      return "translate(-50%, -50%) rotateX(360deg) rotateY(810deg) rotateZ(360deg)";
    case 5:
      return "translate(-75%, -35%) rotateX(270deg) rotateY(720deg) rotateZ(360deg)";
    case 6:
      return "translate(-25%, -50%) rotateX(360deg) rotateY(900deg) rotateZ(360deg)";
    default:
      return "rotateX(360deg) rotateY(720deg) rotateZ(360deg)";
  }
};

const useStyles = makeStyles<Theme, DiceFaceType>((theme) => ({
  dice: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr",
    height: "6rem",
    listStyleType: "none",
    transformStyle: "preserve-3d",
    width: "6rem",
    transition: "transform 0.3s ease-out",
    transform: (face) => getResultTransform(face),
    position: 'absolute',
    left: '50%',
    top: '50%',
  },
  face: {
    backgroundColor: "#fefefe",
    boxShadow:
      "inset -0.35rem 0.35rem 0.75rem rgba(0, 0, 0, 0.3), inset 0.5rem -0.25rem 0.5rem rgba(0, 0, 0, 0.15)",
    display: "grid",
    gridColumn: 1,
    gridRow: 1,
    gridTemplateAreas: `"one two three"
    "four five six"
    "seven eight nine"`,
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(3, 1fr)",
    height: "100%",
    padding: "1rem",
    width: "100%",
    "& .dot": {
      alignSelf: "center",
      backgroundColor: "#676767",
      borderRadius: "50%",
      boxShadow: "inset -0.15rem 0.15rem 0.25rem rgba(0, 0, 0, 0.5)",
      display: "block",
      height: "1.25rem",
      justifySelf: "center",
      width: "1.25rem",
    },
    "&[data-side='1']": {
      transform: "rotate3d(0, 0, 0, 90deg) translateZ(4rem)",
      "& .dot:nth-of-type(1)": {
        gridArea: "five",
      },
    },
    "&[data-side='2']": {
      transform: "rotate3d(-1, 0, 0, 90deg) translateZ(4rem)",
      "& .dot:nth-of-type(1)": {
        gridArea: "one",
      },
      "& .dot:nth-of-type(2)": {
        gridArea: "nine",
      },
    },
    "&[data-side='3']": {
      transform: "rotate3d(0, 1, 0, 90deg) translateZ(4rem)",
      "& .dot:nth-of-type(1)": {
        gridArea: "one",
      },
      "& .dot:nth-of-type(2)": {
        gridArea: "five",
      },
      "& .dot:nth-of-type(3)": {
        gridArea: "nine",
      },
    },
    "&[data-side='4']": {
      transform: "rotate3d(0, -1, 0, 90deg) translateZ(4rem)",
      "& .dot:nth-of-type(1)": {
        gridArea: "one",
      },
      "& .dot:nth-of-type(2)": {
        gridArea: "three",
      },
      "& .dot:nth-of-type(3)": {
        gridArea: "seven",
      },
      "& .dot:nth-of-type(4)": {
        gridArea: "nine",
      },
    },
    "&[data-side='5']": {
      transform: "rotate3d(1, 0, 0, 90deg) translateZ(4rem)",
      "& .dot:nth-of-type(1)": {
        gridArea: "one",
      },
      "& .dot:nth-of-type(2)": {
        gridArea: "three",
      },
      "& .dot:nth-of-type(3)": {
        gridArea: "five",
      },
      "& .dot:nth-of-type(4)": {
        gridArea: "seven",
      },
      "& .dot:nth-of-type(5)": {
        gridArea: "nine",
      },
    },
    "&[data-side='6']": {
      transform: "rotate3d(1, 0, 0, 180deg) translateZ(4rem)",
      "& .dot:nth-of-type(1)": {
        gridArea: "one",
      },
      "& .dot:nth-of-type(2)": {
        gridArea: "three",
      },
      "& .dot:nth-of-type(3)": {
        gridArea: "four",
      },
      "& .dot:nth-of-type(4)": {
        gridArea: "six",
      },
      "& .dot:nth-of-type(5)": {
        gridArea: "seven",
      },
      "& .dot:nth-of-type(6)": {
        gridArea: "nine",
      },
    },
  },
}));

const getRandomNumber = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const diceValues = [
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  5,
  5,
  6,
];

export const getRandomDiceNumber = (forbiddenFaces?: number[]) => {
  const values = diceValues.filter(
    (n) => !forbiddenFaces || !forbiddenFaces.includes(n));
  return values[getRandomNumber(0, values.length - 1)];
}

const Dice: React.ComponentType<DiceType> = ({
  face
}) => {
  const classes = useStyles(face);

  return (
    <ol className={classes.dice}>
      <li className={classes.face} data-side="1">
        <span className="dot" />
      </li>
      <li className={classes.face} data-side="2">
        <span className="dot" />
        <span className="dot" />
      </li>
      <li className={classes.face} data-side="3">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </li>
      <li className={classes.face} data-side="4">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </li>
      <li className={classes.face} data-side="5">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </li>
      <li className={classes.face} data-side="6">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </li>
    </ol>
  );
};

export default Dice;
