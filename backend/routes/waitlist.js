const express = require("express");
const router = express.Router();
const Waitlist = require("./../models/WaitList.js");

/**
 * @swagger
 * components:
 *   schemas:
 *     Waitlist:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email du subscriber
 *         subscribedAt:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum: [pending, notified, converted]
 *         metadata:
 *           type: object
 *           properties:
 *             source:
 *               type: string
 *             userAgent:
 *               type: string
 *             ipAddress:
 *               type: string
 */

/**
 * @swagger
 * /api/waitlist:
 *   post:
 *     summary: Ajouter un email à la liste d'attente
 *     tags: [Waitlist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               source:
 *                 type: string
 *     responses:
 *       201:
 *         description: Email ajouté avec succès
 *       400:
 *         description: Email invalide ou manquant
 *       409:
 *         description: Email déjà dans la liste
 */
router.post("/", async (req, res) => {
  try {
    const { email, source } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email requis",
      });
    }

    // Vérifier si l'email existe déjà
    const existing = await Waitlist.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Cet email est déjà inscrit",
      });
    }

    const waitlistEntry = new Waitlist({
      email,
      metadata: {
        source: source || "direct",
        userAgent: req.get("user-agent"),
        ipAddress: req.ip || req.connection.remoteAddress,
      },
    });

    await waitlistEntry.save();

    res.status(201).json({
      success: true,
      message: "Email ajouté à la liste d'attente",
      data: {
        email: waitlistEntry.email,
        subscribedAt: waitlistEntry.subscribedAt,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Email invalide",
        errors: error.errors,
      });
    }

    console.error("Erreur waitlist:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
    });
  }
});

/**
 * @swagger
 * /api/waitlist:
 *   get:
 *     summary: Récupérer la liste d'attente
 *     tags: [Waitlist]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, notified, converted]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *     responses:
 *       200:
 *         description: Liste récupérée avec succès
 */
router.get("/", async (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    const query = status ? { status } : {};

    const skip = (page - 1) * limit;

    const [entries, total] = await Promise.all([
      Waitlist.find(query)
        .sort({ subscribedAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .select("-metadata.ipAddress -metadata.userAgent"),
      Waitlist.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: entries,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Erreur récupération waitlist:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
    });
  }
});

/**
 * @swagger
 * /api/waitlist/{email}:
 *   delete:
 *     summary: Retirer un email de la liste
 *     tags: [Waitlist]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email retiré avec succès
 *       404:
 *         description: Email non trouvé
 */
router.delete("/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const deleted = await Waitlist.findOneAndDelete({
      email: email.toLowerCase(),
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Email non trouvé",
      });
    }

    res.json({
      success: true,
      message: "Email retiré de la liste d'attente",
    });
  } catch (error) {
    console.error("Erreur suppression waitlist:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
    });
  }
});

/**
 * @swagger
 * /api/waitlist/stats:
 *   get:
 *     summary: Statistiques de la liste d'attente
 *     tags: [Waitlist]
 *     responses:
 *       200:
 *         description: Statistiques récupérées
 */
router.get("/stats", async (req, res) => {
  try {
    const [total, byStatus] = await Promise.all([
      Waitlist.countDocuments(),
      Waitlist.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    ]);

    res.json({
      success: true,
      data: {
        total,
        byStatus: byStatus.reduce((acc, { _id, count }) => {
          acc[_id] = count;
          return acc;
        }, {}),
      },
    });
  } catch (error) {
    console.error("Erreur stats waitlist:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
    });
  }
});

module.exports = router;
