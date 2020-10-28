const cases = [
  {
    text: {
      main:
        "Un workshop API Platform est prévu ce soir, mais à cause du COVID, il passe en full distanciel...",
      secondary:
        "Heureusement Jewome est là pour faire les réglages son et vidéo. Le workshop cartonne !"
    },
    score: {
      money: 0,
      reputation: 5,
      followers: 0,
    },
  },
];

export default cases.map((c) => ({ ...c, type: "conference" }));
