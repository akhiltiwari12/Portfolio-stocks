const express = require("express");
const router = express.Router();
const axios = require("axios");
const mongoose = require("mongoose");

dotenv = require("dotenv");
dotenv.config();

const StockSchema = new mongoose.Schema({
  stockName: String,
  ticker: String,
  quantity: { type: Number, default: 1 },
  buyPrice: Number,
});

const Stock = mongoose.model("Stock", StockSchema);

// Add a new stock
router.post("/add", async (req, res) => {
  try {
    const newStock = new Stock(req.body);
    await newStock.save();
    res.status(201).json(newStock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all stocks
router.get("/", async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.status(200).json(stocks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update existing stock
router.put("/update/:id", async (req, res) => {
  try {
    const updatedStock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedStock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a stock
router.delete("/delete/:id", async (req, res) => {
  try {
    await Stock.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Stock deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch real-time stock prices
router.get("/prices/:ticker", async (req, res) => {
  try {
    const apiKey = process.env.FINNHUB_API_KEY;
    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${req.params.ticker}&token=${apiKey}`
    );
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
