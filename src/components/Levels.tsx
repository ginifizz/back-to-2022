import React from "react";
import {  Box } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { scoreState } from '../Game';
import Level from './Level';


const Levels: React.ComponentType = () => {
  const [score] = useRecoilState(scoreState);

  return (
    <Box
      position="absolute"
      paddingTop={1}
      right={0}
      display="flex"
      alignItems="flex-end"
    >
      <Level
        value={score.reputation.toString()}
        title="Réputation"
        type="star"
      />
      <Level value={score.money.toString()} title="Participation" type="coin" />
      <Level
        value={score.followers.toString()}
        title="Followers"
        type="heart"
      />
    </Box>
  );
};

export default Levels;
