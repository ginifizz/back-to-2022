const cases = [
  {
    text: {
      main:
        'Pour mettre un peu d\'ambiance à la SCOP, Olivier et Quentin se lancent dans une version endiablée de "Yayannou',
      secondary:
        "Quelqu'un les filme, et la chanson devient un tube viral."
    },
    score: {
      money: 0,
      reputation: 0,
      followers: 10,
    },
  },
];

export default cases.map((c) => ({ ...c, type: "music" }));
