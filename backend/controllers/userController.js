const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json({ message: "Utilisateur supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Les deux mots de passe sont requis" });
    }

    // Récupérer l'utilisateur en base
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    // Vérifier ancien mot de passe
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Ancien mot de passe incorrect" });
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Mettre à jour
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Mot de passe modifié avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fonction pour trouver les acheteurs à proximité
exports.findNearbyBuyers = async (req, res) => {
  try {
    const { lat, lng, maxDistanceKm = 10 } = req.query;

    if (!lat || !lng) {
      return res
        .status(400)
        .json({ error: "Latitude et longitude sont requises" });
    }

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

// Fonction pour trouver les producteurs à proximité
exports.findNearbyFarmers = async (req, res) => {
  try {
    const { lat, lng, maxDistanceKm = 10 } = req.query;

    if (!lat || !lng) {
      return res
        .status(400)
        .json({ error: "Latitude et longitude sont requises" });
    }

    // Conversion km en mètres pour MongoDB
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
