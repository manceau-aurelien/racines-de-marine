/* =========================================================================
   Les racines de Marine — données de l'arbre
   -------------------------------------------------------------------------
   Pour modifier le site, il suffit en général d'éditer CE fichier.
   - PERSONNES : chaque fiche de l'arbre. `photo` peut pointer vers une vraie
     photo de famille (ex. "images/famille/marie-rose.jpg").
   - certitude : "atteste" (trouvé dans l'état civil récent),
                 "probable" (fortement suggéré),
                 "hypothese" (piste à vérifier dans les archives),
                 "inconnu" (case à découvrir), "vivant".
   ========================================================================= */

const BRANCHES = {
  espagne:  { nom: "Espagne & Oranie",     couleur: "#b5532f" },
  poitou:   { nom: "Poitou",               couleur: "#3f6f8f" },
  tarn:     { nom: "Montagne Noire",       couleur: "#5d7a3a" },
  amerique: { nom: "Amérique (Hayden)",    couleur: "#8a3b5c" },
  toulouse: { nom: "Toulouse",             couleur: "#c28a2c" },
};

/* --- L'arbre « papillon » : Marine à gauche, Hayden à droite.
   Numérotation Sosa : 1 = la personne, 2 = son père, 3 = sa mère,
   2n = père de n, 2n+1 = mère de n. --------------------------------- */
const ARBRE = {
  marine: {
    1:  "marine",
    2:  "christian",       3:  "maman",
    4:  "marc",            5:  "marie-rose",
    6:  "xavier",          7:  "elise",
    8:  "pere-marc",       9:  "mere-marc",
    10: "dominique",       11: "trinitaria",
    12: "joseph-bolon",    13: "epouse-joseph",
    14: "pere-elise",      15: "mere-elise",
    16: "olivier-henri",   17: "melanie-mangou",
    20: "parents-valverde", 22: "parents-barselo",
  },
  hayden: {
    1:  "hayden",
    2:  "mike",            3:  "terri",
    4:  "pere-mike",       5:  "mere-mike",
    6:  "brunon",          7:  "dorothy",
    12: "parents-strozyk",
    14: "oscar",           15: "viola",
    28: "william-wheeler", 29: "elizabeth-cordelia",
  },
};

