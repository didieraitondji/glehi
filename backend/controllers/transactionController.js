const Transaction = require("../models/Transaction");

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("userId")
      .populate("orderId");
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate("userId")
      .populate("orderId");
    if (!transaction)
      return res.status(404).json({ error: "Transaction non trouvée" });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!transaction)
      return res.status(404).json({ error: "Transaction non rencontré" });
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction)
      return res.status(404).json({ error: "Transaction non rencontré" });
    res.json({ transaction: "Transaction supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTransactionsByUserId = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTransactionsByOrderId = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      orderId: req.params.orderId,
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTransactionsByUserIdAndOrderId = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.params.userId,
      orderId: req.params.orderId,
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTransactionsByUserIdAndOrderIdAndStatus = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.params.userId,
      orderId: req.params.orderId,
      status: req.params.status,
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
