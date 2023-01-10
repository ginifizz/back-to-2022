import React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import { colors } from '../data/cases';
import { CASE_CATEGORY } from '../Game';

interface CaseProps {
  type: CASE_CATEGORY;
  index: number;
  position: string;
}

const useStyles = makeStyles<Theme, CaseProps>((theme) => ({
  case: {
    boxShadow: theme.shadows[2],
    gridArea: (props) => props.position,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    "& > img": {
      position: "absolute",
      width: "90%",
      height: "90%",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    "&::before": {
      content: '""',
      position: "absolute",
      width: "75%",
      height: "75%",
      backgroundColor: "white",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "50%",
      opacity: 0.4,
    },
    background: props => `radial-gradient(circle, ${colors[props.type][500]} 46%, ${colors[props.type][800]} 100%)`,
  },
}));

const Case: React.ComponentType<CaseProps> = ({ type, index, position }) => {
  const classes = useStyles({ type, index, position });

  return <div className={classes.case}><img src={`${process.env.PUBLIC_URL}/cases/${type}.png`} alt={type}/></div>;
};

export default Case;