const PERSONNES = {
  /* ---------------------------------------------------------------- */
  marine: {
    nom: "Marine Manceau", court: "Marine", branche: "toulouse", certitude: "vivant",
    role: "C'est toi",
    bio: `Fille de Christian Manceau, sœur d'Aurélien. Toutes ces routes — les montagnes d'Alicante, les plaines du Poitou, le port d'Oran, les prés de la Montagne Noire — aboutissent ici. Et, de l'autre côté de l'Atlantique, celles de la famille de Hayden.`,
  },
  christian: {
    nom: "Christian Manceau", court: "Christian", branche: "toulouse", certitude: "vivant",
    role: "Ton père",
    bio: `L'un des trois fils de Marc Rémi Manceau et de Marie-Rose Agathe Valverde (avec Thierry et Patrick). Né au temps des garnisons de son père, il grandit à Toulouse après 1962. Il y épouse la fille de Xavier Bolon et d'Élise Delprat : c'est là que la branche oranaise et la branche tarnaise se rejoignent.`,
  },
  maman: {
    nom: "Ta mère, née Bolon", court: "Ta mère", branche: "toulouse", certitude: "vivant",
    role: "Ta mère",
    bio: `Fille de Xavier Bolon et d'Élise Delprat, de Labruguière (Tarn). Par elle, tu descends de familles installées au pied de la Montagne Noire depuis le règne de Louis XIV.`,
  },
  marc: {
    nom: "Marc Rémi Manceau", court: "Marc Rémi", branche: "poitou", certitude: "atteste",
    role: "Ton grand-père paternel",
    ne: "21 juillet 1929 · Saint-Martin-de-Bernegoue (Deux-Sèvres)",
    mort: "20 avril 2001 · Toulouse",
    bio: `Né dans un village de la plaine niortaise où l'on ne compta que <b>trois naissances</b> en 1929. Fils de paysans poitevins, il choisit l'armée (classe 1949). Affecté en Oranie au début des années 1950, il y rencontre Marie-Rose Valverde. Trois fils naissent au fil des garnisons : Christian, Thierry et Patrick. Après 1962, la famille s'installe pour de bon à Toulouse.`,
    img: "smdb-eglise",
  },
  "marie-rose": {
    nom: "Marie-Rose Agathe Valverde", court: "Marie-Rose", branche: "espagne", certitude: "atteste",
    role: "Ta grand-mère paternelle",
    ne: "5 février 1931 · Oran (Algérie)",
    mort: "26 novembre 2004 · Toulouse",
    bio: `Fille de Dominique Isidore Valverde et de Trinitaria Nieves Barselo. Son deuxième prénom n'a rien d'un hasard : elle est née un <b>5 février, jour de la Sainte-Agathe</b> — exactement comme sa mère, née le jour de Notre-Dame-des-Neiges, avait reçu le prénom Nieves. Elle épouse un jeune militaire venu du Poitou, Marc Manceau, et quitte Oran pour Toulouse en 1962.`,
    img: "zurbaran-agathe",
  },
  xavier: {
    nom: "Xavier Paul Henri Marie Bolon", court: "Xavier", branche: "tarn", certitude: "atteste",
    role: "Ton grand-père maternel",
    ne: "14 août 1929 · Labruguière (Tarn)",
    mort: "20 novembre 2019 · Castres (90 ans)",
    bio: `Toute une vie dans un rayon de quinze kilomètres, au pied de la Montagne Noire. Il porte les trois prénoms de son père (Paul Henri Marie), comme le voulait la tradition de la famille. Frère d'Yves (1927–2017) et de Françoise (1931–1982). Il survit six ans à son épouse Élise.`,
    img: "labruguiere-1889",
  },
  elise: {
    nom: "Élise Rosalie Delprat", court: "Élise", branche: "tarn", certitude: "atteste",
    role: "Ta grand-mère maternelle",
    ne: "6 avril 1939 · Dourgne (Tarn)",
    mort: "28 novembre 2013 · Labruguière",
    bio: `Née à Dourgne, village d'ardoise et de drap au pied de la Montagne Noire, à la veille de la Seconde Guerre mondiale. Son nom, <i>del prat</i>, veut dire « du pré » en occitan. Dourgne est l'un des tout premiers foyers de ce nom en France : sa famille y vivait déjà sous Louis XIV. Son mariage avec Xavier Bolon la conduit à Labruguière, à douze kilomètres de là.`,
    img: "dourgne",
  },
  "pere-marc": {
    nom: "Le père de Marc Rémi", court: "Père de Marc", branche: "poitou", certitude: "hypothese",
    role: "Ton arrière-grand-père",
    bio: `Pas encore identifié avec certitude. <b>Piste sérieuse :</b> Henri Joseph Marcel Manceau (11 mars 1906 – 8 novembre 1991), né à Saint-Martin-de-Bernegoue, conscrit de la classe 1926. <br><br>🔎 <b>Pour en avoir le cœur net :</b> l'acte de naissance de Marc (mairie de Saint-Martin-de-Bernegoue, 21/07/1929) ou son acte de décès (Toulouse, 2001) donnent les noms de ses parents.`,
  },
  "mere-marc": {
    nom: "La mère de Marc Rémi", court: "?", branche: "poitou", certitude: "inconnu",
    role: "Ton arrière-grand-mère",
    bio: `À découvrir ! Son nom figure sur l'acte de naissance de Marc Rémi Manceau (Saint-Martin-de-Bernegoue, 1929).`,
  },
  dominique: {
    nom: "Dominique Isidore Valverde", court: "Dominique Isidore", branche: "espagne", certitude: "probable",
    role: "Ton arrière-grand-père",
    ne: "1898 · Oued Imbert (Aïn El Berd, près de Sidi Bel Abbès)",
    mort: "avant 1974",
    bio: `En espagnol, il se serait appelé <i>Domingo Isidro</i> : l'état civil français a traduit ses prénoms. Saint Isidore le Laboureur est le patron des paysans espagnols — un clin d'œil aux origines agricoles de sa famille, venue d'Andalousie (Albuñol, Pulpí). Lui quitte la terre : il devient <b>caissier-comptable au Crédit Foncier</b> à Oran. Mobilisé avec la classe 1918, il épouse Trinitaria le 9 juin 1928.`,
    img: "albunol-1751",
  },
  trinitaria: {
    nom: "Trinitaria Nieves Barselo", court: "Trinitaria Nieves", branche: "espagne", certitude: "atteste",
    role: "Ton arrière-grand-mère",
    ne: "5 août 1894 · Oran (Algérie)",
    mort: "après 1974 · Toulouse",
    bio: `Née le jour de <b>Notre-Dame-des-Neiges</b> — d'où son deuxième prénom, Nieves. Française dès la naissance grâce à la loi de 1889, élève de l'école de la République (sa signature, élégante et assurée, en témoigne). Mariée à presque 34 ans, en 1928, à Dominique Isidore Valverde. En 1962, à 68 ans, elle quitte Oran pour Toulouse ; en 1974, veuve, elle vit à Toulouse, près de sa fille Marie-Rose et de ses petits-fils.`,
    img: "masolino-neige",
  },
  "joseph-bolon": {
    nom: "Joseph Paul Henri Marie Bolon", court: "Joseph", branche: "tarn", certitude: "probable",
    role: "Ton arrière-grand-père",
    ne: "1er décembre 1895 · Labruguière",
    mort: "18 janvier 1975 · Labruguière",
    bio: `Il a dix-huit ans quand éclate la Grande Guerre. Classe 1915, il est mobilisé ; son nom est associé à <b>Cramant, en Champagne, en 1918</b>, l'année de la seconde bataille de la Marne. Rescapé, il rentre à Labruguière, s'y marie et y élève ses enfants. Il transmet à son fils Xavier ses trois prénoms, dans le même ordre.`,
    img: "cramant",
  },
  "epouse-joseph": {
    nom: "L'épouse de Joseph Bolon", court: "?", branche: "tarn", certitude: "inconnu",
    role: "Ton arrière-grand-mère",
    bio: `À découvrir ! Son nom figure sur l'acte de naissance de Xavier (Labruguière, 14/08/1929) et sur l'acte de décès de Joseph (Labruguière, 1975, acte n° 1).`,
  },
  "pere-elise": {
    nom: "Le père d'Élise", court: "Père d'Élise", branche: "tarn", certitude: "hypothese",
    role: "Ton arrière-grand-père",
    bio: `Un Delprat de Dourgne. Les registres de 1939–1943 citent <b>Alphonse Victor</b> et <b>Achille Pierre Paul Delprat</b> : l'un d'eux est peut-être ton arrière-grand-père. 🔎 L'acte de naissance d'Élise (Dourgne, 6 avril 1939) tranchera.`,
  },
  "mere-elise": {
    nom: "La mère d'Élise", court: "?", branche: "tarn", certitude: "inconnu",
    role: "Ton arrière-grand-mère",
    bio: `À découvrir dans l'acte de naissance d'Élise (mairie de Dourgne, 1939).`,
  },
  "olivier-henri": {
    nom: "Olivier Henri Manceau", court: "Olivier Henri", branche: "poitou", certitude: "hypothese",
    role: "Ton arrière-arrière-grand-père (piste)",
    bio: `Cultivateur à Saint-Martin-de-Bernegoue au tournant du XXe siècle, père d'Henri Joseph Marcel Manceau (1906). Si Henri est bien le père de Marc, Olivier Henri et son épouse Mélanie Marie Mangou sont tes arrière-arrière-grands-parents.`,
  },
  "melanie-mangou": {
    nom: "Mélanie Marie Mangou", court: "Mélanie", branche: "poitou", certitude: "hypothese",
    role: "Ton arrière-arrière-grand-mère (piste)",
    bio: `Issue d'une vieille famille paysanne du pays niortais. Le nom Mangou est rare (Poitou, Berry) : il viendrait d'un ancien fief.`,
  },
  "parents-valverde": {
    nom: "Les parents de Dominique Isidore", court: "?", branche: "espagne", certitude: "inconnu",
    role: "Tes arrière-arrière-grands-parents",
    bio: `Des Valverde d'Oued Imbert, venus d'Andalousie (Albuñol ou Pulpí). 🔎 Leurs noms sont dans l'acte de naissance de Dominique Isidore (Oued Imbert, 1898), en ligne sur le site des Archives nationales d'outre-mer (ANOM).`,
  },
  "parents-barselo": {
    nom: "Les parents de Trinitaria", court: "?", branche: "espagne", certitude: "inconnu",
    role: "Tes arrière-arrière-grands-parents",
    bio: `Des Barselo d'Oran, famille venue de la région d'Alicante dès les années 1850. 🔎 L'acte de naissance de Trinitaria (Oran, 5 août 1894) est consultable en ligne sur le site des ANOM : il donnera leurs noms, âges et villages d'origine.`,
  },

  /* ------------------------------- Hayden ------------------------- */
  hayden: {
    nom: "Hayden Kelly", court: "Hayden", branche: "amerique", certitude: "vivant",
    role: "Ton compagnon",
    bio: `Né dans l'Arkansas, fils de Mike Kelly et de Terri Strozyk. Petit-fils de Dorothy « Dottie » Callicott, dont la famille a traversé l'Amérique d'est en ouest pendant deux siècles.`,
  },
  mike: {
    nom: "Michael « Mike » Kelly", court: "Mike", branche: "amerique", certitude: "vivant",
    role: "Le père de Hayden",
    bio: `Il vit à Little Rock (Arkansas) avec Terri. Parents de Hayden et de Morgan. La branche Kelly reste à explorer — un nom qui sonne irlandais…`,
  },
  terri: {
    nom: "Teresa « Terri » Marie Strozyk", court: "Terri", branche: "amerique", certitude: "vivant",
    role: "La mère de Hayden",
    bio: `L'une des quatre enfants de Dorothy Callicott et du diacre Brunon Strozyk, avec John, Paul et Shara. Grandie à Marche, le village polonais de North Little Rock.`,
  },
  "pere-mike": { nom: "Le père de Mike", court: "?", branche: "amerique", certitude: "inconnu", role: "Grand-père de Hayden", bio: `La lignée Kelly : à explorer ensemble !` },
  "mere-mike": { nom: "La mère de Mike", court: "?", branche: "amerique", certitude: "inconnu", role: "Grand-mère de Hayden", bio: `À découvrir.` },
  brunon: {
    nom: "Brunon John Strozyk", court: "Brunon", branche: "amerique", certitude: "probable",
    role: "Le grand-père de Hayden",
    bio: `Issu d'une famille d'origine polonaise installée à Marche, l'un des villages fondés par des immigrants polonais en Arkansas. Il épouse Dorothy le 6 mai 1961 et devient <b>diacre permanent</b> de la paroisse Immaculate Heart of Mary.`,
    img: "marche-eglise",
  },
  dorothy: {
    nom: "Dorothy « Dottie » Bernice Callicott", court: "Dorothy", branche: "amerique", certitude: "probable",
    role: "La grand-mère de Hayden",
    ne: "16 octobre 1928 · Arden (Arkansas)",
    mort: "18 janvier 2020 · North Little Rock (91 ans)",
    bio: `Grandie à la campagne, dans le sud-ouest de l'Arkansas, avec ses sœurs Marie et Alma. Mariée à 32 ans à Brunon Strozyk, elle se convertit au catholicisme et devient l'âme de la paroisse de Marche. On se souvient d'elle pour son <b>sourire constant et son regard pétillant</b>. Quatre enfants : John, Paul, Terri — la mère de Hayden — et Shara.`,
    img: "marche-eglise",
  },
  "parents-strozyk": { nom: "Les parents de Brunon", court: "?", branche: "amerique", certitude: "inconnu", role: "Arrière-grands-parents de Hayden", bio: `Une famille polonaise de Marche. D'où venaient-ils en Pologne ? Une belle enquête à mener.` },
  oscar: {
    nom: "Oscar William G. Callicott", court: "Oscar", branche: "amerique", certitude: "probable",
    role: "L'arrière-grand-père de Hayden",
    bio: `Fermier de Foreman, dans le comté de Little River, tout au sud-ouest de l'Arkansas, près du Texas et de l'Oklahoma. L'un des au moins neuf enfants de William Wheeler Callicott.`,
    img: "foreman-1908",
  },
  viola: { nom: "Viola Callicott", court: "Viola", branche: "amerique", certitude: "probable", role: "L'arrière-grand-mère de Hayden", bio: `Épouse d'Oscar, mère de Dorothy, Marie et Alma. Son nom de jeune fille reste à trouver (recensements de 1930 et 1940).` },
  "william-wheeler": {
    nom: "William Wheeler Callicott", court: "William Wheeler", branche: "amerique", certitude: "probable",
    role: "Arrière-arrière-grand-père de Hayden",
    ne: "vers 1869",
    bio: `Fermier entre Foreman, Wallace et Jackson Township. Avec Elizabeth Cordelia, il élève au moins neuf enfants, dont Wallace (1891–1960), mobilisé en 1918 — la même année où Joseph Bolon se battait en Champagne.`,
    img: "arkansas-coton",
  },
  "elizabeth-cordelia": { nom: "Elizabeth Cordelia Cartwright", court: "Elizabeth Cordelia", branche: "amerique", certitude: "probable", role: "Arrière-arrière-grand-mère de Hayden", bio: `Mère d'une grande fratrie : Rosa Mae, Wallace, Oscar, Beulah Edith, Edna Isbell, Fredrick McKinley…` },
};

