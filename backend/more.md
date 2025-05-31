# Documentation Technique Détaillée du Backend GLEHI

## 1. Vue d'Ensemble du Backend

### 1.1 Rôle et Objectifs

Le backend de GLEHI sert de fondation pour une plateforme de commerce électronique spécialisée dans les produits agricoles. Il remplit plusieurs rôles essentiels :

- **API RESTful** : Fournit une interface de programmation pour le frontend
- **Gestion des Données** : Stocke et gère les informations des utilisateurs, produits, commandes
- **Logique Métier** : Implémente les règles de gestion de l'application
- **Sécurité** : Gère l'authentification et l'autorisation
- **Performance** : Optimise l'accès aux données et la scalabilité

### 1.2 Stack Technologique

#### Technologies Principales

- **Node.js** (v18+) : Environnement d'exécution JavaScript

  - Choix motivé par : performance, écosystème riche, JavaScript côté serveur
  - Avantages : non-bloquant I/O, excellente pour les applications temps réel

- **Express.js** (v5.1.0) : Framework web

  - Middleware léger et flexible
  - Routing puissant
  - Gestion des erreurs intégrée

- **MongoDB** (via Mongoose v8.15.0) : Base de données NoSQL
  - Choix motivé par :
    - Flexibilité du schéma
    - Performance pour les opérations de lecture/écriture
    - Scalabilité horizontale
    - Support natif du JSON
    - Idéal pour les données non structurées ou semi-structurées

#### Outils de Support

- **JWT** : Gestion de l'authentification
- **bcryptjs** : Hachage sécurisé des mots de passe
- **dotenv** : Gestion des variables d'environnement
- **cors** : Sécurité cross-origin
- **morgan** : Logging des requêtes HTTP

### 1.3 Architecture et Organisation

#### Structure des Dossiers

```
backend/
├── config/         # Configuration (DB, env, etc.)
├── controllers/    # Logique métier
├── models/         # Schémas Mongoose
├── routes/         # Définition des routes API
├── middleware/     # Middlewares personnalisés
├── utils/          # Fonctions utilitaires
├── app.js         # Configuration Express
└── server.js      # Point d'entrée
```

#### Flux de Données

1. **Réception de la Requête**

   ```
   Client HTTP → server.js → app.js → Middleware → Route
   ```

2. **Traitement**

   ```
   Route → Controller → Model → MongoDB
   ```

3. **Réponse**
   ```
   MongoDB → Model → Controller → Route → Client HTTP
   ```

### 1.4 Traitement des Requêtes

#### Exemple Détaillé d'une Requête API

1. **Requête HTTP Arrive**

   ```http
   GET /api/products?category=fruits&limit=10
   ```

2. **Middleware Initial**

   - Vérification CORS
   - Parsing du body
   - Logging (morgan)
   - Authentification (si nécessaire)

3. **Routing**

   ```javascript
   // routes/product.js
   router.get("/products", productController.listProducts);
   ```

4. **Controller**

   ```javascript
   // controllers/product.js
   const listProducts = async (req, res) => {
     try {
       const { category, limit } = req.query;
       const products = await Product.find({ category })
         .limit(parseInt(limit))
         .populate("sellerId", "name");
       res.json(products);
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
   };
   ```

5. **Model Interaction**

   ```javascript
   // models/Product.js
   const Product = mongoose.model("Product", ProductSchema);
   // Mongoose convertit la requête en opération MongoDB
   ```

6. **Base de Données**

   - MongoDB exécute la requête
   - Retourne les documents correspondants

7. **Réponse**
   - Les données sont formatées
   - La réponse est envoyée au client

### 1.5 Points Clés de l'Architecture

#### Séparation des Responsabilités

- **Routes** : Définition des endpoints API
- **Controllers** : Logique métier
- **Models** : Structure et validation des données
- **Middleware** : Traitement transversal

#### Gestion des Erreurs

- Middleware global de gestion d'erreurs
- Validation des entrées
- Try/catch dans les controllers
- Logging des erreurs

#### Performance

- Mise en cache des requêtes fréquentes
- Indexation MongoDB optimisée
- Pagination des résultats
- Compression des réponses

#### Sécurité

- Validation des entrées
- Protection contre les injections
- Gestion des sessions
- Rate limiting
- Headers de sécurité

### 1.6 Communication Frontend-Backend

#### API RESTful

- Endpoints RESTful standards
- Réponses JSON
- Codes HTTP appropriés
- Versioning de l'API

#### Format des Réponses

```javascript
// Succès
{
  "status": "success",
  "data": { ... },
  "message": "Opération réussie"
}

// Erreur
{
  "status": "error",
  "error": {
    "code": "ERROR_CODE",
    "message": "Description de l'erreur"
  }
}
```

#### Authentification

- JWT (JSON Web Tokens)
- Refresh tokens
- Middleware d'authentification
- Gestion des rôles

---

_Cette première partie couvre la vue d'ensemble du backend. La deuxième partie se concentrera sur la modélisation des données NoSQL et les choix de conception._

## 2. Modélisation des Données NoSQL

### 2.1 Choix de la Base de Données

#### MongoDB : Pourquoi ce choix ?

MongoDB a été choisi comme base de données NoSQL pour plusieurs raisons :

1. **Flexibilité du Schéma**

   - Pas de schéma rigide comme en SQL
   - Possibilité d'ajouter/modifier des champs sans migration
   - Idéal pour une application en évolution

