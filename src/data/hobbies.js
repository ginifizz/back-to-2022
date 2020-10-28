const cases = [
  {
    text: {
      main:
        "La nuit dernière, Jéjé a sorti le téléscope et a découvert un truc de fou !",
      secondary:
        "C'est une avancée majeure dans le monde de l'astronomie, on parle de Jéjé dans le monde entier... et de la SCOP par la même occasion !"
    },
    score: {
      money: 0,
      reputation: 20,
      followers: 10,
    },
  },
];

export default cases.map((c) => ({ ...c, type: "hobbies" }));
