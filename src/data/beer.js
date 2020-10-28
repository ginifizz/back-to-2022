const cases = [
  {
    text: {
      main:
        "Gros afterwork hier soir, ça faisait un bail !",
      secondary:
        "Mais Mathieu a un peu (beaucoup) trop bu et a fini la soirée en garde à vue après avoir mordu un flic... Il ne te reste plus qu'à payer sa caution !"
    },
    score: {
      money: -5,
      reputation: 0,
      followers: 0,
    },
  },
];

export default cases.map((c) => ({ ...c, type: "beer" }));
