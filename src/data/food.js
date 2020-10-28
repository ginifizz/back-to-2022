const cases = [
  {
    text: {
      main:
        "En souvenir du bon vieux temps, tu as emmené un groupe de collègues manger une pizza à la Gondole. Résultat : vous avez passé l’après midi à vomir vos tripes dans les toilettes de la SCOP.",
      secondary:
        "Inutile de préciser que la productivité de la journée en a pris un sacré coup... et ça va se sentir sur la participation !",
    },
    score: {
      money: -5,
      reputation: 0,
      followers: 0,
    },
  },
];

export default cases.map(c =>({...c, type: "food"}));
