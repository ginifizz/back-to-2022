const cases = [
  {
    text: {
      main:
        "On vient de taguer le bâtiment de la scop !",
      secondary:
        'Heureusement, le tagueur n\'est pas une lumière et a juste écrit "SCOOP COMPLICE". Personne ne sait de qui il parle, tu paies juste les frais de nettoyage.',
    },
    score: {
      money: -5,
      reputation: 0,
      followers: 0,
    },
  },
];

export default cases.map((c) => ({ ...c, type: "tag" }));