/* --- Lieux et routes de la carte --------------------------------------- */
const LIEUX = {
  benitaia:   { nom: "Benitaia (Vall de Gallinera)", ll: [38.83, -0.25],  branche: "espagne", img: "gallinera",  txt: "Berceau ancien des Barceló, dans une vallée de terrasses de la province d'Alicante, dès le XVIIe siècle." },
  alicante:   { nom: "Alicante",                     ll: [38.345, -0.48], branche: "espagne", img: "alicante-rada", txt: "Port de départ des Levantins. Oran n'est qu'à une dizaine d'heures de traversée." },
  albunol:    { nom: "Albuñol (Grenade)",            ll: [36.79, -3.20],  branche: "espagne", img: "albunol-rambla", txt: "Village andalou d'où venaient de nombreux Valverde d'Oued Imbert." },
  pulpi:      { nom: "Pulpí (Almería)",              ll: [37.40, -1.75],  branche: "espagne", txt: "Autre foyer d'origine des Valverde, terre aride d'Andalousie orientale." },
  oran:       { nom: "Oran",                         ll: [35.70, -0.63],  branche: "espagne", img: "oran-port", txt: "Trinitaria y naît en 1894, Marie-Rose en 1931. Marc Manceau y rencontre Marie-Rose dans les années 1950." },
  oued:       { nom: "Oued Imbert (Aïn El Berd)",    ll: [35.36, -0.52],  branche: "espagne", txt: "Village agricole près de Sidi Bel Abbès. Naissance de Dominique Isidore Valverde en 1898." },
  lemans:     { nom: "Le Mans (le Maine)",           ll: [48.00, 0.20],   branche: "poitou", txt: "« Manceau » voulait dire « habitant du Maine ». Un ancêtre lointain venait sans doute de là, au Moyen Âge." },
  smdb:       { nom: "Saint-Martin-de-Bernegoue",    ll: [46.23, -0.35],  branche: "poitou", img: "smdb-plaine", txt: "Le village des Manceau, au moins depuis 1606. Naissance de Marc Rémi en 1929." },
  niort:      { nom: "Niort",                        ll: [46.32, -0.46],  branche: "poitou", img: "niort", txt: "La grande ville voisine : registres militaires, archives départementales." },
  dourgne:    { nom: "Dourgne",                      ll: [43.483, 2.14],  branche: "tarn", img: "dourgne", txt: "Les Delprat y vivent depuis 1673 au moins. Naissance d'Élise en 1939." },
  labruguiere:{ nom: "Labruguière",                  ll: [43.538, 2.263], branche: "tarn", img: "labruguiere-1889", txt: "Le fief des Bolon. Ici, en 1889, Arthur Batut prend l'une des premières photos aériennes au monde, avec un cerf-volant." },
  castres:    { nom: "Castres",                      ll: [43.606, 2.241], branche: "tarn", img: "castres", txt: "La grande ville du coin, où Xavier s'éteint en 2019." },
  cramant:    { nom: "Cramant (Champagne)",          ll: [48.99, 4.00],   branche: "tarn", img: "cramant", txt: "1918 : Joseph Bolon y est, au cœur de la seconde bataille de la Marne." },
  toulouse:   { nom: "Toulouse",                     ll: [43.604, 1.444], branche: "toulouse", img: "toulouse-1786", txt: "Le point de rencontre : les Manceau-Valverde arrivent d'Oran en 1962, les Bolon-Delprat sont à une heure de route." },
  angleterre: { nom: "Angleterre",                   ll: [52.53, -0.72],  branche: "amerique", txt: "Callicott vient du vieil anglais cald cot : « la chaumière froide »." },
  virginie:   { nom: "Virginie (comté de Prince Edward)", ll: [37.30, -78.39], branche: "amerique", img: "virginie-pont", txt: "XVIIIe siècle : les Callicott sont colons en Virginie." },
  caroline:   { nom: "Caroline du Nord (Randolph)",  ll: [35.71, -79.81], branche: "amerique", txt: "Fin XVIIIe – début XIXe siècle : la famille descend vers le sud." },
  tennessee:  { nom: "Tennessee & Mississippi",      ll: [35.15, -89.0],  branche: "amerique", txt: "XIXe siècle : la route de l'Ouest, vers le fleuve Mississippi." },
  foreman:    { nom: "Foreman & Arden (Arkansas)",   ll: [33.72, -94.40], branche: "amerique", img: "foreman-1908", txt: "Les fermes Callicott du comté de Little River. Naissance de Dorothy à Arden en 1928." },
  marche:     { nom: "Marche – North Little Rock",   ll: [34.88, -92.37], branche: "amerique", img: "marche-eglise", txt: "Le village polonais où Dorothy et Brunon fondent leur famille." },
  littlerock: { nom: "Little Rock",                  ll: [34.746, -92.29], branche: "amerique", txt: "La ville de Hayden." },
};

