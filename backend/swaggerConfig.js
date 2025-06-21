const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API GLEHI",
      version: "1.0.0",
      description: "Documentation Swagger de l'API GLEHI",
    },
    servers: [
      {
        url: "https://glehi.onrender.com/",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            firstName: { type: "string", example: "Jean" },
            lastName: { type: "string", example: "Dupont" },
            phone: { type: "string", example: "+22961000000" },
            password: { type: "string", example: "password123" },
            role: {
              type: "string",
              enum: ["farmer", "buyer", "admin"],
              example: "farmer",
            },
            location: {
              type: "object",
              properties: {
                type: { type: "string", example: "Point", enum: ["Point"] },
                coordinates: {
                  type: "array",
                  items: { type: "number" },
                  example: [2.45, 6.4],
                  description: "[longitude, latitude]",
                },
              },
            },
            address: { type: "string", example: "Cotonou, Bénin" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Product: {
          type: "object",
          properties: {
            title: { type: "string", example: "Maïs" },
            description: {
              type: "string",
              example: "Sacs de maïs secs de 100kg",
            },
            quantity: { type: "number", example: 10 },
            price: { type: "number", example: 25000 },
            categoryId: { type: "string", example: "60d0fe4f5311236168a109ca" },
            images: { type: "string", example: "mais.jpg" },
            available: { type: "boolean", example: true },
            isFavorite: { type: "boolean", example: false },
            discount: { type: "number", example: 5 },
            unit: { type: "string", example: "kg" },
            sellerId: { type: "string", example: "60d0fe4f5311236168a109cb" },
            location: {
              type: "object",
              properties: {
                type: { type: "string", example: "Point", enum: ["Point"] },
                coordinates: {
                  type: "array",
                  items: { type: "number" },
                  example: [2.45, 6.4],
                  description: "[longitude, latitude]",
                },
              },
            },
            address: { type: "string", example: "Abomey-Calavi" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Category: {
          type: "object",
          properties: {
            name: { type: "string", example: "Céréales" },
            description: { type: "string", example: "Grains, riz, maïs, etc." },
            image: { type: "string", example: "cereales.jpg" },
          },
        },
        Order: {
          type: "object",
          properties: {
            buyerId: { type: "string" },
            sellerId: { type: "string" },
            productId: { type: "string" },
            quantity: { type: "number", example: 3 },
            totalAmount: { type: "number", example: 75000 },
            status: {
              type: "string",
              enum: ["pending", "confirmed", "delivered", "cancelled"],
              example: "pending",
            },
            deliveryAddress: { type: "string", example: "PK10 Fidjrossè" },
            paymentStatus: {
              type: "string",
              enum: ["paid", "unpaid"],
              example: "unpaid",
            },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Review: {
          type: "object",
          properties: {
            reviewerId: { type: "string" },
            productId: { type: "string" },
            rating: { type: "number", example: 4.5 },
            comment: { type: "string", example: "Très bon produit" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Transaction: {
          type: "object",
          properties: {
            userId: { type: "string" },
            orderId: { type: "string" },
            amount: { type: "number", example: 25000 },
            status: {
              type: "string",
              enum: ["success", "failed"],
              example: "success",
            },
            provider: {
              type: "string",
              enum: ["MTN", "Moov"],
              example: "MTN",
            },
            transactionId: { type: "string", example: "TRX1234567890" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Message: {
          type: "object",
          properties: {
            senderId: { type: "string" },
            receiverId: { type: "string" },
            message: {
              type: "string",
              example: "Bonjour, vous avez reçu ma commande ?",
            },
            read: { type: "boolean", example: false },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Notification: {
          type: "object",
          properties: {
            userId: { type: "string" },
            type: { type: "string", example: "new_order" },
            content: { type: "string", example: "Nouvelle commande reçue" },
            read: { type: "boolean", example: false },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        AuthLogin: {
          type: "object",
          required: ["phone", "password"],
          properties: {
            phone: { type: "string" },
            password: { type: "string" },
          },
        },
        AuthRegister: {
          type: "object",
          required: ["firstName", "lastName", "phone", "password", "role"],
          properties: {
            firstName: { type: "string" },
            lastName: { type: "string" },
            phone: { type: "string" },
            password: { type: "string" },
            role: {
              type: "string",
              enum: ["farmer", "buyer", "admin"],
            },
            location: {
              type: "object",
              properties: {
                type: { type: "string", example: "Point", enum: ["Point"] },
                coordinates: {
                  type: "array",
                  items: { type: "number" },
                  example: [2.45, 6.4],
                },
              },
            },
            address: { type: "string" },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    paths: {
      "/api/products/search": {
        get: {
          tags: ["Products"],
          summary: "Rechercher des produits avec filtres et géolocalisation",
          parameters: [
            {
              name: "title",
              in: "query",
              description:
                "Recherche par nom de produit (partiel, insensible à la casse)",
              required: false,
              schema: { type: "string" },
            },
            {
              name: "categoryId",
              in: "query",
              description: "Filtrer par ID de catégorie",
              required: false,
              schema: { type: "string" },
            },
            {
              name: "minPrice",
              in: "query",
              description: "Prix minimum",
              required: false,
              schema: { type: "number" },
            },
            {
              name: "maxPrice",
              in: "query",
              description: "Prix maximum",
              required: false,
              schema: { type: "number" },
            },
            {
              name: "available",
              in: "query",
              description: "Disponibilité (true/false)",
              required: false,
              schema: { type: "boolean" },
            },
            {
              name: "lat",
              in: "query",
              description: "Latitude pour recherche géospatiale",
              required: false,
              schema: { type: "number", format: "float" },
            },
            {
              name: "lng",
              in: "query",
              description: "Longitude pour recherche géospatiale",
              required: false,
              schema: { type: "number", format: "float" },
            },
            {
              name: "radiusKm",
              in: "query",
              description: "Rayon de recherche en kilomètres",
              required: false,
              schema: { type: "number", format: "float" },
            },
          ],
          responses: {
            200: {
              description: "Liste des produits correspondant aux filtres",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Product" },
                  },
                },
              },
            },
            500: {
              description: "Erreur serveur",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/users/nearby": {
        get: {
          tags: ["Users"],
          summary: "Trouver les producteurs proches d'une position",
          parameters: [
            {
              name: "lat",
              in: "query",
              description: "Latitude",
              required: true,
              schema: { type: "number", format: "float" },
            },
            {
              name: "lng",
              in: "query",
              description: "Longitude",
              required: true,
              schema: { type: "number", format: "float" },
            },
            {
              name: "maxDistanceKm",
              in: "query",
              description: "Rayon max en kilomètres (par défaut 10)",
              required: false,
              schema: { type: "number", default: 10 },
            },
          ],
          responses: {
            200: {
              description: "Liste des producteurs proches",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/User" },
                  },
                },
              },
            },
            400: { description: "Paramètres invalides" },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/users/nearby-buyers": {
        get: {
          tags: ["Users"],
          summary: "Trouver les clients proches d'une position",
          parameters: [
            {
              name: "lat",
              in: "query",
              description: "Latitude",
              required: true,
              schema: { type: "number", format: "float" },
            },
            {
              name: "lng",
              in: "query",
              description: "Longitude",
              required: true,
              schema: { type: "number", format: "float" },
            },
            {
              name: "maxDistanceKm",
              in: "query",
              description: "Rayon max en kilomètres (par défaut 10)",
              required: false,
              schema: { type: "number", default: 10 },
            },
          ],
          responses: {
            200: {
              description: "Liste des clients proches",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/User" },
                  },
                },
              },
            },
            400: { description: "Paramètres invalides" },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Connexion utilisateur",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AuthLogin" },
              },
            },
          },
          responses: {
            200: {
              description: "Connexion réussie",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      token: { type: "string" },
                      user: { $ref: "#/components/schemas/User" },
                    },
                  },
                },
              },
            },
            401: { description: "Identifiants invalides" },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/auth/register": {
        post: {
          tags: ["Auth"],
          summary: "Inscription utilisateur",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AuthRegister" },
              },
            },
          },
          responses: {
            201: {
              description: "Inscription réussie",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" },
                },
              },
            },
            400: { description: "Données invalides" },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/users/change-password": {
        post: {
          tags: ["Users"],
          summary: "Changer le mot de passe de l'utilisateur connecté",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    oldPassword: { type: "string" },
                    newPassword: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Mot de passe changé avec succès" },
            400: { description: "Données invalides" },
            401: { description: "Ancien mot de passe incorrect" },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/users/{id}": {
        delete: {
          tags: ["Users"],
          summary: "Supprimer un utilisateur",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID de l'utilisateur à supprimer",
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Utilisateur supprimé" },
            404: { description: "Utilisateur non trouvé" },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/users": {
        get: {
          tags: ["Users"],
          summary: "Récupérer la liste des utilisateurs",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Liste des utilisateurs",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/User" },
                  },
                },
              },
            },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/users/{id}": {
        get: {
          tags: ["Users"],
          summary: "Récupérer un utilisateur par ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID de l'utilisateur à récupérer",
              schema: { type: "string" },
            },
          ],
          responses: {
            200: {
              description: "Utilisateur trouvé",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" },
                },
              },
            },
            404: { description: "Utilisateur non trouvé" },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/users": {
        post: {
          tags: ["Users"],
          summary: "Créer un nouvel utilisateur",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          responses: {
            201: {
              description: "Utilisateur créé avec succès",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" },
                },
              },
            },
            400: { description: "Données invalides" },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/users/{id}": {
        put: {
          tags: ["Users"],
          summary: "Modifier un utilisateur",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID de l'utilisateur à modifier",
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          responses: {
            200: {
              description: "Utilisateur modifié avec succès",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" },
                },
              },
            },
            404: { description: "Utilisateur non trouvé" },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/products": {
        get: {
          tags: ["Products"],
          summary: "Récupérer la liste des produits",
          responses: {
            200: {
              description: "Liste des produits",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Product" },
                  },
                },
              },
            },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/products/{id}": {
        get: {
          tags: ["Products"],
          summary: "Récupérer un produit par ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID du produit à récupérer",
              schema: { type: "string" },
            },
          ],
          responses: {
            200: {
              description: "Produit trouvé",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Product" },
                },
              },
            },
            404: { description: "Produit non trouvé" },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/products": {
        post: {
          tags: ["Products"],
          summary: "Créer un nouveau produit",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
              },
            },
          },
          responses: {
            201: {
              description: "Produit créé avec succès",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Product" },
                },
              },
            },
            400: { description: "Données invalides" },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/products/{id}": {
        put: {
          tags: ["Products"],
          summary: "Modifier un produit",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID du produit à modifier",
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
              },
            },
          },
          responses: {
            200: {
              description: "Produit modifié avec succès",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Product" },
                },
              },
            },
            404: { description: "Produit non trouvé" },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/products/{id}": {
        delete: {
          tags: ["Products"],
          summary: "Supprimer un produit",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID du produit à supprimer",
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Produit supprimé avec succès" },
            404: { description: "Produit non trouvé" },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/categories": {
        get: {
          tags: ["Categories"],
          summary: "Récupérer la liste des catégories",
          responses: {
            200: {
              description: "Liste des catégories",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Category" },
                  },
                },
              },
            },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/categories/{id}": {
        get: {
          tags: ["Categories"],
          summary: "Récupérer une catégorie par ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID de la catégorie à récupérer",
              schema: { type: "string" },
            },
          ],
          responses: {
            200: {
              description: "Catégorie trouvée",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Category" },
                },
              },
            },
            404: { description: "Catégorie non trouvée" },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/categories": {
        post: {
          tags: ["Categories"],
          summary: "Créer une nouvelle catégorie",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Category" },
              },
            },
          },
          responses: {
            201: {
              description: "Catégorie créée avec succès",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Category" },
                },
              },
            },
            400: { description: "Données invalides" },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/categories/{id}": {
        put: {
          tags: ["Categories"],
          summary: "Modifier une catégorie",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID de la catégorie à modifier",
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Category" },
              },
            },
          },
          responses: {
            200: {
              description: "Catégorie modifiée avec succès",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Category" },
                },
              },
            },
            404: { description: "Catégorie non trouvée" },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/categories/{id}": {
        delete: {
          tags: ["Categories"],
          summary: "Supprimer une catégorie",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID de la catégorie à supprimer",
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Catégorie supprimée avec succès" },
            404: { description: "Catégorie non trouvée" },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/orders": {
        get: {
          tags: ["Orders"],
          summary: "Récupérer la liste des commandes",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Liste des commandes",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Order" },
                  },
                },
              },
            },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/orders/{id}": {
        get: {
          tags: ["Orders"],
          summary: "Récupérer une commande par ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID de la commande à récupérer",
              schema: { type: "string" },
            },
          ],
          responses: {
            200: {
              description: "Commande trouvée",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Order" },
                },
              },
            },
            404: { description: "Commande non trouvée" },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/orders": {
        post: {
          tags: ["Orders"],
          summary: "Créer une nouvelle commande",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Order" },
              },
            },
          },
          responses: {
            201: {
              description: "Commande créée avec succès",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Order" },
                },
              },
            },
            400: { description: "Données invalides" },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/orders/{id}": {
        put: {
          tags: ["Orders"],
          summary: "Modifier une commande",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID de la commande à modifier",
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Order" },
              },
            },
          },
          responses: {
            200: {
              description: "Commande modifiée avec succès",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Order" },
                },
              },
            },
            404: { description: "Commande non trouvée" },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/orders/{id}": {
        delete: {
          tags: ["Orders"],
          summary: "Supprimer une commande",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID de la commande à supprimer",
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Commande supprimée avec succès" },
            404: { description: "Commande non trouvée" },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/reviews": {
        get: {
          tags: ["Reviews"],
          summary: "Récupérer la liste des avis",
          responses: {
            200: {
              description: "Liste des avis",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Review" },
                  },
                },
              },
            },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/reviews/{id}": {
        get: {
          tags: ["Reviews"],
          summary: "Récupérer un avis par ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID de l'avis à récupérer",
              schema: { type: "string" },
            },
          ],
          responses: {
            200: {
              description: "Avis trouvé",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Review" },
                },
              },
            },
            404: { description: "Avis non trouvé" },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/reviews": {
        post: {
          tags: ["Reviews"],
          summary: "Créer un nouvel avis",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Review" },
              },
            },
          },
          responses: {
            201: {
              description: "Avis créé avec succès",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Review" },
                },
              },
            },
            400: { description: "Données invalides" },
            500: { description: "Erreur serveur" },
          },
        },
      },
      "/api/reviews/{id}": {
        put: {
          tags: ["Reviews"],
          summary: "Modifier un avis",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID de l'avis à modifier",
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Review" },
              },
            },
          },
          responses: {
            200: {
              description: "Avis modifié avec succès",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Review" },
                },
              },
            },
            404: { description: "Avis non trouvé" },
            500: { description: "Erreur serveur" },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
