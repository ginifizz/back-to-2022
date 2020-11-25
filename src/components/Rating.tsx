import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import Star from "../assets/star.svg";
import StarEmpty from "../assets/star_empty.svg";

const useStyles = (big: boolean) =>
  makeStyles((theme) => ({
    img: {
      maxHeight: big ? "30px" : "20px",
      padding: "0 5px",
    },
  }));

const Rating: React.ComponentType<{
  rate: number;
  title: string;
  big?: boolean;
}> = ({ rate, title, big }) => {
  const getStarImg = (index: number) => (index > rate - 1 ? Star : StarEmpty);
  const classes = useStyles(!!big)();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      margin="0 auto"
    >
      <Box px={1}>
        <Typography variant={big ? "h4" : "h6"}>{title}</Typography>
      </Box>
      <img className={classes.img} src={getStarImg(0)} alt="star" />
      <img className={classes.img} src={getStarImg(1)} alt="star" />
      <img className={classes.img} src={getStarImg(2)} alt="star" />
      <img className={classes.img} src={getStarImg(3)} alt="star" />
    </Box>
  );
};

export default Rating;
