interface scoreType {
  reputation: number;
  money: number;
  followers: number;
}

export const resultTexts = {
  reputation: [
    "En 4 ans, tu as totalement ruiné l'image de marque de la SCOP qui est passée d'une réputation d'experts à celle d'une bande d'ours mal léchés finalement pas si experts que ça...",
    "Beaucoup de clients perdus, des avis négatifs à foison trouvés sur Google... Le moins qu'on puisse dire, c'est que ton mandat n'a vraiment pas fait du bien à la réputation de la SCOP !",
    "On ne va pas se mentir : la SCOP n'a pas vraiment brillé sous ton mandat, mais elle n'a pas non plus perdu de points de popularité et a conservé sa place d'acteur solide de notre secteur.",
    "Sous ton mandat, nous avons accumulé de bons feedbacks de nos clients, nos conférences ont été suivies avec assiduité... Grâce à toi, la SCOP est maintenant l'UNE des ESN les plus reconnues du marché, bravo !",
    "A la fin de ton mandat, la SCOP n'a jamais autant rayonné, et sa renommée n'est plus à faire. Grâce à toi, la boîte pro de Mathilde croule sous les demandes de missions, notre réputation d'experts est au top !",
  ],
  followers: [
    "Tu n'as pas gagné de followers pendant ton mandat, tu en as même perdu... La communication de ton entreprise, ce n'est vraiment pas ton fort : nous te recommandons de supprimer ton compte...",
    "Pendant ton mandat, tu as gagné 13 followers... Tu as du mal à capter l'attention de ta communauté, tu ne maîtrises pas les bonnes pratiques de la communication en ligne, nos followers n'avaient même pas remarqué que nous avions changé de gérant !",
    "Bon, tu as des followers et quelques RT de tes messages mais tu ne fais pas non plus le buzz comme Kévin le faisait. N'est pas CM qui veut ! Poursuis tes efforts pour devenir LE compte à suivre, tu es sur la bonne voie !",
    "Tu as tracé ta route sur le chemin des followers : avec une centaine de nouveaux abonnés par mois, tu gères avec brio ta communication !",
    "Chacun de tes messages apporte une quantité astronomique de likes et d'abonnés, tu as même plus de followers que Dan Abramov et Evan You réunis. Chapeau bas !",
  ],
  money: [
    "Aïe aïe aïe, non seulement tu n'as pas fait de bénéfices mais tu as perdu beaucoup d'argent ces dernières années au point de devoir revendre le local lillois... Bon courage pour remonter la pente, c'est très mal engagé !",
    "La répartition des bénéfices s'élève cette année à 4€ par personne. Autant dire que l'âge d'or où nous touchions des milliers d'€ est révolue. Les coopérateurs sont déçus de ta gestion financière et le font savoir, personne ne comprend comment tu as fait pour gérer aussi mal tes dépenses.",
    "Ce mandat n'a pas été simple financièrement... Tu as sauvé les meubles, mais la participation n'a fait que baisser au cours de ces quatre années, et ne peux plus vraiment être utilisée comme un argument lors des recrutements.",
    "Les coopérateurs sont ravis, nous avons autant de participation que les années précédentes. Gérant·e et maître·sse des finances : qui dit mieux ?",
    "La santé financière de la SCOP est au plus haut et la participation a atteint un niveau record, tu as géré d'une main de maître les finances ! Il paraît même qu'Olivier prend des notes pour pouvoir s'inspirer de ton travail.",
  ],
  score: [
    "Vu l'état désastreux dans lequel tu as laissé la SCOP après ces quatre années, un seul conseil : ne postule pas pour un autre mandat. Visiblement la gérance n'est pas ton fort...",
    "Pas grand chose de positif à dire sur ton passage en tant que gérant, il vaut mieux pour tout le monde qu'on oublie ton mandat : ce n'est pas un échec complet, ça n'a juste pas marché... N'est pas Kévin qui veut !",
    "Quatres années moyennes qui ont entraîné un bilan… moyen. Ni négatif, ni vraiment positif, ton mandat ne restera pas dans les annales de la SCOP, et tes collaborateurs ne se souviennent sans doute déjà même plus que tu as été gérant !",
    "Tu n'as pas à rougir de ces quatre années, ton bilan est plus que positif. Il ne te manque vraiment pas grand chose pour devenir le meilleur gérant !",
    "Tu n'as pas juste été un digne successeur de Kévin : tu l'as surpassé. Plus personne n'imagine la scop gerée par quelqu'un d'autre que toi, ta réélection est assurée !",
  ],
};

export const getReputationRating = (reputation: number) => {
  if (reputation < 40) return 0;
  if (reputation < 65) return 1;
  if (reputation < 90) return 2;
  if (reputation < 120) return 3;
  return 4;
}

export const getMoneyRating = (money: number) => {
  if (money < 40) return 0;
  if (money < 65) return 1;
  if (money < 85) return 2;
  if (money < 110) return 3;
  return 4;
};

export const getFollowersRating = (followers: number) => {
  if (followers < 65) return 0;
  if (followers < 95) return 1;
  if (followers < 120) return 2;
  if (followers < 140) return 3;
  return 4;
};
