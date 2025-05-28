# MERN Chatbot avec OpenAI & Gemini

Un chatbot fullstack intelligent construit avec la stack **MERN** (MongoDB, Express, React, Node.js), intégrant **OpenAI** et **Gemini** pour des réponses intelligentes et adaptatives. Ce projet est conçu pour un déploiement facile grâce à **Docker**.

---

## 🚀 Fonctionnalités principales

- 💬 Chatbot intelligent avec choix entre OpenAI et Gemini  
- 🔥 Backend REST API avec Node.js et Express  
- 🎨 Frontend React moderne, responsive et intuitif  
- 🗄️ Stockage des conversations dans MongoDB  
- 🐳 Déploiement simplifié avec Docker & Docker Compose  
- ⚙️ Switch facile entre les API OpenAI et Gemini  

---

## 🗂️ Structure du projet

MERN_OPENAI_CHATBOT/
├── backend/ # API Node.js / Express - gestion des appels OpenAI & Gemini
├── frontend/ # Application React pour l'interface utilisateur
├── docker-compose.yml # Configuration Docker multi-conteneurs
└── README.md

## 🛠️ Prérequis

- [Node.js](https://nodejs.org/) v16 ou supérieur  
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)  
- Comptes et clés API OpenAI & Gemini  

---

## ⚙️ Installation et lancement

### 1. Cloner le dépôt

```bash
git clone https://github.com/khadijaBOUCHAMA/CHATBOT_MERN.git
cd CHATBOT_MERN
2. Configurer les variables d’environnement
Créer un fichier .env dans le dossier backend/ et y ajouter :

OPENAI_API_KEY=ta_cle_openai
ou
GEMINI_API_KEY=ta_cle_gemini
PORT=5000
MONGO_URI=mongodb://localhost:27017/chatbotdb
3. Lancer avec Docker
docker-compose up --build
Frontend accessible sur : http://localhost:3000

Backend accessible sur : http://localhost:5000

4. Lancement manuel (sans Docker)
-Backend

cd backend
npm install
npm start
-Frontend

cd frontend
npm install
npm start
💡 Utilisation
Depuis l’interface utilisateur React, choisis entre l’API OpenAI ou Gemini.

Toutes les conversations sont automatiquement sauvegardées dans MongoDB.

Le chatbot répond en temps réel selon l’API sélectionnée.

🤝 Contribution
Contributions, suggestions et corrections sont les bienvenues !
Merci d’ouvrir une issue ou de faire une pull request.

📄 Licence
MIT License © Khadija Bouchama

Merci d’utiliser ce projet !
Pour toute question ou suggestion, n’hésite pas à me contacter.

Si tu souhaites, je peux aussi t’aider à rédiger un fichier `.env.example` ou un fichier `docker-compose.yml` pour compléter ton projet.

