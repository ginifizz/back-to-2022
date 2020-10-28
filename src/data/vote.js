const cases = [
  {
    text: {
      main:
        "Tu as fais une super proposition en AG.",
      secondary:
        "Il te fallait l'unanimité, les débats ont duré 2H et au final, Raoul a voté contre. Voilà qui ne va pas améliorer ta réputation...",
    },
    score: {
      money: 0,
      reputation: -5,
      followers: 0,
    },
  },
];

export default cases.map((c) => ({ ...c, type: "vote" }));
