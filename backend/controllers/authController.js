// authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "secretKey";

/**
 * @description
 * Inscription d'un nouvel utilisateur.
 *
 * @param {Object} req.body - Les informations de l'utilisateur.
 * @param {string} req.body.firstName - Le prénom de l'utilisateur.
 * @param {string} req.body.lastName - Le nom de l'utilisateur.
 * @param {string} req.body.phone - Le téléphone de l'utilisateur.
 * @param {string} req.body.password - Le mot de passe de l'utilisateur.
 * @param {string} req.body.role - Le r le de l'utilisateur.
 *
 * @returns {Object} - Une réponse JSON avec un message de confirmation.
 * @throws {Error} - Si une erreur survient durant la création de l'utilisateur.
 */

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, phone, password, role, location, address } =
      req.body;

    // Vérifie si le téléphone existe déjà
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "Utilisateur déjà existant" });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prépare l'objet utilisateur
    const userData = {
      firstName,
      lastName,
      phone,
      password: hashedPassword,
      role,
    };

    // Ajoute les coordonnées si elles sont valides
    if (
      location &&
      Array.isArray(location.coordinates) &&
      location.coordinates.length === 2 &&
      typeof location.coordinates[0] === "number" &&
      typeof location.coordinates[1] === "number"
    ) {
      userData.location = {
        type: "Point",
        coordinates: location.coordinates,
      };
    }

    // Ajoute l'adresse si elle est fournie
    if (address) {
      userData.address = address;
    }

    // Enregistre l'utilisateur
    const newUser = new User(userData);
    await newUser.save();

    // Réponse avec succès + ID
    res.status(201).json({
      message: "Utilisateur créé avec succès",
      userId: newUser._id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user)
      return res.status(401).json({ message: "Utilisateur non trouvé" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyToken = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token manquant" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token invalide" });
    res.json({ userId: decoded.userId, role: decoded.role });
  });
};
