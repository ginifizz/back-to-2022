import React from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import Game from "./Game";
import { Helmet } from "react-helmet";

const App: React.ComponentType = () => {
  const websiteSchema = {
    "@type": "WebSite",
    name: "Back to 2022",
    url: URL,
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <Helmet>
            <link rel="icon" href="/favicon.ico" />
            <link
              rel="icon"
              href={`${process.env.PUBLIC_URL}/icon.svg`}
              type="image/svg+xml"
            />
            <link
              rel="apple-touch-icon"
              href={`${process.env.PUBLIC_URL}/apple-touche-icon.png`}
            />
            <link
              rel="manifest"
              href={`${process.env.PUBLIC_URL}/site.webmanifest`}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(websiteSchema),
              }}
            />
          </Helmet>
          <Game />
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
};

export default App;
