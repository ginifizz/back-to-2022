import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { scoreState, yearState } from "../Game";
import Logo from "../assets/logo2.svg";
import Level from "./Level";
import CalendarBack from "../assets/calendar.svg";
import Paper from "../assets/paper.svg";

const usePaperStyles = (gameYear: number, year: number) =>
  makeStyles((theme) => ({
    paper: {
      position: "absolute",
      left: 0,
      bottom: "6%",
      width: "96%",
      height: "62%",
      background: `left 0 bottom 0 no-repeat url(${Paper})`,
      transition: "all ease 1s",
      opacity: (year !== gameYear) ? 0 : 1,
      transform: (year >= gameYear) ? "none" : "translate(100px, 100px) rotate(-45deg);",
    },
  }));

const PaperYear: React.ComponentType<{ year: number }> = ({ year }) => {
  const [gameYear] = useRecoilState(yearState);
  const classes = usePaperStyles(gameYear, year)();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      className={classes.paper}
    >
      <Typography variant="h2">{year}</Typography>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  menu: {
    paddingRight: theme.spacing(6),
    position: "absolute",
    width: "100%",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    left: 0,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "space-between",
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  levels: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    [`${theme.breakpoints.down("xs")} and (orientation: portrait)`]: {
      flexDirection: "column",
    },
  },
  level: {
    margin: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(1),
    },
  },
  logo: {
    position: "absolute",
    top: "20px",
    left: "20px",
    width: "300px",
    [theme.breakpoints.down("md")]: {
      width: "200px",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  calendar: {
    width: "90px",
    minWidth: "90px",
    position: "relative",
    marginLeft: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      width: "80px",
      minWidth: "80px",
      marginLeft: 0,
    },
    "&::before": {
      content: '""',
      width: "120%",
      height: "150%",
      borderRadius: "32px",
      position: "absolute",
      background: `linear-gradient(to bottom, #00020245, #01181b38)`,
      border: "5px solid #00020245",
      boxShadow: "inset 0px 8px 5px 0px rgba(0,0,0,0.3)",
      zIndex: "0",
      transform: "translate(-50%, -50%)",
      left: "50%",
      top: "30%",
    },
  },
  calendarTitle: {
    color: "white",
    position: "absolute",
    textTransform: "uppercase",
    left: "50%",
    transform: "translate(-50%, -50%) scale(0.8)",
    top: "24%",
  },
}));

const Levels: React.ComponentType = () => {
  const [score] = useRecoilState(scoreState);

  const classes = useStyles();

  return (
    <Box className={classes.menu}>
      <img src={Logo} alt="logo" className={classes.logo} />
      <Box className={classes.levels}>
        <div className={classes.level}>
          <Level
            value={score.reputation.toString()}
            title="Réputation"
            type="star"
          />
        </div>
        <div className={classes.level}>
          <Level
            value={score.money.toString()}
            title="Participation"
            type="coin"
          />
        </div>
        <div className={classes.level}>
          <Level
            value={score.followers.toString()}
            title="Followers"
            type="heart"
          />
        </div>
      </Box>
      <Box className={classes.calendar}>
        <img src={CalendarBack} alt="Calendrier" />
        <Typography className={classes.calendarTitle} variant="body2">
          Année
        </Typography>
        <PaperYear year={4} />
        <PaperYear year={3} />
        <PaperYear year={2} />
        <PaperYear year={1} />
      </Box>
    </Box>
  );
};

export default Levels;
