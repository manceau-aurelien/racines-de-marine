# Les racines de Marine — mode d'emploi

## Voir le site
Double-cliquer sur `index.html`. Il faut une connexion internet pour la carte et les polices.

## Modifier le contenu
- **Les personnes de l'arbre** (noms, dates, petites biographies) : fichier `data.js`, section `PERSONNES`.
- **La frise** : `data.js`, section `FRISE`.
- **Les cartes « Ce que disent les noms »** : `data.js`, section `NOMS`.
- **Les textes des chapitres et la lettre d'Aurélien** : `index.html` (chercher le texte à changer).

## Ajouter de vraies photos de famille
1. Mettre la photo dans `images/famille/` (par exemple `images/famille/marie-rose.jpg`).
2. Dans `data.js`, ajouter `photo: "images/famille/marie-rose.jpg",` dans la fiche de la personne.
La photo remplacera l'illustration dans sa fiche.

## À compléter
- Le prénom de la maman de Marine (fiche `maman` dans `data.js`).

## Partager le site
Le dossier `site` est autonome : on peut l'envoyer en .zip, ou le mettre en ligne gratuitement
(par exemple en glissant le dossier sur https://app.netlify.com/drop).

## Crédits
Images : Wikimedia Commons (domaine public ou licences libres, détail en bas du site).
Recherches : Gemini Deep Research. Les liens avant le XXe siècle sont des pistes à confirmer dans les archives.
