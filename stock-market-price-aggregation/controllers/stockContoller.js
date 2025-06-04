const { fetchStockData } = require("../utils/dataFetcher");

exports.getAveragePrice = async (req, res) => {
    try {
        const { ticker } = req.params;
        const minutes = parseInt(req.query.minutes) || 30;
        const data = await fetchStockData(ticker, minutes);

        const avg =
            data.reduce((sum, entry) => sum + entry.price, 0) / data.length;

        res.json({
            averageStockPrice: avg.toFixed(4),
            priceHistory: data.map((entry) => ({
                price: entry.price.toFixed(4),
                lastUpdatedAt: new Date(entry.time).toISOString(),
            })),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};