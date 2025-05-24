// routes/transactionRoutes.js
const express = require("express");
const transactionController = require("../controllers/transactionController");
const transactionRouter = express.Router();

transactionRouter.get("/", transactionController.getAllTransactions);
transactionRouter.get("/:id", transactionController.getTransactionById);
transactionRouter.post("/", transactionController.createTransaction);

module.exports = transactionRouter;
