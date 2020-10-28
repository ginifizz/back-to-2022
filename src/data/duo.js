const cases = [
  {
    text: {
      main:
        "Vincent et Pierre",
      secondary:
        "Pas d'idée..."
    },
    score: {
      money: 0,
      reputation: 0,
      followers: 0,
    },
  },
];

export default cases.map((c) => ({ ...c, type: "duo" }));
