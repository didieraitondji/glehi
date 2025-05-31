# Backend GLEHI

## 📋 Présentation Générale

Le backend de GLEHI est une API RESTful construite avec Node.js et Express.js. Il sert de fondation pour l'application, gérant la logique métier, l'authentification, et la persistance des données.

### 🛠 Technologies Principales

- **Node.js** : Environnement d'exécution JavaScript
- **Express.js** : Framework web pour Node.js
- **MongoDB** (via Mongoose) : Base de données NoSQL
- **JWT** : Gestion de l'authentification
- **bcryptjs** : Hachage sécurisé des mots de passe
- **dotenv** : Gestion des variables d'environnement
- **cors** : Gestion des requêtes cross-origin
- **morgan** : Logging des requêtes HTTP

## 🏗 Architecture

Le backend suit une architecture MVC (Modèle-Vue-Contrôleur) avec une structure modulaire :

```
backend/
├── config/         # Configuration de l'application
├── controllers/    # Logique métier
├── models/         # Schémas de données MongoDB
├── routes/         # Définition des routes API
├── app.js         # Configuration Express
└── server.js      # Point d'entrée de l'application
```

## 🔄 Fonctionnement Global

### Flux de Requêtes

1. Les requêtes HTTP arrivent via `server.js`
2. `app.js` configure les middlewares et les routes
3. Les routes (`routes/`) dirigent les requêtes vers les contrôleurs appropriés
4. Les contrôleurs (`controllers/`) traitent la logique métier
5. Les modèles (`models/`) interagissent avec la base de données

### Middlewares Principaux

- Gestion des CORS
- Parsing du JSON
- Logging des requêtes
- Gestion des erreurs
- Authentification JWT

## 💾 Structure des Données

Le backend utilise MongoDB comme base de données NoSQL, avec Mongoose comme ODM (Object Document Mapper). La structure de données est organisée autour de plusieurs modèles principaux qui représentent les entités métier de l'application.

### Modèles Principaux

#### 1. User (Utilisateur)

```javascript
{
  name: String,          // Nom de l'utilisateur
  email: String,         // Email unique
  phone: String,         // Numéro de téléphone
  password: String,      // Mot de passe hashé
  role: String,          // Rôle : "farmer", "buyer", "admin"
  location: String,      // Localisation de l'utilisateur
  createdAt: Date,       // Date de création
  updatedAt: Date        // Date de dernière modification
}
```

#### 2. Product (Produit)

```javascript
{
  title: String,         // Titre du produit
  description: String,   // Description détaillée
  quantity: Number,      // Quantité disponible
  price: Number,         // Prix unitaire
  categoryId: ObjectId,  // Référence à la catégorie
  images: String,        // URL des images
  available: Boolean,    // Disponibilité du produit
  sellerId: ObjectId,    // Référence au vendeur (User)
  location: String,      // Localisation du produit
  createdAt: Date        // Date de création
}
```

#### 3. Order (Commande)

```javascript
{
  buyerId: ObjectId,     // Référence à l'acheteur (User)
  sellerId: ObjectId,    // Référence au vendeur (User)
  productId: ObjectId,   // Référence au produit
  quantity: Number,      // Quantité commandée
  totalAmount: Number,   // Montant total
  status: String,        // État : "pending", "confirmed", "delivered", "cancelled"
  deliveryAddress: String, // Adresse de livraison
  paymentStatus: String,  // État du paiement : "paid", "unpaid"
  createdAt: Date        // Date de création
}
```

#### 4. Category (Catégorie)

```javascript
{
  name: String,          // Nom de la catégorie
  description: String    // Description de la catégorie
}
```

#### 5. Review (Avis)

```javascript
{
  userId: ObjectId,      // Référence à l'utilisateur
  productId: ObjectId,   // Référence au produit
  rating: Number,        // Note (1-5)
  comment: String        // Commentaire
}
```

#### 6. Transaction (Transaction)

```javascript
{
  orderId: ObjectId,     // Référence à la commande
  amount: Number,        // Montant de la transaction
  status: String,        // État de la transaction
  paymentMethod: String  // Méthode de paiement
}
```

