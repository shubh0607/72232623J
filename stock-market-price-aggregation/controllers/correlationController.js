const { fetchStockData } = require("../utils/dataFetcher");
const { calculateCorrelation } = require("../utils/correlation");

exports.getStockCorrelation = async (req, res) => {
    try {
        const minutes = parseInt(req.query.minutes) || 30;
        const [ticker1, ticker2] = req.query.ticker;

        const [data1, data2] = await Promise.all([
            fetchStockData(ticker1, minutes),
            fetchStockData(ticker2, minutes),
        ]);

        const { correlation, aligned1, aligned2, mean1, mean2 } =
            calculateCorrelation(data1, data2);

        res.json({
            correlation: correlation.toFixed(4),
            stocks: {
                [ticker1]: {
                    averagePrice: mean1.toFixed(4),
                    priceHistory: aligned1.map((d) => ({
                        price: d.price.toFixed(4),
                        lastUpdatedAt: new Date(d.time).toISOString(),
                    })),
                },
                [ticker2]: {
                    averagePrice: mean2.toFixed(4),
                    priceHistory: aligned2.map((d) => ({
                        price: d.price.toFixed(4),
                        lastUpdatedAt: new Date(d.time).toISOString(),
                    })),
                },
            },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};