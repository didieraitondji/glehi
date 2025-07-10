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
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
