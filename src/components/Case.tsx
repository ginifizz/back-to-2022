import React from "react";
import { lighten, makeStyles, Theme } from "@material-ui/core";
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
      width: (props) =>
        props.type === "duo" || props.type === "general" ? "100%" : "90%",
      height: (props) =>
        props.type === "duo" || props.type === "general" ? "100%" : "90%",
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
    background: props => `radial-gradient(circle, ${lighten(colors[props.type], 0.3)} 46%, ${colors[props.type]} 100%)`,
    /*background: (props) => {
      switch (props.type) {
        case "babyfoot":
          return "radial-gradient(circle, rgba(189,206,91,1) 46%, rgba(160,206,91,1) 100%);";
        case "old":
        case "covid":
        case "music":
          return "radial-gradient(circle, rgba(48,78,120,1) 46%, rgba(59,98,129,1) 100%);";
        case "conference":
        case "tag":
        case "hobbies":
          return "radial-gradient(circle, rgba(78,158,169,1) 46%, rgba(53,129,139,1) 100%);";
        default:
          return "radial-gradient(circle, rgba(92,174,197,1) 46%, rgba(67,154,191,1) 100%);";
      }
    },*/
  },
}));

const Case: React.ComponentType<CaseProps> = ({ type, index, position }) => {
  const classes = useStyles({ type, index, position });

  return <div className={classes.case}><img src={`${process.env.PUBLIC_URL}/cases/${type}.png`} alt={type}/></div>;
};

export default Case;
