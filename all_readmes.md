========================================
# REPO: Auto-soutitrage-video-audio
========================================

# Projet de Sous-titrage Audio utilisant le GPU

Ce projet permet de générer des sous-titres à partir de fichiers audio ou vidéo en utilisant :

- **Whisper / WhisperX** pour la transcription et l'alignement des sous-titres
- **Demucs** pour séparer la voix de la musique si nécessaire
- **FFmpeg** pour le traitement audio/vidéo
- **GPU CUDA** pour accélérer la transcription et la séparation

---

## 🛠️ Stack Technologique

### Backend (API)
- **FastAPI** - Framework web asynchrone pour l'API REST
- **Python 3.10+** - Langage principal
- **SQLAlchemy** - ORM pour la gestion de base de données
- **SQLite** - Base de données pour le suivi des jobs
- **PyTorch** - Framework deep learning avec support CUDA
- **Uvicorn** - Serveur ASGI
- **Asyncio** - Programmation asynchrone

### Frontend
- **Flutter** - Framework mobile/desktop cross-platform (Dart)
- **Material Design** - Système de design UI
- **Socket.IO Client** - Communication temps réel avec le backend
- **HTTP/Dio** - Requêtes HTTP asynchrones
- **File Picker** - Sélection de fichiers
- **Flutter Sound** - Lecture/enregistrement audio

### Traitement Audio/Vidéo
- **OpenAI Whisper** - Transcription audio (base/small/medium/large)
- **WhisperX** - Alignement précis des sous-titres au mot
- **Demucs** - Séparation voix/musique
- **PyDub** - Traitement audio en Python
- **FFmpeg** - Encodage/décodage et traitement vidéo
- **ASS/SSA** - Format de sous-titres

### Infrastructure
- **CUDA 11+** - Accélération GPU NVIDIA
- **cuDNN** - Bibliothèque NVIDIA pour accélération deep learning
- **psutil** - Gestion des processus et ressources système

---

## 🖥️ Configuration minimale de la machine (GPU)

| Composant       | Minimum recommandé      | Notes |
|-----------------|------------------------|-------|
| GPU             | NVIDIA avec **≥ 4 Go VRAM** | CUDA 11+ requis |
| CPU             | 4 cœurs                | Plus de cœurs = meilleure performance |
| RAM             | 16 Go                  | Pour fichiers audio/vidéo longs |
| Stockage        | 20 Go libre            | Pour fichiers temporaires |
| OS              | Linux / Windows 10+ / MacOS | |

> La présence d'un GPU est fortement recommandée pour l'accélération CUDA de Whisper, Demucs et PyTorch.

---

## 📦 Dépendances et installation

### 1. Python
- **Version recommandée** : Python 3.10+

### 2. CUDA + PyTorch
Installe PyTorch avec support CUDA correspondant à ta carte GPU :

```bash
# Installation des dépendances principales
pip install fastapi uvicorn sqlalchemy
pip install openai-whisper
pip install git+https://github.com/m-bain/whisperX.git
pip install demucs
pip install torch torchaudio --index-url https://download.pytorch.org/whl/cu118
pip install psutil  # Pour la gestion des processus GPU
```

### 3. Dépendances système
```bash
# Installation FFmpeg
sudo apt install ffmpeg  # Debian/Ubuntu
# ou
brew install ffmpeg  # macOS
```

### 4. Frontend (Flutter)
```bash
cd front_end
flutter pub get
```

### 5. Premier lancement
Le programme téléchargera automatiquement les modèles complémentaires au premier lancement :
- Modèles Whisper (base, small, medium, large)
- Modèles WhisperX pour l'alignement
- Modèles Demucs pour la séparation

---

## 🚀 Architecture du projet

```
Auto-soutitrage-video-audio/
├── back_end/              # API FastAPI
│   ├── app.py            # Application principale
│   ├── pipeline.py       # Pipeline de traitement
│   ├── sse.py           # Server-Sent Events pour les notifications
│   ├── db/              # Configuration base de données
│   ├── service/         # Logique métier (CRUD)
│   ├── model/           # Modèles SQLAlchemy
│   ├── utils/           # Utilitaires (Whisper, Demucs, etc.)
│   └── interfaces/      # Interfaces des traitements
│
└── front_end/           # Application Flutter
    ├── lib/            # Code source Dart
    ├── pubspec.yaml    # Dépendances Flutter
    └── ...
```

### Backend
- API REST avec FastAPI
- Traitement asynchrone des jobs
- Notifications en temps réel via SSE (Server-Sent Events)
- Base de données SQLite pour le suivi des traitements

### Frontend
- Interface Flutter cross-platform
- Upload de fichiers vidéo/audio
- Suivi en temps réel de la progression
- Téléchargement des sous-titres générés

---

## 🔄 Flux de traitement

1. **Upload** - Réception du fichier vidéo/audio
2. **Détection** - Détermine si c'est audio ou vidéo
3. **Extraction audio** - Récupère la piste audio
4. **Séparation (optionnelle)** - Isole la voix avec Demucs
5. **Transcription** - Utilise Whisper pour transcrire
6. **Alignement** - WhisperX aligne les sous-titres au mot
7. **Génération ASS** - Crée le fichier de sous-titres formaté
8. **Brûlage** - Intègre les sous-titres dans la vidéo
9. **Téléchargement** - Retour du fichier final au client

---

## 📝 Licence

À définir

## 👤 Auteur

newplayer500p


========================================
# REPO: chat_local
========================================

# Chat Local

Une application Flutter de chat en temps réel permettant la communication entre utilisateurs sur un réseau local ou à distance via WebSocket. Cette application offre une expérience de messagerie fluide et intuitive.

## Vue d'ensemble

**Chat Local** est une application mobile (Android/iOS/Web) et bureau (Windows/Linux/macOS) construite avec Flutter. Elle permet aux utilisateurs de :

- Participer à des salons de discussion publics
- Envoyer des messages privés à d'autres utilisateurs
- Gérer leur profil utilisateur
- Personnaliser les paramètres de l'application
- Basculer entre les thèmes clair et sombre
- Se connecter à un serveur de chat centralisé

## Table des matières

