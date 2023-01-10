import React from 'react';
import { makeStyles, Box } from "@material-ui/core";
import { scoreState } from '../Game';
import { useRecoilState } from 'recoil';


const useStyles = (angle: number) =>
  makeStyles((theme) => ({
    level: {
      position: "relative",
      zIndex: 2,
      background: `linear-gradient(to bottom, #00020245, #01181b38)`,
      borderRadius: "50%",
      border: "3px solid #00020245",
      boxShadow: "inset 0px 8px 5px 0px rgba(0,0,0,0.3)",
      width: '100%',
      padding: theme.spacing(1),
    },
    image: {
      width: "50%",
    },
    needleImage: {
      width: "35%",
      transform: "translateX(15%)",
    },
    needle: {
      width: "100%",
      height: "100%",
      position: "absolute",
      right: "55%",
      top: 0,
      transformOrigin: "center right",
      transform: `rotate(${angle}deg)`,
      display: "flex",
      justifyContent: "end",
      alignItems: "center",
    },
  }));


const Level:React.ComponentType= () => {
  const [score] = useRecoilState(scoreState);
  const angle = 90*score/120;

  const classes = useStyles(angle)();

    return (
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="start"
        className={classes.level}
        color="#fff"
      >
        <img
          alt={score.toString()}
          className={classes.image}
          src={`${process.env.PUBLIC_URL}/jauge.svg`}
        />
        <div className={classes.needle}>
          <img
            alt=""
            className={classes.needleImage}
            src={`${process.env.PUBLIC_URL}/needle.svg`}
          />
        </div>
      </Box>
    );}

export default Level;
