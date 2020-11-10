import React from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";
import CalendarBack from '../assets/calendar.svg';
import { yearState } from "../Game";
import { useRecoilState } from "recoil";
import Paper from '../assets/paper.svg';

const usePaperStyles = (past: boolean) =>
  makeStyles((theme) => ({
    paper: {
      position: "absolute",
      left: 0,
      bottom: "6%",
      width: "96%",
      height: "62%",
      background: `left 0 bottom 0 no-repeat url(${Paper})`,
      transition: "all ease 1s",
      opacity: past ? 0 : 1,
      transform: !past
        ? "none"
        : "translate(100px, 100px) rotate(-45deg);",
    },
  }));

const PaperYear: React.ComponentType<{ year: number }> = ({ year }) => {
  const [gameYear] = useRecoilState(yearState);
  const classes = usePaperStyles(gameYear > year)();

  return (
    <Box display='flex' alignItems='center' justifyContent='center' className={classes.paper}>
      <Typography variant="h3">{year}</Typography>
    </Box>
  );};

const useStyles = makeStyles((theme) => ({
  calendar: {
    position: "fixed",
    left: '50%',
    top: '10px',
    width: '100px',
    transform: 'translateX(-50%)'
  },
  title: {
    color: 'white',
    position: 'absolute',
    textTransform: 'uppercase',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    top: '24%'
  }
}));

const Calendar: React.ComponentType = () => {
  const classes = useStyles();

  return (
    <Box className={classes.calendar}>
      <img src={CalendarBack} alt="Calendrier" />
      <Typography className={classes.title} variant='body2'>Année</Typography>
      <PaperYear year={4} />
      <PaperYear year={3} />
      <PaperYear year={2} />
      <PaperYear year={1} />
    </Box>
  );
};

export default Calendar;
