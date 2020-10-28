const cases = [
  {
    text: {
      main:
        "Tu es en vacances dans un endroit paradisiaque !",
      secondary:
        "...mais tu as oublié ta carte de visite Tilleuls. Cécile te passe un savon monumental, ta réputation de gérant en prend un sacré coup !"
    },
    score: {
      money: 0,
      reputation: -5,
      followers: 0,
    },
  },
];

export default cases.map((c) => ({ ...c, type: "travel" }));