2. **Performance**

   - Excellente performance en lecture/écriture
   - Support natif des index
   - Scalabilité horizontale

3. **Intégration JavaScript**

   - Format de données natif JSON
   - Parfaite compatibilité avec Node.js
   - Syntaxe de requête intuitive

4. **Fonctionnalités Avancées**
   - Support des transactions
   - Agrégations puissantes
   - Requêtes géospatiales

### 2.2 Collections et Documents

#### Vue d'Ensemble des Collections

| Collection    | Description                            | Relations Principales          |
| ------------- | -------------------------------------- | ------------------------------ |
| users         | Utilisateurs (agriculteurs, acheteurs) | Référencé par products, orders |
| products      | Produits agricoles                     | Référence users, categories    |
| orders        | Commandes                              | Référence users, products      |
| categories    | Catégories de produits                 | Référencé par products         |
| reviews       | Avis sur les produits                  | Référence users, products      |
| transactions  | Transactions financières               | Référence orders               |
| messages      | Messages entre utilisateurs            | Référence users                |
| notifications | Notifications système                  | Référence users                |

## 3. Description Technique du Backend GLEHI

### Architecture et Organisation

Le backend de GLEHI est structuré en couches distinctes, chacune ayant un rôle spécifique dans le traitement des requêtes. L'application suit une architecture MVC (Modèle-Vue-Contrôleur) adaptée à une API RESTful.

La couche d'entrée est gérée par `server.js` et `app.js`, qui configurent le serveur Express et les middlewares essentiels. Les requêtes HTTP sont ensuite dirigées vers les routes appropriées, définies dans le dossier `routes/`. Chaque route est associée à un contrôleur dans le dossier `controllers/`, qui contient la logique métier. Les contrôleurs interagissent avec les modèles définis dans `models/`, qui représentent la structure des données dans MongoDB.

### Structure de la Base de Données

La base de données MongoDB est organisée en collections distinctes, chacune stockant un type spécifique de document. Les documents sont stockés au format BSON (Binary JSON), permettant une structure flexible et hiérarchique.

#### Collections et Documents

La collection `users` stocke les profils des utilisateurs. Chaque document contient des informations d'identification (email, mot de passe hashé), des données de profil (nom, rôle, localisation), et des métadonnées (dates de création et modification). La localisation est stockée sous forme de coordonnées géospatiales, permettant des requêtes de proximité.

La collection `products` contient les annonces de produits agricoles. Chaque document inclut des informations détaillées sur le produit (titre, description, prix, quantité), des références à la catégorie et au vendeur, et des données de localisation. Les images sont stockées sous forme d'URLs dans un tableau.

Les commandes sont gérées dans la collection `orders`. Un document de commande contient des références à l'acheteur, au vendeur et au produit, ainsi que des informations sur la transaction (quantité, montant total, statut). Les adresses de livraison et les statuts de paiement sont également inclus.

La collection `categories` maintient une liste hiérarchique des types de produits. Chaque catégorie possède un nom et une description, et est référencée par les documents de la collection `products`.

Les avis des utilisateurs sont stockés dans la collection `reviews`. Chaque avis contient une note numérique, un commentaire textuel, et des références à l'utilisateur et au produit concerné.

Les transactions financières sont enregistrées dans la collection `transactions`. Un document de transaction inclut le montant, la méthode de paiement, le statut, et une référence à la commande associée.

La communication entre utilisateurs est gérée via la collection `messages`. Chaque message contient le contenu, des références à l'expéditeur et au destinataire, et un horodatage.

Les notifications système sont stockées dans la collection `notifications`. Un document de notification inclut le type, le contenu, l'état de lecture, et une référence à l'utilisateur concerné.

### Gestion des Relations

Les relations entre documents sont gérées principalement par référence, utilisant des ObjectId MongoDB. Par exemple, un document `product` contient des références (`sellerId`, `categoryId`) vers les documents correspondants dans les collections `users` et `categories`. Ces références permettent de maintenir l'intégrité des données tout en évitant la duplication.

Pour les données fréquemment accédées ensemble, certaines informations sont dupliquées (embedding). Par exemple, les commandes incluent des informations de base sur l'acheteur pour un accès rapide, tout en maintenant une référence vers le document utilisateur complet.

### Flux de Données

Le flux de données dans l'application suit un chemin défini. Une requête HTTP arrive d'abord au serveur Express, qui la route vers le contrôleur approprié. Le contrôleur valide les données d'entrée, effectue les opérations métier nécessaires, et interagit avec la base de données via les modèles Mongoose.

Les modèles Mongoose convertissent les opérations JavaScript en requêtes MongoDB. Les résultats sont ensuite formatés et renvoyés au client sous forme de réponse JSON. Les erreurs sont capturées à chaque niveau et renvoyées avec des codes HTTP appropriés.

Les opérations de lecture fréquentes sont optimisées par des index MongoDB, notamment sur les champs de recherche courants et les références. Les requêtes géospatiales utilisent des index spéciaux pour les coordonnées de localisation.

La pagination est implémentée pour les collections volumineuses, limitant le nombre de documents retournés par requête. Les requêtes d'agrégation permettent d'analyser les données, comme le calcul des statistiques de vente par catégorie.

Les mises à jour des documents sont effectuées de manière atomique, garantissant la cohérence des données. Les transactions MongoDB sont utilisées pour les opérations nécessitant une atomicité sur plusieurs documents.

---
