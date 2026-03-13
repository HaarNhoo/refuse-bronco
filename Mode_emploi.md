# 🎸 Mode d'emploi : Contrôleur Fender Bronco 40 (Version PC)

Ce guide récapitule les étapes pour préparer, compiler et lancer l'interface de contrôle personnalisée pour le Bronco 40 sur Windows.

---

## 1. Préparation de l'environnement (`run-npm`)

Pour éviter les conflits de version et les problèmes de "Path", nous utilisons le script wrapper `run-npm.bat`.

* **Vérification des dépendances** : Assurez-vous d'avoir installé les modules nécessaires.
    * Ouvrez un terminal dans le dossier du projet.
    * Lancez la commande :
    ```bash
    run-npm install
    ```

* **Nettoyage du code (Linting)** : Avant de compiler, il faut s'assurer que le formatage est correct (guillemets, espaces).
    ```bash
    run-npm run lint -- --fix
    ```
    *Note : Cela répare automatiquement 90% des erreurs de style.*

---

## 2. Build et Compilation

Cette étape transforme le code source **TypeScript** en fichiers **JavaScript** optimisés pour le navigateur.

* **Lancer la compilation** :
    ```bash
    run-npm run build
    ```
* **Résultat** : Une fois terminé, un dossier nommé `dist/` (ou `build/`) apparaît à la racine du projet.
    * C'est ce dossier qui contient votre application finale "prête à l'emploi".

---

## 3. Lancement du Serveur

L'interface a besoin d'un serveur local pour fonctionner correctement avec les protocoles de sécurité du navigateur.

* **Accéder au dossier de production** :
    ```bash
    cd dist
    ```
    *(ou `cd build` selon votre configuration)*

* **Démarrer le serveur avec Python** :
    ```bash
    python -m http.server 8000
    ```
    *Le serveur est maintenant actif sur le port 8000.*

---

## 4. Utilisation de l'Interface

1.  **Connexion physique** : Branchez votre Fender Bronco 40 en USB sur votre PC.
2.  **Navigateur** : Ouvrez **Google Chrome** ou **Microsoft Edge** (Navigateurs compatibles WebHID).
3.  **Adresse** : Allez sur `http://localhost:8000`.
4.  **Connexion à l'ampli** :
    * Cliquez sur le bouton **Connect** de l'interface.
    * Une fenêtre Chrome s'ouvre : sélectionnez **Fender Amplifier** (ID `0x1ed8:0x0010`).
5.  **Pilotage** : Vos modèles personnalisés (**Rumble**, **Monster**, **Bassman TV**) sont maintenant prêts à être pilotés !

---

### 💡 Astuces de dépannage
* **Écran noir ?** Vérifiez que `defaults.ts` contient bien les 64 octets pour l'ampli par défaut défini dans `store.ts`.
* **L'ampli ne réagit pas ?** Assurez-vous qu'aucun autre logiciel (comme Fender FUSE original) n'est ouvert en arrière-plan.