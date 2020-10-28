const cases = [
  {
    text: {
      main:
        "Tu as perdu la clé de la boîte aux lettres, et les tickets restos sont coincés à l'intérieur...",
      secondary:
        "Une émeute éclate dans les bureaux, et la boîte aux lettres finit explosée par un cocktail molotov. Il va falloir rembourser les dégâts, et tu as perdu pas mal de points de popularité..."
    },
    score: {
      money: -5,
      reputation: -10,
      followers: 0,
    },
  },
];

export default cases.map((c) => ({ ...c, type: "accounting" }));
