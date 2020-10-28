const cases = [
  {
    text: {
      main:
        "Antoine a tweeté avec le compte des Tilleuls que le COVID était une fake news.",
      secondary:
        "Gros bad buzz pour la SCOP, qui perd autant de followers que de potentiels clients..."
    },
    score: {
      money: -5,
      reputation: -10,
      followers: -10,
    },
  },
];

export default cases.map((c) => ({ ...c, type: "covid" }));
