import React, { useMemo } from 'react';
import { makeStyles, Box, Typography } from "@material-ui/core";

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
    background: `linear-gradient(to bottom, #00020245, #01181b38)`,
    borderRadius: "30px",
    border: "3px solid #00020245",
    boxShadow: "inset 0px 8px 5px 0px rgba(0,0,0,0.3)",
    minWidth: '90px'
  },
  image: {
    position: "absolute",
    top: "50%",
    left: 0,
    transform: "translate(-30%,-50%);",
    height: "110%",
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
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        className={classes.level}
        pl={5}
        pr={2}
        py={0.5}
        mx={2}
        color="#fff"
      >
        <img
          alt={title}
          className={classes.image}
          src={`${process.env.PUBLIC_URL}/img/levels_${picture}.svg`}
        />
        <Box
          lineHeight={0.8}
          fontSize="h5.fontSize"
          fontWeight="fontWeightBold"
        >
          {value}%
        </Box>
        <Typography variant="overline">{title}</Typography>
      </Box>
    );}

export default Level;
