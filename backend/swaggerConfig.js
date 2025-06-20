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
        url: "https://glehi.onrender.com/", // ou Render URL quand déployé
      },
    ],
  },
  apis: ["./routes/*.js"], // Adapte au chemin de tes fichiers de routes
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
