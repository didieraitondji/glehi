const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "secretKey";

// ===============================
//         INSCRIPTION
// ===============================
exports.register = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      phone,
      password,
      username,
      role,
      profile_image,
      producer_type,
      address,
      location,
    } = req.body;

    // Vérifier si le numéro ou username est déjà utilisé

    if (username && username.length != 0) {
      const existingUser = await User.findOne({
        $or: [{ phone }, { username }],
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Téléphone ou nom d'utilisateur déjà utilisé" });
      }
    } else {
      const existingUser = await User.findOne({ phone });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Téléphone ou nom d'utilisateur déjà utilisé" });
      }
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Construire l'utilisateur
    const userData = {
      firstname,
      lastname,
      phone,
      username,
      password: hashedPassword,
      role: role || "buyer",
      profile_image,
      producer_type,
    };

    // Ajouter localisation si fournie
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

    // Ajouter l'adresse si présente
    if (address) {
      userData.address = address;
    }

    // Sauvegarde dans la base
    const newUser = new User(userData);
    await newUser.save();

    res.status(201).json({
      message: "Utilisateur inscrit avec succès",
      userId: newUser.userId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===============================
//            LOGIN
// ===============================
exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign(
      { userId: user.userId, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Connexion réussie",
      token,
      user: {
        userId: user.userId,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        username: user.username,
        role: user.role,
        producer_type: user.producer_type,
        profile_image: user.profile_image,
        address: user.address,
        location: user.location,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===============================
//     VÉRIFICATION DE TOKEN
// ===============================
exports.verifyToken = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token manquant" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token invalide" });

    res.json({ userId: decoded.userId, role: decoded.role });
  });
};
