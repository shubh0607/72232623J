const express = require("express");
const { getAveragePrice } = require("../controllers/stockController");
const { getStockCorrelation } = require("../controllers/correlationController");
const router = express.Router();

router.get("/stocks/:ticker", getAveragePrice);
router.get("/stockcorrelation", getStockCorrelation);

module.exports = router;