const cases = [
  {
    text: {
      main:
        "Au lieu de partir au Canada, Yann a préféré faire un quatrième enfant et se prend tranquillement trois mois de congé parental !",
      secondary:
        "Il débloque évidemment toute sa participation et plombe la trésorerie de la scop !",
    },
    score: {
      money: -5,
      reputation: 0,
      followers: 0,
    },
  },
];

export default cases.map((c) => ({ ...c, type: "baby" }));
