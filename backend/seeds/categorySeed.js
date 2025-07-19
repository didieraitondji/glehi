require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("../models/Category"); // adapte le chemin

const categorySeed = [
  {
    name: "Fruits",
    description: "Variété de fruits frais et savoureux produits localement.",
    image: "https://via.placeholder.com/150?text=Fruits",
  },
  {
    name: "Divers",
    description: "Produits divers pour les besoins quotidiens.",
    image: "https://via.placeholder.com/150?text=Divers",
  },
  {
    name: "Légumes",
    description: "Légumes frais issus de l’agriculture béninoise.",
    image: "https://via.placeholder.com/150?text=Légumes",
  },
  {
    name: "Céréales & Tubercules",
    description: "Céréales nourrissantes et tubercules cultivés localement.",
    image: "https://via.placeholder.com/150?text=Céréales+Tubercules",
  },
  {
    name: "Condiments & Épices",
    description: "Saveurs locales : épices et condiments du terroir.",
    image: "https://via.placeholder.com/150?text=Condiments+%26+Épices",
  },
  {
    name: "Produits Animaux & Laitiers",
    description: "Produits issus de l’élevage : viande, œufs, lait, etc.",
    image: "https://via.placeholder.com/150?text=Produits+Animaux+%26+Laitiers",
  },
  {
    name: "Boissons & Jus",
    description: "Boissons naturelles et jus artisanaux faits maison.",
    image: "https://via.placeholder.com/150?text=Boissons+%26+Jus",
  },
  {
    name: "Produits Artisanaux",
    description: "Objets faits main : artisanat local et durable.",
    image: "https://via.placeholder.com/150?text=Artisanat",
  },
];

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("🔄 Insertion des catégories...");
    await Category.deleteMany();
    await Category.insertMany(categorySeed);
    console.log("✅ Catégories insérées avec succès !");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Erreur :", err);
  });