const ROUTES = [
  { branche: "espagne", de: "benitaia", a: "alicante", label: "XIXe s." },
  { branche: "espagne", de: "alicante", a: "oran", label: "≈ 1850 : la traversée", arc: 0.25 },
  { branche: "espagne", de: "albunol", a: "oued", label: "XIXe s.", arc: -0.2 },
  { branche: "espagne", de: "pulpi", a: "oued", label: "XIXe s.", arc: 0.15 },
  { branche: "espagne", de: "oued", a: "oran", label: "1928 : mariage" },
  { branche: "poitou", de: "lemans", a: "smdb", label: "Moyen Âge", pointille: true },
  { branche: "poitou", de: "smdb", a: "oran", label: "années 1950 : l'armée", arc: 0.2 },
  { branche: "toulouse", de: "oran", a: "toulouse", label: "1962 : le grand départ", arc: -0.25 },
  { branche: "tarn", de: "dourgne", a: "labruguiere", label: "mariage" },
  { branche: "tarn", de: "labruguiere", a: "cramant", label: "1914–1918", pointille: true, arc: 0.2 },
  { branche: "tarn", de: "labruguiere", a: "toulouse", label: "la rencontre" },
  { branche: "amerique", de: "angleterre", a: "virginie", label: "XVIIIe s. : l'Atlantique", arc: -0.25 },
  { branche: "amerique", de: "virginie", a: "caroline", label: "" },
  { branche: "amerique", de: "caroline", a: "tennessee", label: "" },
  { branche: "amerique", de: "tennessee", a: "foreman", label: "XIXe s." },
  { branche: "amerique", de: "foreman", a: "marche", label: "1961" },
  { branche: "amerique", de: "marche", a: "littlerock", label: "" },
  { branche: "coeur", de: "toulouse", a: "littlerock", label: "Marine ❤ Hayden", arc: -0.18 },
];

