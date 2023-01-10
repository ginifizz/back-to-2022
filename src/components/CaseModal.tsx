import React, { useState, useEffect, ChangeEvent } from "react";
import {
  DialogProps,
  Box,
  Typography,
  makeStyles,
  Theme,
  darken,
  Grow,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  withStyles,
} from "@material-ui/core";
import Curl from "../assets/curl.svg";
import { CaseType, currentAnswerState } from "../Game";
import { colors, titles } from "../data/cases";
import { TransitionProps } from "@material-ui/core/transitions";
import { cyan, purple } from "@material-ui/core/colors";
import GameModal from "./GameModal";
import { useRecoilState } from "recoil";

interface CaseModalProps extends Omit<DialogProps, "open"> {
  content?: CaseType;
  onClose: () => void;
}

const CyanRadio = withStyles({
  root: {
    color: cyan[400],
    "&$checked": {
      color: cyan[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const useStyles = (color: any) =>
  makeStyles<Theme>((theme) => ({
    left: {
      width: "40%",
      position: "relative",
      transform: "translateX(-10%)",
      zIndex: 2,
      [theme.breakpoints.down("md")]: {
        width: "35%",
      },
    },
    title: {
      position: "absolute",
      zIndex: 2,
      bottom: 0,
      left: "45%",
      transform: "translateX(-50%)",
      minWidth: "80%",
      "&::before": {
        content: '""',
        position: "absolute",
        zIndex: "-1",
        left: 0,
        border: "25px solid;",
        top: "0",
        transform: "translate(-70%, -15px)",
        borderColor: `${purple[800]} ${purple[800]} ${purple[800]} transparent`,
        [theme.breakpoints.down("sm")]: {
          borderWidth: "15px",
          transform: "translate(-70%, -10px)",
        },
      },
      "&::after": {
        content: '""',
        position: "absolute",
        zIndex: "-1",
        right: "0",
        border: "25px solid;",
        top: "0",
        transform: "translate(70%, -15px)",
        borderColor: `${purple[800]} transparent ${purple[800]} ${purple[800]}`,
        [theme.breakpoints.down("sm")]: {
          borderWidth: "15px",
          transform: "translate(70%, -10px)",
        },
      },
    },
    mainText: {
      paddingBottom: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        paddingBottom: theme.spacing(1),
      },
    },
    ribbon: {
      position: "relative",
      zIndex: 2,
      background: purple[700],
      padding: theme.spacing(1),
      minHeight: "50px",
      textAlign: "center",
      color: "white",
      borderRadius: "5px 5px 0 0",
      boxShadow: "0px 10px 15px 0px rgba(0,0,0,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0.5),
        minHeight: "30px",
      },
      "&::before": {
        content: '""',
        borderColor: `transparent ${darken(
          purple[900],
          0.2
        )} transparent transparent`,
        position: "absolute",
        borderStyle: "solid",
        top: "-15px",
        left: 0,
        borderWidth: "15px 15px 0 0",
        [theme.breakpoints.down("sm")]: {
          top: "-10px",
          borderWidth: "10px 10px 0 0",
        },
      },
      "&::after": {
        content: '""',
        borderColor: `transparent transparent ${darken(
          purple[900],
          0.2
        )} transparent`,
        position: "absolute",
        borderStyle: "solid",
        top: "-15px",
        right: 0,
        borderWidth: "0 15px 15px 0",
        [theme.breakpoints.down("sm")]: {
          top: "-10px",
          borderWidth: "0 10px 10px 0",
        },
      },
    },
    circle: {
      width: "100%",
      aspectRatio: "1 / 1",
      top: "50%",
      left: "45%",
      transform: "translate(-50%, -50%)",
      borderRadius: "50%",
      border: `15px solid`,
      borderColor: cyan[200],
      position: "absolute",
      backgroundImage: `url(${Curl})`,
      background: cyan[500],
      zIndex: -1,
      [theme.breakpoints.down("sm")]: {
        borderWidth: "5px",
      },
    },
    image: {
      width: "100%",
      maxHeight: "100%",
      borderRadius: "50%",
    },
    radioLine: {
      "&:first-child": {
        marginBottom: "30px"
      },
    },
  }));

const emptyCase = {
  type: undefined,
  mainText: "",
  answers: [
    { title: "", score: 0, result: "" },
    { title: "", score: 0, result: "" },
  ],
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return (
    <Grow
      ref={ref}
      {...props}
      timeout={{ appear: 10000, enter: 500, exit: 300 }}
    />
  );
});

  const formatText = (text: string) =>
    text &&
    text
      .replace(/\s!/gi, "&nbsp;!")
      .replace(/\s:/gi, "&nbsp;:")
      .replace(/\s\?/gi, "&nbsp;?");

const CaseModal: React.ComponentType<CaseModalProps> = ({
  content = emptyCase,
  onClose,
  ...props
}) => {
  const {
    type,
    mainText,
    answers,
  } = content;

  const [newCurrentAnswer, setNewCurrentAnswer] =
    useRecoilState(currentAnswerState);

  const [open, setOpen] = useState(false);
  const color = type ? colors[type] : cyan;
  const classes = useStyles(color)();

  useEffect(() => {
    if (type) setOpen(true);
  }, [setOpen, type]);

  const handleClose = () => {
    setOpen(false);
  };

const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  setNewCurrentAnswer(answers[parseInt(event.target.value, 10)]);
};

  return (
    <>
      <GameModal
        onClose={newCurrentAnswer ? handleClose : undefined}
        TransitionComponent={Transition}
        {...props}
        keepMounted
        open={open}
        onExited={newCurrentAnswer ? onClose : undefined}
        color={color}
        maxWidth="md"
        flipChildren={
          newCurrentAnswer && (
            <Box
              p={4}
              pb={6}
              display="flex"
              flex={1}
              flexDirection="column"
              alignItems="center"
              height="100%"
              justifyContent="center"
            >
              <Box pb={4}>
                <Typography variant="body1" color="inherit">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: formatText(newCurrentAnswer.result),
                    }}
                  />
                </Typography>
              </Box>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleClose}
              >
                CONTINUER
              </Button>
            </Box>
          )
        }
      >
        <Box
          p={1}
          pb={3}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <div className={classes.left}>
            {type && (
              <>
                <div className={classes.circle} />
                <img
                  src={`${process.env.PUBLIC_URL}/cases/${type}.png`}
                  className={classes.image}
                  alt={type}
                />
                <div className={classes.title}>
                  <div className={classes.ribbon}>
                    <Typography variant="h5" color="inherit">
                      {type && titles[type]}
                    </Typography>
                  </div>
                </div>
              </>
            )}
          </div>
          <Box
            pr={0.5}
            py={0.5}
            flex={1}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            fontSize="body1.fontSize"
            lineHeight={1.2}
            fontWeight="fontWeightBold"
          >
            <Box className={classes.mainText}>
              <Typography variant="body1" color="inherit" component="div">
                <div dangerouslySetInnerHTML={{ __html: formatText(mainText) }} />
              </Typography>
            </Box>
            <Typography
              variant="body1"
              color="textPrimary"
              gutterBottom
              component="div"
            >
              <RadioGroup
                aria-label="answer"
                name="answer"
                onChange={handleChange}
                color="primary"
              >
                {answers.map((answer, index) => (
                  <FormControlLabel
                    value={index}
                    control={<CyanRadio />}
                    label={answer.title}
                    className={classes.radioLine}
                  />
                ))}
              </RadioGroup>
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            className={classes.levels}
          ></Box>
        </Box>
      </GameModal>
      <div className={classes.toolTipLayer} />
    </>
  );
};

export default CaseModal;
