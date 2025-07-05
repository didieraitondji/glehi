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

    const existingUser = await User.findOne({ phone });
    if (existingUser)
      return res.status(400).json({ message: "Utilisateur déjà existant" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      phone,
      password: hashedPassword,
      role,
      ...(location?.coordinates?.length === 2 && { location }),
      ...(address && { address }),
    });

    await newUser.save();
    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
/**
 * @description
 * Connexion d'un utilisateur existant.
 *
 * @param {Object} req.body - Les informations de connexion de l'utilisateur.
 * @param {string} req.body.phone - Le téléphone de l'utilisateur.
 * @param {string} req.body.password - Le mot de passe de l'utilisateur.
 *
 * @returns {Object} - Une réponse JSON avec un token JWT et les informations de l'utilisateur.
 * @throws {Error} - Si une erreur survient durant la connexion de l'utilisateur.
 */

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