/* --- Frise chronologique --------------------------------------------- */
const FRISE = [
  { an: 1509, b: "histoire", t: "Oran devient espagnole", d: "Pendant près de trois siècles (jusqu'en 1792), Oran est une ville espagnole." },
  { an: 1606, b: "poitou",   t: "La plus ancienne trace des Manceau", d: "Sous Henri IV, un Manceau vend une terre à Nouel Piet. L'acte est conservé aux Archives des Deux-Sèvres." },
  { an: 1673, b: "tarn",     t: "Baptême de Guillemette Delprat à Dourgne", d: "Le 4 février. En 1698, elle épouse un Siguié, « laboureur au pignié » — sans doute un peigneur de laine." },
  { an: 1753, b: "poitou",   t: "Jean Manceau épouse Louise Alory", d: "Sous Louis XV, dans les paroisses du Poitou." },
  { an: 1775, b: "amerique", t: "Les Callicott en Virginie", d: "Un John William Callicott naît en Virginie, à la veille de l'Indépendance américaine." },
  { an: 1789, b: "histoire", t: "La Révolution française", d: "Les Delprat de Dourgne deviennent « propriétaires cultivateurs »." },
  { an: 1796, b: "tarn",     t: "Naissance de Marie Sophie Delprat", d: "Le 12 prairial an IV (31 mai 1796), à Labruguière." },
  { an: 1830, b: "histoire", t: "La France conquiert Alger", d: "Début de la colonisation de l'Algérie." },
  { an: 1857, b: "espagne",  t: "Les Barselo à Oran", d: "Francisco Barselo Lon, fils de Miguel Barceló Orts, épouse Antonia Lopez. La famille se fixe à Oran." },
  { an: 1865, b: "espagne",  t: "Une première Trinitaria", d: "Un Barselo épouse à Oran Trinitaria Josefa Ramona Aznar : le prénom se transmettra." },
  { an: 1869, b: "amerique", t: "Naissance de William Wheeler Callicott", d: "Vers 1869. Il sera fermier dans le comté de Little River, Arkansas." },
  { an: 1889, b: "tarn",     t: "Labruguière vue du ciel", d: "Arthur Batut y prend l'une des premières photographies aériennes, suspendue à un cerf-volant." },
  { an: 1889, b: "espagne",  t: "La loi du 26 juin 1889", d: "Les enfants d'Espagnols nés en Algérie deviennent Français. Trinitaria le sera dès sa naissance." },
  { an: 1891, b: "histoire", t: "Plus d'Espagnols que de Français", d: "Département d'Oran : 102 000 Espagnols pour 99 000 Français." },
  { an: 1894, b: "espagne",  t: "Naissance de Trinitaria Nieves Barselo", d: "Le 5 août, jour de Notre-Dame-des-Neiges, à Oran." },
  { an: 1895, b: "tarn",     t: "Naissance de Joseph Bolon", d: "Le 1er décembre, à Labruguière." },
  { an: 1898, b: "espagne",  t: "Naissance de Dominique Isidore Valverde", d: "À Oued Imbert, près de Sidi Bel Abbès." },
  { an: 1918, b: "histoire", t: "1918 : trois hommes en uniforme", d: "Joseph Bolon en Champagne, Dominique Valverde (classe 1918) à Oran, et Wallace Callicott, grand-oncle de Dorothy, mobilisé aux États-Unis." },
  { an: 1928, b: "espagne",  t: "Mariage de Trinitaria et Dominique Isidore", d: "Le 9 juin, à Oran." },
  { an: 1928, b: "amerique", t: "Naissance de Dorothy Callicott", d: "Le 16 octobre, à Arden, Arkansas." },
  { an: 1929, b: "poitou",   t: "Naissance de Marc Rémi Manceau", d: "Le 21 juillet, à Saint-Martin-de-Bernegoue." },
  { an: 1929, b: "tarn",     t: "Naissance de Xavier Bolon", d: "Le 14 août, à Labruguière. Dorothy (oct. 1928), Marc (juil. 1929), Xavier (août 1929) : trois grands-parents de Marine et Hayden nés à dix mois d'écart." },
  { an: 1931, b: "espagne",  t: "Naissance de Marie-Rose Agathe Valverde", d: "Le 5 février, jour de la Sainte-Agathe, à Oran." },
  { an: 1939, b: "tarn",     t: "Naissance d'Élise Delprat", d: "Le 6 avril, à Dourgne." },
  { an: 1950, b: "poitou",   t: "Marc Manceau en Oranie", d: "Début des années 1950 : le jeune militaire rencontre Marie-Rose Valverde." },
  { an: 1961, b: "amerique", t: "Mariage de Dorothy et Brunon Strozyk", d: "Le 6 mai, à Marche (Arkansas)." },
  { an: 1962, b: "toulouse", t: "Le grand départ", d: "Indépendance de l'Algérie : Marc, Marie-Rose, leurs trois fils et Trinitaria s'installent à Toulouse." },
  { an: 1974, b: "toulouse", t: "Trinitaria à Toulouse", d: "À 79 ans, elle renouvelle sa carte d'identité à Toulouse. Sa signature est toujours aussi belle." },
  { an: 2001, b: "poitou",   t: "Départ de Marc Rémi", d: "Le 20 avril, à Toulouse." },
  { an: 2004, b: "espagne",  t: "Départ de Marie-Rose", d: "Le 26 novembre, à Toulouse." },
  { an: 2013, b: "tarn",     t: "Départ d'Élise", d: "Le 28 novembre, à Labruguière." },
  { an: 2019, b: "tarn",     t: "Départ de Xavier", d: "Le 20 novembre, à Castres, à 90 ans." },
  { an: 2020, b: "amerique", t: "Départ de Dorothy", d: "Le 18 janvier, deux mois après Xavier, à North Little Rock, à 91 ans." },
  { an: 2026, b: "coeur",    t: "Marine & Hayden", d: "Deux arbres, une même histoire qui continue." },
];

