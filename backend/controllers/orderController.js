const Order = require("../models/Order");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("buyerId")
      .populate("sellerId")
      .populate("productId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("buyerId")
      .populate("sellerId")
      .populate("productId");
    if (!order) return res.status(404).json({ error: "Commande non trouvée" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) return res.status(404).json({ error: "Commande non trouvée" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Commande non trouvée" });
    res.json({ message: "Commande supprimée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtenir les 10 dernières commandes d'un acheteur
exports.getLast10OrdersByBuyer = async (req, res) => {
  try {
    const buyerId = req.params.buyerId;

    const orders = await Order.find({ buyerId })
      .sort({ createdAt: -1 }) // tri décroissant par date
      .limit(10) // limite à 10 résultats
      .populate("productId") // optionnel : remplir infos produit
      .populate("sellerId"); // optionnel : remplir infos vendeur

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
