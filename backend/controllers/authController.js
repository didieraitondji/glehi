const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "secretKey";

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, phone, password, role } = req.body;

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
    });

    await newUser.save();
    res.status(201).json({ message: "Utilisateur créé avec succès" });
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