/* --- Ce que disent les noms ------------------------------------------- */
const NOMS = [
  { mot: "Nieves", type: "prénom", sens: "« Des neiges »", txt: "Trinitaria est née le 5 août, fête de Notre-Dame-des-Neiges : selon la légende, il neigea ce jour-là en plein été sur une colline de Rome. En Espagne, on donnait à l'enfant le saint du jour.", img: "masolino-neige", credit: "Masolino, Le Miracle de la neige (v. 1428)" },
  { mot: "Agathe", type: "prénom", sens: "Sainte Agathe, le 5 février", txt: "Même coutume trente-sept ans plus tard : Marie-Rose naît le 5 février, jour de Santa Águeda, très fêtée en Espagne par les femmes.", img: "zurbaran-agathe", credit: "Zurbarán, Sainte Agathe (v. 1630)" },
  { mot: "Trinitaria", type: "prénom", sens: "La Sainte Trinité", txt: "Prénom rarissime en France, courant dans le Levant espagnol. Il évoque aussi les Trinitaires, moines qui rachetaient les captifs… à Alger et à Oran. Il circulait déjà dans la famille en 1865." },
  { mot: "Barselo", type: "nom", sens: "Barceló, « de Barcelone »", txt: "Dans le parler valencien, le « c » se prononce « s ». Les employés de mairie d'Oran ont écrit ce qu'ils entendaient : Barceló est devenu Barselo. Une orthographe qui signe l'origine alicantine." },
  { mot: "Valverde", type: "nom", sens: "« Vallée verte »", txt: "Du latin vallis viridis : une oasis dans les terres sèches d'Andalousie, d'où venait la famille." },
  { mot: "Isidore", type: "prénom", sens: "San Isidro Labrador", txt: "Saint Isidore le Laboureur, patron des paysans espagnols. Domingo Isidro est devenu Dominique Isidore à l'état civil français." },
  { mot: "Manceau", type: "nom", sens: "« Habitant du Maine »", txt: "Au Moyen Âge, on appelait ainsi quelqu'un venu de la région du Mans. Les Manceau sont descendus vers le Poitou il y a bien longtemps." },
  { mot: "Delprat", type: "nom", sens: "« Du pré »", txt: "Del prat, en occitan. Le paysan dont la ferme touchait le grand pré du village. Dourgne est l'un des premiers foyers de ce nom en France." },
  { mot: "Marie", type: "prénom", sens: "Chez tous les Bolon", txt: "Joseph Paul Henri Marie, Xavier Paul Henri Marie… Chez les Bolon, les garçons portaient tous « Marie » : une famille très pieuse, qui comptait une religieuse chez les Sœurs Bleues de Castres." },
  { mot: "Bolon", type: "nom", sens: "Un nom venu de l'Est", txt: "Probablement du prénom germanique Bolo. Le nom est surtout présent autour de Lyon, de la Loire et du Dauphiné." },
  { mot: "Callicott", type: "nom", sens: "« La chaumière froide »", txt: "Du vieil anglais cald (froid) et cot (chaumière). Le nom d'un hameau anglais, emporté en Virginie au XVIIIe siècle." },
  { mot: "Strozyk", type: "nom", sens: "Un nom polonais", txt: "La famille du grand-père de Hayden venait de Pologne, comme les fondateurs du village de Marche, en Arkansas." },
];
