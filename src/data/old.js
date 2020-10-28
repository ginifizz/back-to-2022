const cases = [
  {
    text: {
      main:
        "Un chauffard a foncé dans la porte du 82 rue Winston Churchill !",
      secondary:
        "C'est Mike qui roulait encore sans permis. Tes co-propriétaires découvrent qu'il a travaillé pour la SCOP et te demandent de payer les réparations. ",
    },
    score: {
      money: -5,
      reputation: -5,
      followers: 0,
    },
  },
];

export default cases.map((c) => ({ ...c, type: "old" }));