- [Caractéristiques](#caractéristiques)
- [Architecture](#architecture)
- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Structure du projet](#structure-du-projet)
- [Utilisation](#utilisation)
- [Développement](#développement)

## Caractéristiques

### Fonctionnalités principales

- **Authentification utilisateur**
  - Système de login sécurisé avec stockage local
  - Gestion des sessions utilisateur via base de données SQLite/Hive
  - Support du chiffrement des mots de passe avec bcrypt

- **Système de messagerie**
  - Communication en temps réel via WebSocket
  - Support des salons de discussion publics
  - Messages privés entre utilisateurs
  - Historique des messages persistant

- **Gestion des utilisateurs**
  - Profil utilisateur personnalisable
  - Photo de profil avec avatar
  - Liste des utilisateurs connectés
  - État de connexion en temps réel

- **Interface utilisateur**
  - Navigation par onglets inférieure (Salons, Messages privés, Profil, Paramètres)
  - Support multi-plateforme (mobile et bureau)
  - Thèmes personnalisables (clair/sombre)
  - Indicateur de statut de connexion

- **Gestion du réseau**
  - Reconnexion automatique en cas de perte de connexion
  - Gestion des états de connexion
  - Support multi-serveur

---

**Développé par newplayer500p**


========================================
# REPO: dot_game
========================================

# Dot Game 🎮

Un jeu de points classique simplifié, créé avec [Expo](https://expo.dev).

## Description

Dot Game est une application mobile simple et addictive basée sur le concept classique du jeu de points. Connectez les points stratégiquement pour marquer des points et battez votre meilleur score !

## Démarrage rapide

### Prérequis

- Node.js et npm installés
- Expo CLI (optionnel mais recommandé)

### Installation

1. **Installer les dépendances**

   ```bash
   npm install
   ```

2. **Lancer l'application**

   ```bash
   npx expo start
   ```

3. **Ouvrir l'application**

   Scannez le code QR avec votre appareil ou choisissez une option :
   - 📱 [Expo Go](https://expo.dev/go) - Application sandbox pour tester rapidement
   - 🤖 [Émulateur Android](https://docs.expo.dev/workflow/android-studio-emulator/)
   - 🍎 [Simulateur iOS](https://docs.expo.dev/workflow/ios-simulator/)
   - 🏗️ [Build de développement](https://docs.expo.dev/develop/development-builds/introduction/)

## Développement

Le projet utilise le **routage basé sur les fichiers** avec Expo Router.

Éditez les fichiers dans le répertoire **app** pour voir les modifications en temps réel.

### Réinitialiser le projet

Si vous voulez repartir de zéro :

```bash
npm run reset-project
```

Cette commande déplace le code de démarrage vers **app-example** et crée un répertoire **app** vierge.

## Stack technologique

- **JavaScript** (64%)
- **TypeScript** (36%)
- **Expo** - Framework pour développement cross-platform
- **React Native** - Développement mobile

## Ressources utiles

- 📚 [Documentation Expo](https://docs.expo.dev/) - Fondamentaux et guides avancés
- 🎓 [Tutoriel Expo](https://docs.expo.dev/tutorial/introduction/) - Créez une app multi-plateforme
- 📖 [Expo Router](https://docs.expo.dev/router/introduction/) - Système de routage basé sur fichiers

## Rejoignez la communauté

- 🤝 [Expo sur GitHub](https://github.com/expo/expo) - Contribuez au projet open source
- 💬 [Discord Expo](https://chat.expo.dev) - Posez vos questions et discutez avec d'autres développeurs

---

**Bonne chance et amusez-vous ! 🎯**


========================================
# REPO: fanorona_9_game
========================================

# 🎮 Fanorona 9x9 Game

Un jeu de stratégie **Fanorona** (Fanoron-tsivy) sur mobile et web. Jouez en local (Humain vs Humain) ou contre une IA intelligente.

## 📋 Table des matières

- [À propos](#à-propos)
- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Démarrage rapide](#démarrage-rapide)
- [Structure du projet](#structure-du-projet)
- [Règles du jeu](#règles-du-jeu)
- [Technologies](#technologies)

## 📖 À propos

**Fanorona** est un ancien jeu de stratégie traditionnel malgache sur plateau 9x9. Cette implémentation moderne offre :
- ✅ Logique de jeu complète
- ✅ IA stratégique
- ✅ Thèmes personnalisables
- ✅ Multi-plateforme (iOS, Android, Web)

## ✨ Fonctionnalités

- **Plateau 9x9** complet
- **Deux modes de jeu** :
  - Humain vs Humain (local)
  - Humain vs IA
- **Validation complète** des coups
- **Captures en chaîne** (approche et retrait)
- **Interface thématisée** avec plusieurs styles visuels
- **Animations** des mouvements de l'IA

## 🚀 Installation

### Prérequis
- [Node.js](https://nodejs.org/) (v16+)
- [Expo CLI](https://docs.expo.dev/)

### Setup

```bash
git clone https://github.com/newplayer500p/fanorona_9_game.git
cd fanorona_9_game
npm install
```

## 🎯 Démarrage rapide

**Lancer en web** :
```bash
npm run web
```

**Mode Expo** :
```bash
npm start
```

**iOS/Android** :
```bash
npm run ios    # ou npm run android
```

## 📁 Structure du projet

```
src/
├── components/          # Composants UI
│   ├── BoardSvg.jsx     # Plateau SVG
│   ├── GameScreen.jsx   # Écran de jeu
│   ├── MenuScreen.jsx   # Menu principal
│   ├── SettingsModal.jsx# Paramètres
│   └── ...
├── useGameState.js      # État du jeu
├── boardLogic.js        # Logique du plateau
├── aiEngine.js          # IA du jeu
├── themes.js            # Thèmes visuels
└── constants.js         # Constantes
```

## 🎲 Règles du jeu

- **2 Joueurs** : 9 pièces chacun
- **Mouvements** : orthogonal ou diagonal sur cases adjacentes vides
- **Captures** :
  - **Approche** : avancer vers une pièce adverse (capture si case libre derrière)
  - **Retrait** : reculer d'une pièce adverse (capture si case libre entre)
- **Chaînes de captures** : continuer les captures si d'autres sont possibles
- **Victoire** : réduire l'adversaire à 1 pièce ou immobiliser ses pièces

## 🛠 Technologies

- **React Native** & **Expo** - Framework mobile/web
- **React** 19.2.0 - UI
- **SVG** - Rendu du plateau
- **JavaScript ES6+** - Code

## 📝 Licence

MIT License

---

**Amusez-vous bien ! 🎮✨**


========================================
# REPO: gestion-de-compte
========================================

# Gestion de Compte

Application complète de gestion de comptes bancaires/personnels combinant une application mobile **Flutter** et un serveur **C++ moderne**.

## 📋 Description

Plateforme sécurisée permettant de :
- ✅ S'authentifier (Login/Signup)
- ✅ Gérer ses comptes et consulter le solde
- ✅ Effectuer des transactions (dépôt, retrait, transfert)
- ✅ Générer et scanner des QR codes pour les paiements
- ✅ Consulter l'historique des transactions
- ✅ Utiliser le dark mode

## 🏗️ Architecture

```
Flutter Frontend ↔ HTTP/REST ↔ C++ Backend + MySQL
```

- **Frontend** : Interface mobile Flutter (Riverpod, Dio, Hive)
- **Backend** : API REST C++17 (JWT, authentification, transactions)
- **Base de données** : MySQL

## 📁 Structure

```
gestion-de-compte/
├── front_end/          # Application Flutter
│   ├── lib/            # Code source (screens, services, models)
│   └── pubspec.yaml    # Dépendances
├── back_end/           # Serveur C++
│   ├── src/            # Code source (controllers, services, models)
│   └── CMakeLists.txt  # Configuration build
└── README.md
```

## 🚀 Quick Start

### Frontend (Flutter)
```bash
cd front_end
flutter pub get
flutter run
```

### Backend (C++)
```bash
cd back_end
mkdir build && cd build
cmake ..
cmake --build . --config Release
./server
```

## 💻 Technologies

**Frontend :** Flutter, Dart, Riverpod, Dio, Hive, Flutter Secure Storage  
**Backend :** C++17, CMake, OpenSSL, MySQL, nlohmann/json

## 📝 API Endpoints

```
POST   /auth/login              # Login
POST   /auth/register           # Register
GET    /accounts                # Lister comptes
POST   /transactions/deposit    # Dépôt
POST   /transactions/withdraw   # Retrait
POST   /transactions/transfer   # Transfert
GET    /transactions            # Historique
```

## 🤝 Contribuer

Fork → Create branch → Commit → Push → Pull Request

## 📄 Licence

À définir (MIT, GPL v3, ou Apache 2.0)

---
**Version** : 1.0.0 (Beta) | **Dernière mise à jour** : Juillet 2026


========================================
# REPO: Gestion_liste_etudiant
========================================

# Gestion des Étudiants

Une application de bureau simple pour la gestion des étudiants, développée avec JavaFX, Gradle et MySQL.

## Fonctionnalités

- Authentification des utilisateurs.
- Ajout, modification, suppression et affichage des étudiants.
- Interface utilisateur intuitive construite avec JavaFX.

## Technologies Utilisées

- **Langage** : Java 24
- **Framework UI** : OpenJFX (JavaFX) 24
- **Gestion de projet** : Gradle
- **Base de données** : MySQL

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :
- JDK 24 ou une version plus récente.
- Un serveur de base de données MySQL.

## Installation et Lancement

1.  **Clonez le dépôt**
    ```sh
    git clone <url-du-repo>
    cd <nom-du-dossier>
    ```

2.  **Configuration de la base de données**
    - Assurez-vous que votre serveur MySQL est en cours d'exécution.
    - Créez une nouvelle base de données nommée `javafxdb`.
      ```sql
      CREATE DATABASE IF NOT EXISTS javafxdb;
      ```
    - Exécutez le script `app/src/main/java/org/example/script/init.sql` pour créer la table `etudiants`.

3.  **Configuration de la connexion**
    - Ouvrez le fichier `app/src/main/resources/application.properties`.
    - Modifiez les propriétés `db.url`, `db.user`, et `db.password` pour correspondre à votre configuration MySQL.
      ```properties
      db.url=jdbc:mysql://localhost:3306/javafxdb
      db.user=votre_utilisateur
      db.password=votre_mot_de_passe
      ```

4.  **Lancer l'application**
    Utilisez le wrapper Gradle pour exécuter l'application.
    ```sh
    # Pour Linux/macOS
    ./gradlew run

    # Pour Windows
    gradlew.bat run
    ```

## Structure du Projet

```
.
├── app/
│   ├── build.gradle                # Fichier de configuration Gradle
│   └── src/
│       ├── main/
│       │   ├── java/org/example/
│       │   │   ├── Main.java       # Point d'entrée de l'application
│       │   │   ├── controller/     # Contrôleurs FXML (Login, Dashboard)
│       │   │   ├── dao/            # Data Access Objects (ex: StudentDAO)
│       │   │   ├── model/          # Modèles de données (ex: Student)
│       │   │   └── script/
│       │   │       └── init.sql    # Script d'initialisation de la BDD
│       │   └── resources/
│       │       ├── *.fxml          # Fichiers de vue FXML
│       │       ├── styles.css      # Feuille de style
│       │       └── application.properties # Propriétés de l'application
│       └── test/                   # Code de test
└── gradlew                         # Wrapper Gradle
```


========================================
# REPO: mini-devise-convertisseur
========================================

# Mini Convertisseur de Devises 💱

Un outil simple et pratique pour convertir les devises en temps réel.

## Description

Ce projet est un petit convertisseur de devises qui permet de transformer rapidement un montant d'une devise à une autre. Idéal pour les voyages, les transactions commerciales ou simplement pour garder à jour vos conversions.

## Fonctionnalités

- Conversion rapide entre différentes devises
- Interface simple et intuitive
- Taux de change à jour

## Technologies

- JavaScript

## Installation

1. Clonez le dépôt
2. Ouvrez le projet dans votre environnement
3. Lancez l'application

## Utilisation

Sélectionnez la devise source et la devise cible, entrez le montant, et obtenez la conversion instantanément.

## Licence

Ce projet est sous licence ouverte.

---

Fait avec ❤️


========================================
# REPO: morpion_game
========================================

# 🎮 Morpion Game - Tic Tac Toe en Flutter

Une application **Tic Tac Toe (Jeu de Morpion)** moderne, fluide et intuitive développée avec **Flutter**. Jouez contre l'ordinateur avec 3 niveaux de difficulté ou affrontez un ami en mode 2 joueurs.

---

## ✨ Fonctionnalités

### 🎯 Modes de Jeu
- **Mode Solo** : Affrontez une IA avec 3 niveaux de difficulté
  - 🟢 **Facile** : L'IA joue aléatoirement
  - 🟡 **Moyen** : L'IA utilise une stratégie défensive/offensive basique
  - 🔴 **Difficile** : L'IA joue de manière optimale (quasi-imbattable)
- **Mode 2 Joueurs** : Jouez avec un ami sur le même appareil

### ⏱️ Système de Minuteur
- Minuteur configurable (2-199 secondes)
- Perte automatique si le temps s'écoule
- Paramétrage depuis l'écran d'accueil

### 🎨 Expérience Utilisateur
- **Thème Clair/Sombre** : Basculez entre les deux thèmes selon vos préférences
- **Animations Fluides** : Ligne de victoire animée et visuelle
- **Suivi des Scores** : Statistiques en temps réel de chaque partie
- **Interface Responsive** : Fonctionne sur mobile, tablette et desktop

### 📊 Autres Fonctionnalités
- Validation des règles du jeu (3 symboles alignés)
- Détection automatique des égalités
- Rejouer facilement sans relancer l'app
- Écran À propos avec informations du développeur

---

## 🚀 Démarrage Rapide

### Prérequis
- **Flutter** SDK >= 3.0
- **Dart** >= 3.0
- Un appareil mobile/émulateur ou navigateur web

### Installation

1. **Clonez le repository**
   ```bash
   git clone https://github.com/newplayer500p/morpion_game.git
   cd morpion_game
   ```

2. **Installez les dépendances**
   ```bash
   flutter pub get
   ```

3. **Lancez l'application**
   ```bash
   flutter run
   ```

---

## 🎮 Comment Jouer

1. **Écran d'accueil** : Sélectionnez votre mode de jeu
2. **Configuration du minuteur** (Optionnel) : Cliquez sur "Régler le compte à rebours"
3. **Commencez** : X (vous) joue toujours en premier
4. **Stratégie** : Alignez 3 symboles (horizontalement, verticalement ou en diagonale)
5. **Gagnez ou Égalité** : Revoyez votre score et rejouez

### Règles du Jeu
- ✅ Aligner 3 symboles (X ou O) sur une ligne, colonne ou diagonale
- ✅ Le joueur X commence toujours
- ✅ Si la grille est pleine sans gagnant → Égalité
- ✅ Si le minuteur est activé et s'écoule → Perte automatique

---

## 🔧 Architecture Technique

### Technologies Utilisées
- **Flutter** : Framework UI cross-platform
- **Dart** : Langage de programmation
- **Provider** : Gestion d'état et thème
- **url_launcher** : Ouverture de liens externes

- [ ] Animations supplémentaires
- [ ] Support de plusieurs langues
- [ ] Mode replay des parties


========================================
# REPO: platteforme-de-communication
========================================

# Projet JS_L2_GL - Plateforme Collaborative

Ce projet est une application web full-stack conçue comme une plateforme collaborative. Elle intègre des fonctionnalités en temps réel pour la communication, la gestion d'événements, le partage de fichiers et des quiz interactifs. L'application est divisée en deux parties principales : un backend construit avec Node.js/Express et un frontend avec React.js.

## 🚀 Fonctionnalités Clés

### Backend (Serveur)
- **Gestion des Utilisateurs et Authentification** : Inscription, connexion et gestion des profils utilisateurs avec authentification sécurisée par JWT (JSON Web Tokens).
- **Messagerie en Temps Réel** : Salons de discussion (rooms) où les utilisateurs peuvent envoyer et recevoir des messages, fichier instantanément grâce à Socket.IO.
- **Gestion de Présence** : Suivi des utilisateurs en ligne et hors ligne.
- **Gestion d'Événements** : Création, consultation et gestion d'événements.
- **Partage de Fichiers** : Upload et gestion de fichiers via des middlewares (Multer), permettant aux utilisateurs de partager des documents.
- **Quiz Interactifs** : Un système de quiz que les utilisateurs peuvent passer.
- **Sécurité** : Utilisation de middlewares pour la validation des données, la gestion des permissions (admin/utilisateur) et la protection des routes.

### Frontend (Client)
- **Interface Réactive** : Interface utilisateur moderne et dynamique construite avec React.
- **Navigation et Routage** : Navigation fluide entre les pages (Accueil, Connexion, Tableau de bord) en utilisant `react-router-dom`.
- **Composants UI** :
  - **Authentification** : Pages de connexion et d'inscription.
  - **Tableau de bord** : Une vue principale après connexion (`DashBoardLayout`).
  - **Messagerie** : Composants pour afficher la liste des discussions et interagir dans une page de discussion.
  - **Événements** : Cartes et formulaires pour afficher et créer des événements.
  - **Fichiers** : Sections pour voir ses fichiers et en publier.
  - **Quiz** : Section dédiée pour participer aux quiz.
- **Communication avec le Backend** : Utilisation d'Axios pour les requêtes API REST et de `socket.io-client` pour la communication en temps réel.

## 🛠️ Technologies Utilisées

### **Backend**
- **Environnement** : Node.js
- **Framework** : Express.js
- **Base de données** : MongoDB avec Mongoose
- **Communication temps réel** : Socket.IO
- **Authentification** : JSON Web Token (jsonwebtoken), Bcrypt
- **Gestion des uploads** : Multer
- **Variables d'environnement** : `dotenv`

### **Frontend**
- **Bibliothèque** : React.js
- **Outil de build** : Vite
- **Routage** : React Router DOM
- **Client HTTP** : Axios
- **Client temps réel** : Socket.IO Client
- **Style** : Tailwind CSS, Lucide React (icônes)
- **Notifications** : React Hot Toast, React Toastify

## ⚙️ Installation et Lancement

Suivez ces étapes pour lancer le projet sur votre machine locale.

### **Prérequis**
- Node.js (version 18 ou supérieure)
- npm
- Une instance de MongoDB en cours d'exécution (locale ou cloud comme MongoDB Atlas)

### 1. Configuration du Backend

```bash
# 1. Allez dans le dossier du backend
cd backEnd

# 2. Installez les dépendances
npm install

# 3. Créez un fichier .env à la racine de /backEnd et configurez-le
# Inspirez-vous de .env.example (s'il existe) ou utilisez les clés suivantes :
# MONGO_URI=<Votre chaîne de connexion MongoDB>
# JWT_SECRET=<Votre clé secrète pour les tokens>
# PORT=5000

# 4. Lancez le serveur de développement
npm run dev
```
Le serveur backend devrait maintenant tourner sur `http://localhost:5000`.

### 2. Configuration du Frontend

```bash
# 1. Depuis la racine du projet, allez dans le dossier du frontend
cd frontEnd

# 2. Installez les dépendances
npm install

# 3. Lancez le serveur de développement Vite
npm run dev
```
L'application React est maintenant accessible à l'adresse indiquée par Vite (généralement `http://localhost:5173`).


========================================
# REPO: portfolio
========================================

��#   p o r t f o l i o 
 
 

========================================
# REPO: smart-http-server-python
========================================

# Smart HTTP Server

Serveur HTTP Python moderne avec upload de fichiers, drag & drop et interface élégante.

## ✨ Fonctionnalités

- 📤 **Upload de fichiers** - Glissez-déposez ou cliquez pour uploader plusieurs fichiers
- 🎨 **Double vue** - Basculez entre affichage grille et liste
- 🌓 **Mode sombre** - Thème automatique avec préférence sauvegardée
- 🖼️ **Vignettes** - Aperçu automatique pour les images
- 📊 **Progression en temps réel** - Suivi visuel de l'upload
- 🔍 **Recherche instantanée** - Filtrez les fichiers en temps réel
- ↕️ **Tri intelligent** - Triez par nom, type, taille ou date
- 📱 **Design responsive** - Fonctionne sur mobile et desktop
- 🌐 **Accès réseau** - Partagez sur votre réseau local
- 🚀 **Léger** - Aucune dépendance externe

## 📋 Prérequis

- Python 3.6 ou supérieur
- Aucune dépendance externe requise !

### Installer Python

Si vous n'avez pas Python installé :

1. Téléchargez depuis [python.org](https://www.python.org/downloads/)
2. **Important** : Cochez "Add Python to PATH" lors de l'installation
3. Vérifiez l'installation :
   ```bash
   python --version
   ```

## 🚀 Installation rapide

1. **Clonez ou téléchargez** le projet :
   ```bash
   git clone https://github.com/votre-username/smart-http-server.git
   cd smart-http-server
   ```

2. **Rendez les scripts exécutables** (macOS/Linux uniquement) :
   ```bash
   chmod +x server.sh
   ```

3. **⭐ Ajoutez au PATH (FORTEMENT RECOMMANDÉ)** :
   
   Cela vous permettra de lancer `server` depuis n'importe quel dossier !
   
   ### Windows
   
   1. Copiez le chemin complet du dossier (ex: `C:\Users\VotreNom\smart-http-server`)
   2. Recherchez **"Variables d'environnement"** dans le menu Démarrer
   3. Cliquez sur **"Modifier les variables d'environnement pour votre compte"**
   4. Dans "Variables utilisateur", sélectionnez **"Path"** et cliquez sur **"Modifier"**
   5. Cliquez sur **"Nouveau"** et collez le chemin du dossier
   6. Cliquez sur **"OK"** pour tout fermer
   7. **Redémarrez votre terminal** pour appliquer les changements
   
   ### macOS / Linux
   
   1. Ouvrez votre fichier de configuration shell :
      ```bash
      # Pour bash
      nano ~/.bashrc
      
      # Pour zsh (macOS récent)
      nano ~/.zshrc
      ```
   
   2. Ajoutez cette ligne à la fin (remplacez le chemin) :
      ```bash
      export PATH="$PATH:/chemin/vers/smart-http-server"
      ```
   
   3. Sauvegardez (Ctrl+O, Entrée, Ctrl+X pour nano)
   
   4. Rechargez la configuration :
      ```bash
      source ~/.bashrc  # ou source ~/.zshrc
      ```
   
   ### ✅ Vérification
   
   Après l'ajout au PATH, testez dans un **nouveau terminal** :
   
   ```bash
   # Naviguez vers n'importe quel dossier
   cd ~/Documents
   
   # Lancez le serveur directement !
   server          # Windows: server.bat, macOS/Linux: server.sh
   ```
   
   Si ça fonctionne, vous pouvez maintenant lancer le serveur depuis n'importe où ! 🎉

## 💻 Utilisation

### Démarrage rapide

> 💡 **Astuce** : Si vous avez ajouté le dossier au PATH, vous pouvez lancer le serveur depuis n'importe quel répertoire !

**Windows (CMD)** :
```cmd
server.bat
```

**Windows (PowerShell)** :
```powershell
.\server.ps1
```

**macOS / Linux** :
```bash
./server.sh
```

**Ou directement avec Python** :
```bash
python smart_server_with_upload.py
```

Par défaut, le serveur démarre sur `http://localhost:5000` et sert le répertoire courant.

### Exemples d'utilisation

```bash
# Port personnalisé
server 8080

# Répertoire spécifique
server 5000 /chemin/vers/dossier

# Localhost uniquement (pas d'accès réseau)
python smart_server_with_upload.py --bind-local

# Toujours afficher la liste des fichiers
python smart_server_with_upload.py --force-listing
```

## 🎯 Fonctionnalités avancées

### Navigation intelligente

Lorsque vous accédez à un répertoire :

- **Comportement par défaut** : Affiche `index.html` s'il existe, sinon liste les fichiers
- **Forcer la liste** : Ajoutez `?view=list` à l'URL
  ```
  http://localhost:5000/mon-dossier/?view=list
  ```
- **Forcer index.html** : Ajoutez `?view=app` à l'URL
  ```
  http://localhost:5000/mon-dossier/?view=app
  ```

### Upload de fichiers

1. Cliquez sur "Uploader des fichiers" ou glissez-déposez
2. Sélectionnez un ou plusieurs fichiers
3. Cliquez sur "📤 Uploader"
4. Suivez la progression en temps réel

### Raccourcis clavier

- **Recherche** : Commencez à taper pour filtrer
- **Thème** : Cliquez sur 🌙/☀️ pour changer de thème

## ⚙️ Options de ligne de commande

| Option            | Description                                                    | Défaut            |
|-------------------|----------------------------------------------------------------|-------------------|
| `port`            | Port d'écoute du serveur                                       | `5000`            |
| `--dir`           | Répertoire à servir                                            | `.` (courant)     |
| `--force-listing` | Toujours afficher la liste, même si `index.html` existe        | Désactivé         |
| `--bind-local`    | N'accepter que les connexions localhost (pas d'accès réseau)   | Désactivé         |

### Exemples complets

```bash
# Servir le dossier Documents sur le port 8080
python smart_server_with_upload.py 8080 --dir ~/Documents

# Serveur local uniquement, toujours en mode liste
python smart_server_with_upload.py --bind-local --force-listing

# Partage sur le réseau local
python smart_server_with_upload.py 5000 --dir /chemin/vers/partage
```

## 🛠️ Cas d'usage typiques

Grâce à l'ajout au PATH, vous pouvez utiliser le serveur de manière très flexible :

### Scénario 1 : Servir un projet web
```bash
cd /chemin/vers/mon-site-web
server
# Visitez http://localhost:5000
```

### Scénario 2 : Partager rapidement des fichiers
```bash
cd ~/Documents/Presentations
server 8080
# Partagez http://votre-ip:8080 avec vos collègues
```

### Scénario 3 : Zone de drop temporaire
```bash
cd ~/Downloads/temp
server --dir .
# Les autres peuvent uploader des fichiers directement
```

### Scénario 4 : Serveur de développement
```bash
cd ~/projets/mon-app
server 3000
# Travaillez avec vos fichiers locaux
```

## 🔒 Sécurité

⚠️ **Important** : Ce serveur est conçu pour un usage **sur réseau local uniquement**.

- Ne l'exposez **jamais** directement à Internet sans mesures de sécurité appropriées
- Aucune authentification n'est requise par défaut
- Tous les utilisateurs du réseau local peuvent uploader des fichiers

### Configuration du pare-feu

Pour permettre l'accès depuis d'autres appareils :

**Windows (PowerShell Admin)** :
```powershell
New-NetFirewallRule -DisplayName "Python HTTP Server" -Direction Inbound -Protocol TCP -LocalPort 5000 -Action Allow
```

**Linux (UFW)** :
```bash
sudo ufw allow 5000/tcp
```

**macOS** :
Le pare-feu macOS autorise généralement les serveurs locaux par défaut.

## 🛠️ Ajout au PATH (Optionnel)

Pour lancer le serveur depuis n'importe où :

### Windows

1. Recherchez "Variables d'environnement"
2. Éditez la variable "Path"
3. Ajoutez le chemin du dossier du serveur
4. Redémarrez votre terminal

### macOS / Linux

Ajoutez à `~/.bashrc`, `~/.zshrc` ou `~/.profile` :

```bash
export PATH="$PATH:/chemin/vers/smart-http-server"
```

Puis rechargez :
```bash
source ~/.bashrc  # ou ~/.zshrc
```

---

> 🎯 **Pourquoi c'est fortement recommandé ?**
> 
> Sans ajout au PATH :
> ```bash
> cd /chemin/complet/vers/smart-http-server
> ./server.sh
> ```
> 
> Avec ajout au PATH :
> ```bash
> cd n'importe/quel/dossier
> server
> ```
> 
> **Vous gagnez un temps fou !** 🚀

---

## 🎨 Captures d'écran

*(Ajoutez ici des screenshots de l'interface)*

## 📝 License

MIT License - Voir le fichier `LICENSE` pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

- 🐛 Signaler des bugs
- 💡 Proposer des fonctionnalités
- 🔧 Soumettre des pull requests

## 📧 Support

Si vous rencontrez des problèmes, ouvrez une issue sur GitHub.

---

========================================
# REPO: geotrano
========================================
geoTrano
Une plateforme de localisation des maisons immobilières - Projet de porte ouverte.

À propos du projet
geoTrano est une plateforme web révolutionnaire de géolocalisation dédiée aux annonces immobilières. Elle connecte les propriétaires, les locataires et les administrateurs dans un écosystème intégré permettant de découvrir, localiser et gérer les propriétés disponibles avec une expérience utilisateur moderne et sécurisée.

Caractéristiques principales
📍 Géolocalisation avancée
Localisation interactive : Visualisez les propriétés immobilières sur une carte géographique en temps réel
Recherche par proximité : Trouvez les annonces dans un rayon défini autour d'une position GPS
Photos géolocalisées : Chaque photo est automatiquement enrichie avec les coordonnées GPS du lieu de capture
Anti-fraude GPS : Validation que les photos sont réellement prises sur le lieu de l'annonce
Floutage de position : Les coordonnées GPS exactes sont légèrement modifiées pour la sécurité (rayon aléatoire 10-50m)
🏠 Gestion complète des annonces
Création d'annonces : Propriétaires peuvent créer des annonces avec tous les détails (type, prix, chambres, équipements, etc.)
États des annonces : Disponible, Loué, En attente, Désactivé, Supprimé
Galeries photos enrichies :
Photo de couverture principale
Support des vidéos (Premium)
Limite: 5 photos pour gratuit, 15 pour Premium
Filtrage intelligent : Par prix, type de bien, ville, quartier, nombre de chambres, etc.
📱 Session photo avec validation GPS
Processus innovant de capture de photos :

Le propriétaire crée une session photo pour son annonce
Un QR code est généré avec un token JWT (30 minutes)
Le propriétaire scanne le QR avec son téléphone (app/site mobile)
Capture automatique du GPS :
Précision GPS requise (< 3m ou ignore)
Temps d'acquisition minimal (> 200ms)
Détection des spoof GPS
Upload avec validation de proximité :
Les photos doivent être prises à moins de 500m du lieu de l'annonce
Si plus loin : rejet avec message explicite
Enregistrement de la latitude/longitude exacte de chaque photo
La session est terminée après upload
Avantages :

✅ Certifie que les photos sont prises réellement sur place
✅ Lutte contre les annonces frauduleuses
✅ Les locataires ont confiance dans les images
💬 Messagerie en temps réel
Communication directe : Les locataires peuvent contacter les propriétaires via la plateforme
Historique complet : Conservation de toutes les conversations
Lié aux annonces : Les messages sont associés à une annonce spécifique
Notifications : Les utilisateurs sont notifiés des nouveaux messages
Support WebSocket : Messagerie instantanée temps réel (architecture prête)
👥 Gestion complète des 3 rôles
🎯 Locataire
Parcourir et rechercher les propriétés
Visualiser les annonces sur la carte
Consulter les photos et détails
Contacter les propriétaires via messagerie
Voir les propriétés à proximité
🏠 Propriétaire
Créer et publier les annonces
Lancer des sessions photo géolocalisées pour valider l'authenticité
Gérer les statuts (disponible/loué)
Modifier les annonces
Consulter les messages des locataires
Accès au compte Premium pour plus de fonctionnalités
Limite: 1 annonce gratuite, illimitées en Premium
⚙️ Administrateur
Modération complète du contenu
Gestion des utilisateurs et leurs rôles
Vérification des identités (CIN)
Approbation/rejet des annonces
Désactivation/suppression du contenu
Validation des demandes Premium
Modification des statuts d'annonces
🔐 Authentification et sécurité
Vérification d'identité (CIN) : Les propriétaires doivent avoir leur identité approuvée
Selfie + CIN : Recto/verso pour la validation
JWT avec expiration : Tokens sécurisés
Validation de rôles : Permissions granulaires
Anti-fraude GPS : Détection des spoof et fausses positions
💎 Système Premium
Abonnement : Déverrouille les fonctionnalités avancées
Bénéfices :
Jusqu'à 15 photos par annonce (vs 5 gratuit)
Upload de vidéos autorisé
Annonces illimitées
Gestion des demandes : Suivi du statut avec raison de rejet si applicable
Expiration : Suivi automatique de l'abonnement
📊 Données avec PostGIS
Stockage géographique : Utilise PostGIS PostgreSQL pour les types geography
Requêtes spatiales : Calcul de distance, proximité, rayons
Performance : Indexes spatiaux optimisés
Distance de Haversine : Calcul précis des distances GPS
Stack technologique
Backend
Framework : NestJS avec TypeScript
ORM : Prisma
Base de données : PostgreSQL + PostGIS
Fichiers : Multer pour l'upload
Authentification : JWT + Passport
Temps réel : Socket.io (WebSocket)
Validation : Zod + class-validator
Frontend
Framework : React 19 avec TypeScript
Build : Vite
Styling : Tailwind CSS + Material-UI
Cartes : MapLibre GL + MapTiler SDK
État : Zustand + React Query
Formulaires : React Hook Form + Zod
Temps réel : Socket.io client
Architecture
Monorepo : Turborepo pour gérer packages et apps
Partage : Types TypeScript, validations Zod partagés
Démarrage rapide
Installation
# Cloner le repository
git clone https://github.com/newplayer500p/geoTrano.git
cd geoTrano

# Installer les dépendances
pnpm install
Configuration
# Backend (.env dans apps/api/)
DATABASE_URL=postgresql://user:password@localhost:5432/geotrano
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:5173

# Frontend (.env dans apps/frontend/)
VITE_API_URL=http://localhost:3000
Développement
# Lancer frontend + backend en parallèle
pnpm dev

# Frontend (Vite): http://localhost:5173
# Backend (NestJS): http://localhost:3000
Production
# Build
pnpm build

# Démarrer l'API
pnpm start -F @geo-trano/api
Flux utilisateur principal
📸 Propriétaire créant une annonce avec photos
Créer l'annonce : Titre, description, prix, localisation
Lancer session photo : Génère QR code avec token JWT (30 min)
Scanner sur mobile : QR code lu → accès au formulaire de capture
Capturer GPS : L'app récupère les coordonnées (avec détection fraud)
Télécharger photo : Doit être à < 500m de l'annonce
Valider : Photo enregistrée avec GPS exact
Terminer session : Annonce prête à être publié
🔍 Locataire cherchant une propriété
Voir la carte : Visualise les annonces à proximité
Filtrer : Par prix, type, chambres, quartier
Consulter détails : Photos, localisation, équipements
Contacter : Envoie un message au propriétaire
Discuter : Conversation via la messagerie
Contribuer
Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

Licence
Ce projet est un projet de porte ouverte.


========================================
# REPO: soalink
========================================
# SoaLink - Plateforme intelligent de mise en relation médicale

[![NestJS](https://img.shields.io/badge/Backend-NestJS-red?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Flutter](https://img.shields.io/badge/Client-Flutter-blue?logo=flutter&logoColor=white)](https://flutter.dev/)
[![React](https://img.shields.io/badge/Admin-React-blue?logo=react&logoColor=white)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/ORM-Prisma-black?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/DB-PostgreSQL%20%2B%20PostGIS-blue?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Cache-Redis-red?logo=redis&logoColor=white)](https://redis.io/)
[![Gemini](https://img.shields.io/badge/AI-Google%20Gemini%20%26%20Gemma-orange?logo=google-gemini&logoColor=white)](https://ai.google.dev/)

---

**SoaLink** (de *Soa* signifiant bon/santé en Malagasy et *Link* représentant la connexion) est une plateforme de santé numérique innovante, inclusive et intelligente, conçue spécialement pour Madagascar et les pays d'Afrique francophone.

Elle vise à connecter efficacement les patients, les médecins et les établissements de santé (cliniques, hôpitaux, pharmacies) à travers différents canaux de communication, tout en intégrant un système intelligent de triage médical par IA pour orienter les patients vers les bons professionnels et optimiser la gestion des rendez-vous.

---

## Table des matières
1. [Architecture Globale](#architecture-globale)
2. [Fonctionnalités Clés](#fonctionnalités-clés)
3. [Structure du Projet](#structure-du-projet)

---

## Architecture Globale

Le système est conçu selon une architecture moderne à modules découplés communiquant via une API REST et WebSockets en temps réel.

### Clients et Interfaces Utilisateur

La plateforme est accessible via trois interfaces principales :
- **Application Mobile Patient** : Application Flutter permettant aux patients de consulter, prendre des rendez-vous et communiquer avec les professionnels de santé
- **Application Mobile Médecin** : Application Flutter dédiée aux professionnels de santé pour gérer leurs consultations, ordonnances et communications
- **Tableau de Bord Administration** : Interface React + Vite permettant aux administrateurs de gérer la plateforme, valider les professionnels et superviser les opérations

### Communication Client-Serveur

Tous les clients communiquent avec le serveur principal via :
- **HTTP** : Requêtes REST pour les opérations classiques
- **WebSockets** : Communication bidirectionnelle en temps réel pour la messagerie, les notifications et les mises à jour instantanées

### API Backend SoaLink (NestJS)

Le cœur du système est une API monolithique construite avec NestJS, organisée en modules spécialisés :

- **Module d'Authentification** : Gestion sécurisée des sessions utilisateurs avec tokens JWT
- **Module Patient** : Gestion des profils, historique médical et préférences des patients
- **Module Médecin** : Gestion des profils, spécialités et disponibilités des professionnels de santé
- **Module Établissement** : Gestion des cliniques, hôpitaux et pharmacies
- **Module Rendez-vous et Planning** : Gestion des réservations, créneaux disponibles et synchronisation en temps réel
- **Module Messagerie** : Chat bidirectionnel en temps réel entre patients et professionnels de santé via WebSockets
- **Module Notifications** : Système multi-canal pour alertes push et SMS
- **Module Ordonnances** : Génération et gestion des prescriptions numériques en PDF
- **Module IA (Triage)** : Pipeline d'analyse intelligente des symptômes et orientation médicale

### Stockage et Persistance des Données

- **PostgreSQL + PostGIS** : Base de données principale pour tous les patients, médecins, rendez-vous, ordonnances et conversations. PostGIS est utilisé pour les fonctionnalités géolocalisées avancées
- **Redis Cache** : Cache en mémoire pour les sessions de chat, état de présence des utilisateurs et optimisation des performances

### Services Externes

- **Firebase Cloud Messaging (FCM)** : Service de notification push pour alertes sur les applications mobiles
- **Passerelle SMS** : Service d'envoi de SMS pour rappels et notifications importants
- **Supabase S3 Storage** : Stockage cloud sécurisé pour les ordonnances PDF et documents médicaux
- **Google Gemini & LLaMA (Groq)** : Modèles IA pour le triage médical intelligent avec support multilingue

---

## Fonctionnalités Clés

### 1. Triage Médical et Orientation par IA (Multilingue)
Intégré dans le module [IaService](file:///I:/Programmation_GL/PROJET_L3/soutenance/soalink_api/src/ia/ia.service.ts), ce pipeline de triage intelligent permet aux patients d'expliquer leurs symptômes et reçoivent une orientation intelligente vers les professionnels appropriés.

* **Pipeline d'analyse d'intention** : Détermine dynamiquement l'intention de l'utilisateur (TRIAGE de symptômes, RECHERCHE_PREFS de praticiens spécifiques, ou requête MIXTE)
* **Double Orchestration LLM** : Utilisation de l'API Google Gemini (modèle principal pour la pertinence clinique) avec basculement automatique (fallback) vers LLaMA via l'API Groq en cas d'indisponibilité
* **Gestion persistante des sessions** : Gestionnaire de session de triage (TriageSessionService) qui garde en mémoire le contexte du patient, permettant un dialogue multi-tours fluide pour affiner le diagnostic
* **Détection de la langue & Traduction** : Support natif du Français, du Malagasy (y compris les expressions locales) et de l'Anglais grâce à un module NLU dédié (detecter_langue.helper.ts)
* **Évaluation de la gravité (Triage)** : Classification de l'état du patient selon 3 niveaux de gravité standardisés (Rouge/Urgent, Orange/Semi-urgent, Vert/Non-urgent), détection automatique des cas d'urgence
* **Recommandation intelligente de praticiens** : Proposition de spécialistes médicaux adaptés aux symptômes détectés, couplée à une vérification des disponibilités et de la proximité géographique

### 2. Recherche Géolocalisée Avancée (PostGIS & Routage)
Recherche performante des professionnels de santé, pharmacies et cliniques grâce aux fonctionnalités spatiales de Postgres (PostGIS).

* **Indexation spatiale** : Utilisation des fonctions géospatiales avancées pour le calcul précis de distance à vol d'oiseau entre le patient et les structures médicales
* **Élargissement progressif automatique** : Algorithme de recherche par cercles concentriques. Si aucun professionnel n'est trouvé dans le rayon initial de 10 km, le système élargit dynamiquement le rayon de recherche
* **Calcul d'itinéraires en temps réel** : Intégration d'un service de calcul d'itinéraires (RoutingService) pour évaluer la distance de trajet et guider le patient vers l'établissement choisi
* **Pharmacies de garde** : Liste en temps réel des pharmacies ouvertes et de garde selon la date et l'heure

### 3. Gestion Rigoureuse des Plannings & Réservations de Rendez-vous
Le planning des médecins est structuré pour s'adapter à la réalité locale de l'exercice médical à Madagascar.

* **Double mode d'exercice** : Prise en compte de l'exercice en cabinet privé et des vacations au sein de multiples établissements de santé
* **Quotas et créneaux fixes** : Le médecin définit ses heures d'exercice indicatives, mais la disponibilité réelle est basée sur un système rigoureux de créneaux fixes et de quotas maximums définis
* **Synchronisation en temps réel (WebSockets)** : Notification et mise à jour instantanée des réservations via un canal WebSocket (rdv-ws.gateway.ts) pour éviter les conflits ou doubles réservations
* **Gestion des annulations en cascade** : En cas d'indisponibilité imprévue du médecin, annulation automatique des rendez-vous affectés, notification instantanée des patients et libération automatique des créneaux

### 4. Messagerie Sécurisée Temps Réel & Médias
* **Chat bidirectionnel temps réel** : Canaux de communication instantanés (WebSockets) entre patients et professionnels de santé pour le suivi ou la téléconsultation
* **Support multimédia complet** : Échange sécurisé de photos, de documents médicaux (analyses, résultats) et de messages vocaux (intégrés avec des lecteurs/enregistreurs audio natifs côté Flutter)
* **Historisation et persistance** : Stockage structuré des conversations dans PostgreSQL avec mise en cache de l'état de présence et des compteurs de messages non lus via Redis

### 5. Système de Notifications Multi-canal
* **Notifications Push** : Envoi d'alertes instantanées sur l'application mobile via Firebase Cloud Messaging (FCM) pour les rappels de rendez-vous, réceptions de messages ou modifications de planning
* **Notifications SMS** : Passerelle SMS intégrée (SmsService) pour assurer la réception des rappels importants même en cas d'absence de connexion Internet ou sur les téléphones basiques

### 6. Génération et Stockage des Ordonnances Numériques
Création de prescriptions signées numériquement et générées sous forme de fichiers PDF à l'aide de pdfkit dans le module OrdonnanceModule.

* **Édition automatique de PDF** : Génération d'ordonnances et de documents de consultation officiels au format PDF via pdfkit côté backend
* **Stockage Cloud Sécurisé** : Téléversement et archivage automatique des documents sur un espace de stockage S3 (Supabase Storage)
* **Partage sécurisé** : Accès restreint et partagé de l'ordonnance uniquement entre le médecin émetteur, le patient concerné et la pharmacie validante

### 7. Sécurité, Rôles et Processus de Validation
* **Authentification Robuste** : Gestion des sessions utilisateurs sécurisée par tokens JWT avec rafraîchissement automatique
* **Contrôle d'accès basé sur les rôles (RBAC)** : Système de guards strict (Patient, Médecin, Administrateur d'Établissement, Super Admin) pour verrouiller les routes sensibles
* **Validation des professionnels de santé** : Processus d'inscription des médecins nécessitant le téléversement de justificatifs d'activité (diplôme, carte d'ordre), soumis à une validation manuelle par l'administration

---

## Structure du Projet

```text
soutenance/
├── soalink_api/          # API Backend (NestJS + Prisma + PostgreSQL)
├── soalink_admin/        # Tableau de bord administration (React + Vite)
├── soalink_app/          # Application multiplateforme client & médecin (Flutter)
├── soalink_memoire/      # Mémoire académique et documentation de soutenance
```
