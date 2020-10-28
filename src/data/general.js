const cases = [
  {
    text: {
      main:
        "Quelqu'un a utilisé les toilettes femmes pendant la pause midi et a laissé la lunette relevée... Jade est furax et met un message incendiaire sur General !",
      secondary: "C'est parti pour ",
    },
    score: {
      money: -5,
      reputation: 0,
      followers: 0,
    },
  },
];

export default cases.map((c) => ({ ...c, type: "general" }));
