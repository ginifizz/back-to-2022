import React from "react";
import {
  Dialog,
  DialogProps,
  Box,
  Typography,
  makeStyles,
  Theme,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Level from './Level';

interface CaseModalProps extends DialogProps {
  type: string;
}

const useStyles = makeStyles<Theme>((theme) => ({
  dialog: {
    minWidth: "500px",
    minHeight: "400px",
    display: "grid",
    gridTemplateColumns: "2fr 3fr",
    overflowY: "auto",
    borderRadius: theme.shape.borderRadius,
    background: "radial-gradient(circle, #5dbfce 46%, rgba(0,131,194,1) 100%)",
    boxShadow: "inset -3px -10px 1px 2px #0c73a5",
  },
  left: {
    color: "white",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  right: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
  },
  image: {
    marginBottom: theme.spacing(2),
    width: "80%",
    height: 0,
    paddingBottom: "80%",
    background: "white",
    borderRadius: "50%",
    position: "relative",
    "& > img": {
      width: "120%",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
  close: {
    position: "absolute",
    right: -theme.spacing(1),
    top: -theme.spacing(1),
    background: "radial-gradient(circle, #5dbfce 0%, rgba(0,131,194,1) 100%)",
    color: "#fff",
    border: "5px solid white",
    overflow: "hidden",
    backgroundSize: "150%",
    backgroundPosition: "center",
    transition: "all ease 0.2s",
    "&:hover": {
      backgroundSize: "80%",
    },
  },
}));


const CaseModal: React.ComponentType<CaseModalProps> = ({ type, ...props }) => {
  const classes = useStyles();

  return (
    <Dialog {...props}>
      <Box className={classes.dialog} display="flex" flexDirection="row">
        <IconButton
          className={classes.close}
        >
          <CloseIcon />
        </IconButton>
        <div className={classes.left}>
          <div className={classes.image}>
            <img
              src={`${process.env.PUBLIC_URL}/cases/${type}.png`}
              alt={type}
            />
          </div>
          <Typography variant="h5" color="inherit">
            #food
          </Typography>
        </div>
        <div className={classes.right}>
          <Box
            flex={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              fontSize="body1.fontSize"
              lineHeight={1.2}
              textAlign="center"
              pb={2}
            >
              En souvenir du bon vieux temps, tu as emmené un groupe de
              collègues manger une pizza à la Gondole. Ce qui devait arriver
              arriva : vous avez passé l’après midi à vomir vos tripes dans les
              deux toilettes de la SCOP.
            </Box>
            <Box
              fontSize="body2.fontSize"
              fontWeight="fontWeightBold"
              textAlign="center"
              lineHeight={1.2}
            >
              Inutile de préciser que la productivité de la journée en a pris un
              sacré coup... et ça va se sentir sur la participation !
            </Box>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box p={0.5}>
              <Level type="coin" value="+5" title="" imageStep={100} />
            </Box>
            <Box p={0.5}>
              <Level type="heart" value="-5" title="" imageStep={100} />
            </Box>
          </Box>
        </div>
      </Box>
    </Dialog>
  );
};

export default CaseModal;
