## Dashboard de sport SportSee

Ce projet est composé de deux parties :

- `www/` : l'application front-end React (réalisée dans le cadre du projet), construite avec Vite, Tailwind CSS et Recharts.
- `api/` : la micro-API back-end fournie par OpenClassrooms (Node.js / Express), qui sert les données mockées du dashboard.

## Pour utiliser ce projet :

- Commencer par cloner le projet.
- Assurez-vous d'avoir [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée) et [pnpm](https://pnpm.io/) installés.

### Lancer l'API (back-end)

L'API se lance en premier, car le front-end consomme ses données.

- Ouvrez un terminal dans le dossier `api/`.
- Exécutez `pnpm install` pour installer les dépendances.
- Exécutez `pnpm run start` pour démarrer la micro-API.
- L'API est alors disponible sur `http://localhost:8000`.

> L'API utilise une authentification par JWT. Consultez le `README.md` du dossier `api/` ainsi que le dossier `requests/` (dans `www/`) pour des exemples de requêtes.

### Lancer le front-end

- Ouvrez un terminal dans le dossier `www/`.
- Exécutez `pnpm install` pour installer les dépendances.
- Exécutez `pnpm run dev` pour démarrer le serveur de développement Vite.
- Votre site devrait alors être accessible à l'adresse `http://localhost:5173` dans n'importe quel navigateur.

Pour générer une version de production, utilisez `pnpm run build` (puis `pnpm run preview` pour la prévisualiser).

## Dépendances externes :
  - [Node.js](https://nodejs.org/) (v18+)
  - [pnpm](https://pnpm.io/) (vous devriez également pouvoir utiliser `npm` ou `yarn`)
  - Côté front-end : [Vite](https://vite.dev/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [Recharts](https://recharts.org/)

## Problèmes courants :

Si les commandes `pnpm` échouent, vérifiez que Node.js et pnpm sont bien installés en exécutant `node --version` et `pnpm --version`.

Si le front-end n'affiche aucune donnée, assurez-vous que l'API est bien démarrée et accessible sur `http://localhost:8000`. Un jeu de données mockées est également mis à votre disposition dans le fichier `www/src/utils/auth.js` (remplacez la ligne `export const IS_MOCK = false;` par `export const IS_MOCK = true;`).

Ce projet a été développé avec Node.js. Bien que d'autres versions puissent fonctionner, le bon fonctionnement n'est pas garanti avec des versions plus anciennes.

## Copyright :

Projet utilisé dans le cadre d'une formation Openclassrooms.