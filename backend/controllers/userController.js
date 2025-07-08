const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Obtenir tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtenir un utilisateur par son userId (UUID)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.id });
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      phone,
      password,
      username,
      profile_image,
      producer_type,
      address,
      location,
      role,
    } = req.body;

    // Vérification des champs obligatoires
    if (!firstname || !lastname || !phone || !password || !username) {
      return res.status(400).json({ error: "Champs obligatoires manquants" });
    }

    // Vérifier si username ou téléphone existe déjà
    const existingUser = await User.findOne({ $or: [{ phone }, { username }] });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Numéro ou nom d'utilisateur déjà utilisé" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      phone,
      password: hashedPassword,
      username,
      profile_image,
      producer_type,
      address,
      location,
      role,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mettre à jour un utilisateur via userId
exports.updateUser = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const user = await User.findOneAndUpdate(
      { userId: req.params.id },
      updates,
      { new: true }
    );

    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer un utilisateur via userId
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ userId: req.params.id });
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json({ message: "Utilisateur supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Changer le mot de passe
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.userId; // JWT injecte userId
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Les deux mots de passe sont requis" });
    }

    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Ancien mot de passe incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Mot de passe modifié avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Trouver les acheteurs proches d'une position
exports.findNearbyBuyers = async (req, res) => {
  try {
    const { lat, lng, maxDistanceKm = 10 } = req.query;
    if (!lat || !lng)
      return res.status(400).json({ error: "Latitude et longitude requises" });

    const maxDistanceMeters = maxDistanceKm * 1000;

    const buyers = await User.find({
      role: "buyer",
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: maxDistanceMeters,
        },
      },
    });

    res.json(buyers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Trouver les producteurs proches d'une position
exports.findNearbyFarmers = async (req, res) => {
  try {
    const { lat, lng, maxDistanceKm = 10 } = req.query;
    if (!lat || !lng)
      return res.status(400).json({ error: "Latitude et longitude requises" });

    const maxDistanceMeters = maxDistanceKm * 1000;

    const farmers = await User.find({
      role: "farmer",
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: maxDistanceMeters,
        },
      },
    });

    res.json(farmers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
