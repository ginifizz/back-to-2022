const cases = [
  {
    text: {
      main:
        "Les miracles arrivent tous les jours... Vincent vient de gagner une partie de baby !",
      secondary:
        "La vidéo de sa victoire devient virale : le nombre de followers sur Twitter explose !",
    },
    score: {
      money: 0,
      reputation: 0,
      followers: 10,
    },
  },
];

export default cases.map((c) => ({ ...c, type: "babyfoot" }));