#### 7. Message (Message)

```javascript
{
  senderId: ObjectId,    // Référence à l'expéditeur
  receiverId: ObjectId,  // Référence au destinataire
  content: String,       // Contenu du message
  createdAt: Date        // Date d'envoi
}
```

#### 8. Notification (Notification)

```javascript
{
  userId: ObjectId,      // Référence à l'utilisateur
  type: String,          // Type de notification
  content: String,       // Contenu de la notification
  read: Boolean          // État de lecture
}
```

### Relations et Références

1. **Relations One-to-Many**

   - Un utilisateur (User) peut avoir plusieurs produits (Product) → `sellerId` dans Product
   - Un utilisateur peut avoir plusieurs commandes (Order) → `buyerId` et `sellerId` dans Order
   - Une catégorie peut avoir plusieurs produits → `categoryId` dans Product

2. **Relations Many-to-Many**

   - Utilisateurs et Produits (via les commandes)
   - Utilisateurs et Messages (communication bidirectionnelle)

3. **Indexation**
   - Email unique pour les utilisateurs
   - Index sur les champs fréquemment recherchés (status, createdAt, etc.)

### Gestion des Données

1. **Validation**

   - Validation des schémas Mongoose pour chaque modèle
   - Contraintes d'unicité (email, etc.)
   - Types de données stricts

2. **Middleware Mongoose**

   - Hooks pre/post pour la gestion des dates (createdAt, updatedAt)
   - Validation des références
   - Gestion des suppressions en cascade

3. **Performance**
   - Indexation appropriée des champs fréquemment utilisés
   - Utilisation de `populate()` pour les requêtes nécessitant des données liées
   - Pagination pour les grandes collections

### Exemple d'Utilisation

```javascript
// Exemple de requête avec population
const order = await Order.findById(orderId)
  .populate("buyerId", "name email")
  .populate("sellerId", "name email")
  .populate("productId", "title price");

// Exemple de création avec validation
const newProduct = new Product({
  title: "Pommes Bio",
  price: 2.5,
  quantity: 100,
  sellerId: userId,
  categoryId: categoryId,
});
await newProduct.save();
```

## 🚀 Démarrage Rapide

1. **Installation des dépendances**

   ```bash
   npm install
   ```

2. **Configuration**

   - Copier `.env.example` vers `.env`
   - Configurer les variables d'environnement

3. **Démarrage du serveur**

   ```bash
   # Développement
   npm run dev

   # Production
   npm start
   ```

## 🧪 Tests

Les tests sont à implémenter. Structure recommandée :

- Tests unitaires avec Jest
- Tests d'intégration avec Supertest
- Tests de modèles avec Mongoose

## 📝 Bonnes Pratiques pour Contribuer

1. **Style de Code**

   - Suivre les conventions ESLint
   - Utiliser des noms explicites pour les variables et fonctions
   - Documenter les fonctions complexes

2. **Git Workflow**

   - Créer des branches pour chaque fonctionnalité
   - Faire des commits atomiques avec des messages descriptifs
   - Soumettre des pull requests avec une description claire

3. **Sécurité**

   - Ne jamais commiter de données sensibles
   - Valider toutes les entrées utilisateur
   - Utiliser les variables d'environnement pour les secrets

4. **Performance**
   - Optimiser les requêtes MongoDB
   - Mettre en cache quand approprié
   - Utiliser la pagination pour les grandes collections

## 🔍 Débogage

- Utiliser `morgan` pour le logging des requêtes
- Activer le mode debug avec `DEBUG=app:*`
- Vérifier les logs MongoDB pour les requêtes lentes

## 📚 Documentation API

La documentation complète de l'API est disponible via Swagger/OpenAPI (à implémenter).

## 🔐 Sécurité

- Authentification via JWT
- Hachage des mots de passe avec bcrypt
- Protection contre les attaques CSRF
- Validation des entrées
- Rate limiting (à implémenter)

## 🤝 Support

Pour toute question ou problème :

1. Consulter la documentation
2. Vérifier les issues existantes
3. Créer une nouvelle issue si nécessaire

---
