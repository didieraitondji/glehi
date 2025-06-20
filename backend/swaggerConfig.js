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
            location: { type: "string", example: "Cotonou" },
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
            images: { type: "string", example: "maïs.jpg" },
            available: { type: "boolean", example: true },
            isFavorite: { type: "boolean", example: false },
            discount: { type: "number", example: 5 },
            unit: { type: "string", example: "kg" },
            sellerId: { type: "string", example: "60d0fe4f5311236168a109cb" },
            location: { type: "string", example: "Abomey-Calavi" },
            createdAt: { type: "string", format: "date-time" },
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
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
