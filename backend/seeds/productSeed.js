require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const Category = require("../models/Category");
const User = require("../models/User");

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connecté à MongoDB");

    const fruitsCategory = "2f9f7215-2f15-4138-a552-8fea5f175535";
    const cerealsTuberculesCategory = "19bce66b-1bff-4086-bc55-ab486ea76757";
    const condimentsEpicesCategory = "d9306f88-605f-4894-b605-f17ac35b22ee";
    const diversCategory = "94527880-7fe9-43db-8894-1d8368726228";
    const legumesCategory = "a20a6a79-ffb7-4170-87dc-495394014c60";
    const boissonsJusCategory = "dfe96e6b-4c35-4f52-b511-1db36b0351f0";


    const farmerId = "ba44eecf-8303-4ce3-8dbb-479fcf412bbe";

    const productSeed = [
      {
        title: "Ananas Pain de Sucre",
        description: "Ananas doux et juteux cultivés à Allada.",
        quantity: 50,
        price: 800,
        categoryId: fruitsCategory,
        images: "ananas.jpeg",
        available: true,
        isFavorite: false,
        discount: 0,
        units: "kg",
        sellerId: farmerId,
      },
      {
        title: "Banane Mûre",
        description: "Bananes bien mûres, idéales pour le dessert.",
        quantity: 80,
        price: 600,
        categoryId: fruitsCategory,
        images: "banane.jpeg",
        available: true,
        isFavorite: false,
        discount: 0,
        units: "kg",
        sellerId: farmerId,
      },
      {
        title: "Maïs Jaune",
        description: "Maïs séché pour farine ou cuisson directe.",
        quantity: 100,
        price: 500,
        categoryId: cerealsTuberculesCategory,
        images: "mais_jaune.jpeg",
        available: true,
        isFavorite: false,
        discount: 5,
        units: "kg",
        sellerId: farmerId,
      },
      {
        title: "Café Robusta",
        description: "Grains de café béninois, arôme fort.",
        quantity: 40,
        price: 3200,
        categoryId: boissonsJusCategory,
        images: "cafe.jpeg",
        available: true,
        isFavorite: true,
        discount: 10,
        units: "kg",
        sellerId: farmerId,
      },
      {
        title: "Noix de Cajou Brut",
        description: "Noix brutes grade W240",
        quantity: 33,
        price: 3080,
        categoryId: fruitsCategory,
        images: "cajou.jpeg",
        available: true,
        isFavorite: false,
        discount: 0,
        units: "kg",
        sellerId: farmerId,
      },
      {
        title: "Chou Vert",
        description: "Chou croquant et frais de la vallée de l'Ouémé.",
        quantity: 25,
        price: 300,
        categoryId: legumesCategory,
        images: "chou.jpeg",
        available: true,
        isFavorite: false,
        discount: 0,
        units: "pièce",
        sellerId: farmerId,
      },
      {
        title: "Gari Blanc",
        description: "Gari finement granulé, très sec.",
        quantity: 75,
        price: 400,
        categoryId: cerealsTuberculesCategory,
        images: "gari.jpeg",
        available: true,
        isFavorite: false,
        discount: 0,
        units: "kg",
        sellerId: farmerId,
      },
      {
        title: "Huile Rouge",
        description: "Huile de palme artisanale pure.",
        quantity: 60,
        price: 1200,
        categoryId: diversCategory,
        images: "huile.jpeg",
        available: true,
        isFavorite: false,
        discount: 0,
        units: "litre",
        sellerId: farmerId,
      },
      {
        title: "Igname Pélé",
        description: "Ignames fraîches issues des collines.",
        quantity: 40,
        price: 700,
        categoryId: cerealsTuberculesCategory,
        images: "igname.jpeg",
        available: true,
        isFavorite: false,
        discount: 0,
        units: "kg",
        sellerId: farmerId,
      },
      {
        title: "Piment Rouge",
        description: "Piment fort pour sauces épicées.",
        quantity: 20,
        price: 1000,
        categoryId: condimentsEpicesCategory,
        images: "piment.jpeg",
        available: true,
        isFavorite: true,
        discount: 0,
        units: "kg",
        sellerId: farmerId,
      },
      {
        title: "Riz Paddy",
        description: "Riz non décortiqué, idéal pour le décorticage local.",
        quantity: 150,
        price: 450,
        categoryId: cerealsTuberculesCategory,
        images: "riz.jpeg",
        available: true,
        isFavorite: false,
        discount: 0,
        units: "kg",
        sellerId: farmerId,
      },
      {
        title: "Tomates Fraîches",
        description: "Tomates rouges et bien mûres, riches en goût.",
        quantity: 90,
        price: 550,
        categoryId: legumesCategory,
        images: "tomate.jpeg",
        available: true,
        isFavorite: false,
        discount: 0,
        units: "kg",
        sellerId: farmerId,
      }
    ];

    // await Product.deleteMany();
    await Product.insertMany(productSeed);
    console.log("✅ Produits insérés avec succès !");
  } catch (error) {
    console.error("❌ Erreur lors de l'insertion :", error);
  } finally {
    mongoose.disconnect();
  }
}

seedProducts();
