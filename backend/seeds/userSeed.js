require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

async function seed() {
  const seedUsers = [
    {
      firstname: "Merveilleux",
      lastname: "Azihou",
      phone: "+2290152431695",
      password: "PasswordSecure123!",
      username: "merveilleux",
      role: "farmer",
      producer_type: ["maïs"],
      profile_image: "https://example.com/images/merveilleux.jpg",
      address: "Zogbodomey",
      location: {
        type: "Point",
        coordinates: [2.4183, 6.3703],
      },
    },
    {
      firstname: "Rosine",
      lastname: "Gnahoui",
      phone: "+22961234567",
      password: "SecurePass456!",
      username: "rosine",
      role: "buyer",
      producer_type: [],
      profile_image: "https://example.com/images/rosine.jpg",
      address: "Cotonou, Haie Vive",
      location: {
        type: "Point",
        coordinates: [2.4264, 6.3675],
      },
    },
    {
      firstname: "Marcelin",
      lastname: "Hounkpè",
      phone: "+22991332211",
      password: "StrongPass789!",
      username: "marcelin",
      role: "farmer",
      producer_type: ["ananas", "manioc"],
      profile_image: "https://example.com/images/marcelin.jpg",
      address: "Allada",
      location: {
        type: "Point",
        coordinates: [2.1572, 6.6371],
      },
    },
    {
      firstname: "Clarisse",
      lastname: "Dossou",
      phone: "+22967223344",
      password: "SafePass123!",
      username: "clarisse",
      role: "buyer",
      producer_type: [],
      profile_image: "https://example.com/images/clarisse.jpg",
      address: "Porto-Novo",
      location: {
        type: "Point",
        coordinates: [2.6197, 6.4969],
      },
    },
    {
      firstname: "Ignace",
      lastname: "Zannou",
      phone: "+22970112233",
      password: "PassBenin2024!",
      username: "ignace",
      role: "farmer",
      producer_type: ["riz", "soja"],
      profile_image: "https://example.com/images/ignace.jpg",
      address: "Parakou",
      location: {
        type: "Point",
        coordinates: [2.6228, 9.3469],
      },
    },
  ];

  // Hash les mots de passe AVANT l'insertion
  for (const user of seedUsers) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("🚀 Connexion réussie à MongoDB");
  // await User.deleteMany(); // décommente pour vider la collection avant insertion

  await User.insertMany(seedUsers);
  console.log("✅ Utilisateurs insérés !");
  mongoose.disconnect();
}

seed().catch((err) => {
  console.error("❌ Erreur MongoDB :", err);
});
