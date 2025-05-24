const Message = require("../models/Message");

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .populate("senderId")
      .populate("receiverId");
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate("senderId")
      .populate("receiverId");
    if (!message) return res.status(404).json({ error: "Message non trouvé" });
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMessage = async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(message);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ error: "Message non trouvé" });
    res.json({ message: "Message supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!message)
      return res.status(404).json({ error: "Message non rencontré" });
    res.json(message);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMessagesBySenderId = async (req, res) => {
  try {
    const messages = await Message.find({ senderId: req.params.senderId })
      .populate("senderId")
      .populate("receiverId");
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMessagesByReceiverId = async (req, res) => {
  try {
    const messages = await Message.find({ receiverId: req.params.receiverId })
      .populate("senderId")
      .populate("receiverId");
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUnreadMessagesByReceiverId = async (req, res) => {
  try {
    const messages = await Message.find({
      receiverId: req.params.receiverId,
      read: false,
    })
      .populate("senderId")
      .populate("receiverId");
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUnreadMessagesBySenderId = async (req, res) => {
  try {
    const messages = await Message.find({
      senderId: req.params.senderId,
      read: false,
    })
      .populate("senderId")
      .populate("receiverId");
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMessagesBySenderIdAndReceiverId = async (req, res) => {
  try {
    const messages = await Message.find({
      senderId: req.params.senderId,
      receiverId: req.params.receiverId,
    })
      .populate("senderId")
      .populate("receiverId");
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
