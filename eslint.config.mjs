import gts from 'gts';

export default [
  {
    // On définit les dossiers à ignorer globalement ici
    ignores: [
      "src/lib/tests/**/*.ts",
      "build/",
      "dist/",
      "node_modules/"
    ],
  },
  ...gts, // On garde votre configuration actuelle
  {
    // Vous pouvez aussi ajouter des ajustements de règles ici si besoin
    rules: {
      "quotes": ["warn", "single"],
    }
  }
];