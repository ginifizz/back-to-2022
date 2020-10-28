import React, { useMemo } from 'react';
import { makeStyles, Box } from "@material-ui/core";

interface LevelType {
    value: string;
    type: string;
    title: string;
    imageStep?: 0 | 50 | 75 | 100;
}

const useStyles = makeStyles((theme) => ({
  level: {
    position: "relative",
    zIndex: 2,
    //background: `url(${Jauge})`,
    background: `linear-gradient(to bottom, #05707a, #0e8794)`,
    borderRadius: "30px",
    border: "3px solid #05707a",
    boxShadow: "inset 0px 8px 5px 0px rgba(0,0,0,0.3)",
    //backgroundSize: "100% 100%",
  },
  image: {
    position: "absolute",
    top: "50%",
    left: 0,
    transform: "translate(-20%,-50%);",
    height: "120%",
  },
}));


const Level:React.ComponentType<LevelType> = ({ value, type, title, imageStep }) => {
  const picture = useMemo(() => {
    if (imageStep) return `${type}${imageStep}`;
    const percent = parseInt(value);
    if (percent >= 100) return `${type}100`;
    if (percent > 50) return `${type}75`;
    if (percent <= 0) return `${type}0`;
    return `${type}50`;
  }, [value, type, imageStep]);

  const classes = useStyles();

    return (
      <Box className={classes.level} pl={6} pr={2} py={1} mx={1} color='#fff'>
          <img alt={title} className={classes.image} src={`${process.env.PUBLIC_URL}/img/levels_${picture}.svg`} />
          <Box pt={0.5} lineHeight={0.8} fontSize='h5.fontSize' fontWeight='fontWeightBold'>{value}%</Box>
      </Box>
    );}

export default Level;
