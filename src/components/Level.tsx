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
    minWidth: "90px",
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(5),
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    margin: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      minWidth: "0px",
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(4),
      paddingBottom: theme.spacing(0.5),
      paddingTop: theme.spacing(0.5),
    },
    [`${theme.breakpoints.down("sm")} and (orientation: portrait)`]: {
      minWidth: "70px",
    },
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
        color="#fff"
      >
        <img
          alt={title}
          className={classes.image}
          src={`${process.env.PUBLIC_URL}/img/levels_${picture}.svg`}
        />
        <Typography variant="h5">{value}%</Typography>
        <Typography variant="overline">{title}</Typography>
      </Box>
    );}

export default Level;
