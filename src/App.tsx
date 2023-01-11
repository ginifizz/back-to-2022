import React from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import Game from "./Game";

const App: React.ComponentType = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <Game />
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
};

export default App;
